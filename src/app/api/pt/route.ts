// import getExecutablePath from '@/libs/get-excutable-path';
// import { NextRequest, NextResponse } from 'next/server';
// import puppeteer from 'puppeteer-core';
// import os from "os";
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { NextRequest, NextResponse } from 'next/server';
import { url } from 'inspector';
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
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security', "--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(`${process.env.NEXT_PUBLIC_CDN_LINK}`
         ),
        headless: chromium.headless,
        // ignoreHTTPSErrors: true
      }
    ); 
          
    // 페이지 열기
    const page = await browser.newPage();
          
    // 링크 이동
    await page.goto(url, {
      waitUntil: "networkidle2" // 500ms 동안 두 개 이상의 네트워크 연결이 없을 때 탐색이 완료되는 것으로 간주
    });
  
    //4. HTML 정보 가지고 온다.
    const content  : string= await page.content();
            
    //5. 페이지와 브라우저 종료
    await page.close();
  
    return content;
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
            if (content) {
                contents.push(content);  // 배열에 추가
            }
        });
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
            if (content) {
                contents.push(content);  // 배열에 추가
            }
        });
        if (contents[0].includes("죄송합니다. 페이지를 사용할 수 없습니다.")) {
            isValid = false;
        }
        return isValid;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
  


export async function GET (req: NextRequest)  {  
    const url = process.env.NEXT_PUBLIC_BLOG_URL || '';

    // 게시물의 유효성을 확인
    const isValid = await getValidPost(url);

    // 게시물의 태그를 수집
    const tagData = await getTag(url);

    return NextResponse.json({ valid: isValid, tags: tagData });
}
  