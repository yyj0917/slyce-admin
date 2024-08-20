'use client';

import { Button } from "@/components/ui/button";
import { NavButton } from "../../_components/nav-button";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase/client";


export default function Invalid({ influencer }: any) {
    const [filteredInfluencers, setFilteredInfluencers] = useState<any[]>([]);
    useEffect(() => {
        // 컴포넌트 마운트 시에 필터링을 수행
        const filtered = influencer?.filter((inf: any) => 
            (inf.status === "승인취소") || ((inf.post_valid === "false") || (inf.tag_valid === "false")));
        setFilteredInfluencers(filtered);
    }, [influencer]);
    const handleApproveCancel = async (id: number) => {
        await supabase
            .from('inf')
            .update({ status: '승인취소'})
            .eq('id', id);
    }
    return (
        <>
            <div className="flex justify-end gap-3 items-center my-3 mr-3">
                {/* <NavButton className="border rounded-lg" onClick={handleSelectAll}>전체 선택</NavButton>
                <NavButton className="border rounded-lg" onClick={()=>handleInspect(selectedIds[0])}>검사하기</NavButton> */}
                <NavButton className="border rounded-lg" onClick={() => window.location.reload()}>업데이트</NavButton>
            </div>
            <div className="flex flex-col items-center justify-center overflow-auto">
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
                        <div className="w-2/12 p-2 border flex justify-between items-center px-4 py-2 text-[13px]">
                            {inf.status}
                            <div className="flex flex-col p-0 m-0 gap-1">
                                <Button variant="link" className='px-4 m-0 border-2 bg-slate-600' onClick={() => handleApproveCancel(inf.id)}>승인취소</Button>
                            </div>
                        </div>

                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">
                            {inf?.post_valid}    
                        </div>
                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">{inf?.tag_valid}</div>
                    </div>
                ))}
            </div>
        </>
    );

}
