import { Button } from "@/components/ui/button";
import { NavButton } from "../../_components/nav-button";
import { useEffect, useState } from "react";


export default function Invalid({ influencer }: any) {
    const [filteredInfluencers, setFilteredInfluencers] = useState<any[]>([]);
    useEffect(() => {
        // 컴포넌트 마운트 시에 필터링을 수행
        const filtered = influencer.filter((inf: any) => 
            (inf.post_valid === "false") && (inf.tag_valid === "false"));
        setFilteredInfluencers(filtered);
    }, [influencer]);
    return (
        <>
            <div className="flex justify-end gap-3 items-center my-3 mr-3">
                {/* <NavButton className="border rounded-lg" onClick={handleSelectAll}>전체 선택</NavButton>
                <NavButton className="border rounded-lg" onClick={()=>handleInspect(selectedIds[0])}>검사하기</NavButton> */}
                <NavButton className="border rounded-lg" onClick={() => window.location.reload()}>업데이트</NavButton>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full border-2 flex justify-between">
                    <div className="w-1/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">선택</div>
                    <div className="w-3/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">인플루언서 이름(계정)</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">게시물 URL</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">승인상태</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">게시물 유효성</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">태그 유효성</div>
                </div>
                {filteredInfluencers.map((inf:any) => (
                    <div key={inf.id} className="w-full border-2 flex justify-between">
                        <div className="w-1/12 p-2 border flex justify-center items-center">
                            <input 
                            type="checkbox"
                            // checked={selectedIds.includes(inf.id)}
                            // onChange={() => handleSelect(inf.id)}
                            />
                        </div>
                        <div className="w-3/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">{inf.name}(@_svmin)</div>
                        <div className="w-2/12 p-2 border flex justify-center items-center">
                            <a href={inf.posts_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="link" className="hover:border-2 hover:bg-slate-800">게시물 URL</Button>
                            </a>
                        </div>
                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">{inf.status}</div>

                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">
                            {inf?.post_valid ? 'True' : 'False'}    
                        </div>
                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">{inf?.tag_valid ? 'True' : 'False'}</div>
                    </div>
                ))}
            </div>
        </>
    );

}
