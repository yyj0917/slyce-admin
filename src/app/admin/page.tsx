import { supabase } from "@/libs/supabase/client";
import { NavButton } from "./_components/nav-button";
import { Button } from "@/components/ui/button";
import { MainLogo } from "./_components/main-logo";
import { cn } from "@/libs/utils/styles";
import { ModeToggle } from "@/components/mode-toggle";
import InfluencerMain from "./influencer/page";

// 캐싱 비활성화
export const revalidate = 0;

export default async function AdminPage() {
    
    

    return (
        <div className="flex justify-center items-center w-full h-[50vh] border-2">
            <h1>본 페이지는 admin 전용 페이지입니다</h1>
        </div>
    );
}