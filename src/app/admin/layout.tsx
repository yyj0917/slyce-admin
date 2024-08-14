'use client';
import { cn } from "@/libs/utils/styles";

import { Button } from '@/components/ui/button';
import { MainLogo } from './_components/main-logo';
import { NavButton } from './_components/nav-button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from "next/link";
import { AuthButton } from "./login/_components/auth-button";
import { useFetchUser } from "../queries/user";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { data: user , isLoading, isError} = useFetchUser();

    return (
        <div className="min-h-svh md:min-h-screen flex flex-col items-center">
            <header className="w-full border-b border-neutral-100 dark:border-neutral-800 z-50 flex justify-center px-8">
                <nav className="container max-xl:max-w-none">
                    {/* Tablet, DeskTop */}
                    <div className="h-14 md:flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <MainLogo />
                            <div className="flex space-x-1">
                                {user && (
                                    <>
                                        <Link href="/admin" passHref>
                                            <Button variant="link" className="text-sm">
                                                Home
                                            </Button>
                                        </Link>
                                        <Link href="/admin/influencer" passHref>
                                            <NavButton className="text-sm" >
                                                Influencer
                                            </NavButton>    
                                        </Link>
                                        <Link href="/admin/brands" passHref>
                                            <NavButton className="text-sm" > 
                                                Brands
                                            </NavButton>
                                        </Link>
                                        <Link href="/admin/data-analyze" passHref>
                                            <NavButton className="text-sm" >Data Analyze</NavButton>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <Link href="/admin/login" passHref>
                                <AuthButton className="text-sm hover:bg-slate-600 hover:no-underline"/>
                                    
                                       
                            </Link>
                        </div>
                        {/* <ModeToggle iconSize={16} /> */}
                    </div>
                </nav>
            </header>
            {/* <InfluencerMain influencer={influencer}/> */}
            {children}
        </div>
    );
}