'use client';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { NavButton } from '../../_components/nav-button';
import { supabase } from '@/libs/supabase/client';
import { StatusButton } from '../../_components/status-button';
import { Button } from '@/components/ui/button';

export const revalidate = 0;

export default function Inspect({ influencer }: any) {
    const [filteredInfluencers, setFilteredInfluencers] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    useEffect(() => {
        // 컴포넌트 마운트 시에 필터링을 수행
        const filtered = influencer.filter((inf: any) => inf.status === "미확인");
        console.log('filtered:', filtered);
        setFilteredInfluencers(filtered);
    }, [influencer.status]);

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

    const handleInspect = async (id: number) => {
        try {
            const confirm = window.confirm('검사하시겠습니까?');
            if (confirm) {
                const response = await axios.get('/api/pt');
                console.log("response:", response);
                alert('검사되었습니다.');
                window.location.reload();
            }
            else {
                return;
            }
        } catch (error) {
            console.error('Error inspecting:', error);
        }
    }
    return (
        <>
            <div className="flex justify-end gap-3 items-center my-3 mr-3">
                <NavButton className="border rounded-lg" onClick={handleSelectAll}>전체 선택</NavButton>
                <NavButton className="border rounded-lg" onClick={()=>handleInspect(selectedIds[0])}>검사하기</NavButton>
                <NavButton className="border rounded-lg" onClick={() => window.location.reload()}>업데이트</NavButton>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full border-2 flex justify-between">
                    <div className="w-1/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">선택</div>
                    <div className="w-3/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">인플루언서 이름(@계정)</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">게시물 URL</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">승인상태</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">게시물 유효성</div>
                    <div className="w-2/12 p-2 border flex justify-center items-center px-4 py-2 text-[15px]">태그 유효성</div>
                </div>
                {influencer.map((inf:any) => (
                    <div key={inf.id} className="w-full border-2 flex justify-between">
                        <div className="w-1/12 p-2 border flex justify-center items-center">
                            <input 
                            type="checkbox"
                            checked={selectedIds.includes(inf.id)}
                            onChange={() => handleSelect(inf.id)}
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
