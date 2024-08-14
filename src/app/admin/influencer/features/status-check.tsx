'use client';
import { supabase } from "@/libs/supabase/client";
import { useEffect, useState } from "react";
import { NavButton } from "../../_components/nav-button";
import { StatusButton } from "../../_components/status-button";
import { Button } from "@/components/ui/button";


export default function StatusCheck({ influencer }: any) {

    const [filteredInfluencers, setFilteredInfluencers] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        // 컴포넌트 마운트 시에 필터링을 수행
        const filtered = influencer?.filter((inf: any) => inf.status === "미확인");
        setFilteredInfluencers(filtered);
    }, [influencer]);

    const handleSelectAll = () => {
        if (selectedIds.length === influencer.length) {
            setSelectedIds([]); // 전체 해제
        } else {
            setSelectedIds(influencer.map((inf: any) => inf.id)); // 전체 선택
        }
    };

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleApproveAll = async () => {
        try {
            const confirm = window.confirm('전체 인플루언서를 승인하시겠습니까?');
            if (confirm) {
            await Promise.all(selectedIds.map(id =>
                supabase.from('inf').update({ status: '승인', valid_check: '승인취소' }).eq('id', id)
            ))
            setSelectedIds([]); // 전체 선택 해제
            alert('전체 승인되었습니다.');
        };
            // 필요하면 데이터를 다시 가져오는 등의 작업을 여기서 수행하세요
        } catch (error) {
            console.error('Error approving all:', error);
        }
    };
    return (
        <>
            <div className="flex justify-end gap-3 items-center my-3 mr-3">
                <NavButton className="border rounded-lg" onClick={handleSelectAll}>전체 선택</NavButton>
                <NavButton className="border rounded-lg" onClick={handleApproveAll}>전체 승인</NavButton>
                <NavButton className="border rounded-lg" onClick={() => window.location.reload()}>업데이트</NavButton>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full border-2 flex justify-between">
                    <div className="w-1/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">선택</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">인플루언서 이름</div>
                    <div className="w-5/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">게시물 URL</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">승인버튼</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">현재상태</div>
                </div>
                {filteredInfluencers?.map((inf:any) => (
                    <div key={inf.id} className="w-full border-2 flex justify-between">
                        <div className="w-1/12 p-2 border flex justify-center items-center">
                            <input 
                            type="checkbox"
                            checked={selectedIds.includes(inf.id)}
                            onChange={() => handleSelect(inf.id)}
                            />
                        </div>
                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">{inf.name}</div>
                        <div className="w-5/12 p-2 border flex justify-center items-center">
                            <a href={inf.posts_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="link" className="none">게시물 URL</Button>
                            </a>
                        </div>
                        <div className="w-2/12 p-2 border flex justify-center items-center">
                            <StatusButton inf={inf}>{inf.valid_check}</StatusButton>
                        </div>
                        <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[13px]">{inf.status}</div>
                    </div>
                ))}
            </div>
        </>

    );

}