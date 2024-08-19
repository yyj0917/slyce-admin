import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { NextRequest, NextResponse } from 'next/server';
import { url } from 'inspector';
import { supabase } from '@/libs/supabase/client';
import { Console } from 'console';
export type ContentType = {
    head: string | undefined;
    date: string | undefined;
    context: string | undefined;
    href: string | undefined;
    headline: string | undefined;
    tags: string[] | undefined;
  };
  

// background에서 브라우저를 열어서 내용을 가져오는 함수
const openBrowser  = async (url: string) => {
    chromium.setHeadlessMode = true;
    chromium.setGraphicsMode = false;
  
    console.log('url:', url);   
    // 크로미움으로 브라우저를 연다. 
    const browser = await puppeteer.launch(
      process.env.NODE_ENV === 'development' ?
      // 로컬 실행 환경
      {
        headless: true,
        executablePath: process.env.NEXT_LOCAL_CHROME_PATH,
      }
      :
      // 서버 실행 환경
      {
        args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }
    ); 
          
    // 페이지 열기
    const page = await browser.newPage();
    // 링크 이동
    // await page.goto(url, {
    //     waitUntil: "domcontentloaded", // 500ms 동안 두 개 이상의 네트워크 연결이 없을 때 탐색이 완료되는 것으로 간주
    //     timeout: 12000,
    // });
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.abort(); // 이미지, 스타일시트, 폰트 요청 차단
        } else {
        request.continue(); // 나머지 리소스는 계속 로드
        }
    });

    try {
        await page.goto(url, {
        waitUntil: 'domcontentloaded', // DOMContentLoaded 이벤트를 기준으로 탐색 완료
        timeout: 120000, // 타임아웃을 60초로 설정
        });

        const content: string = await page.content();
        return content;
    } catch (error) {
        console.error('Error opening page:', error);
        throw new Error('Failed to open the page');
    } finally {
        await page.close();
        // await browser.close();
    }
  
    // //4. HTML 정보 가지고 온다.
    // // const content  : string = await page.content();
    // // console.log('contents: check');

    // //5. 페이지와 브라우저 종료
    // await page.close();
  
    // return content;
  }
// openBrowser() 를 통해 불러온 html을 파싱하는 함수
// 이 부분은 https://velog.io/@kimbangul/Next.js-Cheerio.js-%EB%A1%9C-Velog-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0 와 거의 동일합니다.(cheerio.load() 부분과, 태그 클래스명만 변경) 
const getTag = async (url : string) => {
    try {  
      const $ = cheerio?.load(await openBrowser(url));

        let contents: string[] = [];

        // span 태그를 가진 요소를 찾아서 배열에 넣는다.
        $('span._aa1p').each((i, el) => {
            const content = $(el).text();  // 요소의 내부 HTML을 가져옴
            console.log('tag valid content : ', content);

            if (content) {
                contents.push(content);  // 배열에 추가
            }
        });
        console.log('contents:', contents);
        return contents;
    }
    catch(e){
      console.log(e);
    }
  }

  // 게시물의 유효성을 판단하는 함수
  const getValidPost = async(url : string) => {
    try {
        const $ = cheerio?.load(await openBrowser(url));
        let isValid = true;
        let contents: string[] = [];
        $('span').each((i, el) => {
            const content = $(el).text();  // 요소의 내부 HTML을 가져옴
            console.log('post valid content : ', content);
            if (content) {
                contents.push(content);  // 배열에 추가
            }
        });
        if (contents[0].includes("죄송합니다. 페이지를 사용할 수 없습니다.")) {
            isValid = false;
        }
        console.log('isValid:', isValid);
        return isValid;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function getUrl(id : any | null) {
    const { data, error } = await supabase
        .from('inf') // 테이블 이름
        .select('posts_url') // 가져올 컬럼 이름
        .eq('id', id) // 조건: id가 일치하는 행을 가져옴
        .single(); // 단일 결과만 가져옴
    if (error) {
        console.error('Error fetching influencer URL:', error);
        return null; // 오류 발생 시 null 반환
        }
    
    return data?.posts_url || null; // 데
}


export async function GET (req: NextRequest)  {  
    // const { searchParams } = new URL(req.url);
    // const id = searchParams.get('id');
    // const url = await getUrl(id);
    const url = process.env.NEXT_PUBLIC_BLOG_URL || '';
    // 게시물의 유효성을 확인
    const isValid = await getValidPost(url);

    // 게시물의 태그를 수집
    const tagData = await getTag(url);

    return NextResponse.json({ valid: isValid, tags: tagData });
}
  