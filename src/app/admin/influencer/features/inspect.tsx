'use client';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { NavButton } from '../../_components/nav-button';
import { supabase } from '@/libs/supabase/client';
import { StatusButton } from '../../_components/status-button';
import { Button } from '@/components/ui/button';
import { set } from 'zod';

export const revalidate = 0;

export default function Inspect({ influencer }: any) {
    const [filteredInfluencers, setFilteredInfluencers] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(false); // 로딩 상태 관리

    useEffect(() => {
        // 컴포넌트 마운트 시에 필터링을 수행
        const filtered = influencer?.filter((inf: any) => 
            (inf.post_valid === "nothing" || inf.post_valid === "true") && 
            (inf.tag_valid === "nothing" || inf.tag_valid === "true") && 
            (inf.status === "승인"));
        setFilteredInfluencers(filtered);
    }, [influencer?.post_valid, influencer?.tag_valid, influencer?.status]);

    const handleSelectAll = () => {
        if (selectedIds.length === influencer.length) {
            setSelectedIds([]); // 전체 해제
        } else {
            setSelectedIds(influencer.map((inf: any) => inf.id)); // 전체 선택
        }
    };

    const handleSelect = (id: number) => {
        setSelectedIds(prevSelectedIds =>
            prevSelectedIds.includes(id)
              ? prevSelectedIds.filter(selectedId => selectedId !== id) // 이미 선택된 항목을 클릭하면 선택 해제
              : [...prevSelectedIds, id] // 선택되지 않은 항목을 클릭하면 선택 추가
          );
    };

    const handleInspect = async (id: number) => {
        if (selectedIds.length === 0) {
            alert('검사할 항목을 선택하세요.');
            return;
          }
        setLoading(true);
        try {
            const confirm = window.confirm(
                selectedIds.length === 1
                    ? '선택한 항목을 검사하시겠습니까?'
                    : '선택한 모든 항목을 검사하시겠습니까?'
            );
            if (confirm) {
                for (const id of selectedIds) {
                    const response = await axios.get(`/api/pt?id=${id}`);
                    console.log(`Response for ID ${id}:`, response.data);
                  }
                alert('검사되었습니다.');
            }
            else {
                return;
            }
        } catch (error) {
            console.error('Error inspecting:', error);
        } finally {
            setLoading(false);
        }
    };
    // 수동 검사
    const handlePostTrue = async (id: number) => {
        console.log('post true id:', id);
        await supabase
            .from('inf')
            .update({ post_valid: 'true'})
            .eq('id', id);
        
    }
    const handlePostFalse = async (id: number) => {
        await supabase
            .from('inf')
            .update({ post_valid: 'false'})
            .eq('id', id);
    }
    const handleTagTrue = async (id: number) => {
        await supabase
            .from('inf')
            .update({ tag_valid: 'true'})
            .eq('id', id);
    }
    const handleTagFalse = async (id: number) => {
        await supabase
            .from('inf')
            .update({ tag_valid: 'false'})
            .eq('id', id);
    }
    

    return (
        <>
            {loading ? (
                <div className="top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center gap-5">
                    <div className="w-12 h-12 border-4 border-t-transparent border-white border-solid rounded-full animate-slow-spin"></div>
                    <p>검사 중입니다...</p>
                </div>
            ) : (
            <>
                <div className="flex justify-end gap-3 items-center my-3 mr-3">
                    <NavButton className="border rounded-lg" onClick={handleSelectAll}>전체 선택</NavButton>
                    <NavButton className="border rounded-lg" onClick={()=>handleInspect(selectedIds[0])}>검사하기</NavButton>
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
                    {filteredInfluencers?.map((inf:any) => (
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
                            <div className="w-2/12 p-2 border flex justify-between items-center px-4 py-2 text-[13px]">
                                {inf.status}
                                
                            </div>

                            <div className="w-2/12 p-2 border flex justify-between items-center px-4 py-2 text-[13px]">
                                {inf?.post_valid} 
                                <div className="flex flex-col p-0 m-0 gap-1">
                                    <Button variant="link" className='px-4 m-0 border-2 bg-slate-600' onClick={() => handlePostTrue(inf.id)}>True</Button>
                                    <Button variant="link" className='px-4 m-0 border-2 bg-slate-600' onClick={() => handlePostFalse(inf.id)}>False</Button>
                                </div>
                            </div>
                            <div className="w-2/12 p-2 border flex justify-between items-center px-4 py-2 text-[13px]">
                                {inf?.tag_valid}
                                <div className="flex flex-col p-0 m-0 gap-1">
                                    <Button variant="link" className='px-4 m-0 border-2 bg-slate-600' onClick={() => handleTagTrue(inf.id)}>True</Button>
                                    <Button variant="link" className='px-4 m-0 border-2 bg-slate-600' onClick={() => handleTagFalse(inf.id)}>False</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            )}
        </>
    );
}
