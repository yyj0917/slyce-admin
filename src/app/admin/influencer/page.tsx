'use client';

import { supabase } from "@/libs/supabase/client";
import { NavButton } from "../_components/nav-button";
import { Button } from "@/components/ui/button";
import { StatusButton } from "../_components/status-button";
import { use, useEffect, useState } from "react";
import StatusCheck from "./features/status-check";
import Inspect from "./features/inspect";
import { motion, Variants } from "framer-motion";
import { useFetchInfluencers } from "@/app/queries/influencers";

const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

export default function InfluencerMain() {
    const { data: influencers, isLoading, isError } = useFetchInfluencers();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('StatusCheck');
    const handleNavButtonClick = (componentName: string) => {
        setSelectedComponent(componentName);
    };
    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'StatusCheck':
                return <StatusCheck influencer={influencers}/>;
            case 'Inspect':
                return <Inspect influencer={influencers}/>;
            case 'Review':
                return <Inspect influencer={influencers}/>;
            case 'Approval':
                return <Inspect influencer={influencers}/>;
            default:
                return <div>잘못된 선택입니다.</div>;
        }
    };
    
    return (
        <div className="w-3/4 border-4 border-white mt-10 h-[80vh] rounded-md">
            <div className="container max-xl:max-w-none flex justify-between h-full">
                <nav className="w-1/4 h-full flex flex-col items-start justify-start p-4 border-r-2">
                    <motion.nav
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        className="menu flex flex-col items-start justify-around"
                        >
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="border-2 border-white p-2 rounded-lg flex items-center justify-center"
                        >
                            Menu
                            <motion.div
                            variants={{
                                open: { rotate: 180 },
                                closed: { rotate: 0 }
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ originY: 0.55 }}
                            className="bg-white p-1 rounded-full ml-2"
                            >
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16" />
                            </svg>
                            </motion.div>
                        </motion.button>
                        <motion.ul
                            variants={{
                            open: {
                                clipPath: "inset(0% 0% 0% 0% round 10px)",
                                transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.7,
                                delayChildren: 0.3,
                                staggerChildren: 0.05
                                }
                            },
                            closed: {
                                clipPath: "inset(10% 50% 90% 50% round 10px)",
                                transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.3
                                }
                            }
                            }}
                            style={{ pointerEvents: isOpen ? "auto" : "none" }}
                            className="border-2 p-2 rounded-lg mt-5"
                        >
                            <motion.li variants={itemVariants} >
                                <NavButton onClick={() => handleNavButtonClick('StatusCheck')}>확인하지 않은 인플루언서</NavButton>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <NavButton onClick={() => handleNavButtonClick('Inspect')}>확인된인플루언서(검수해야할)</NavButton>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <NavButton>검수하는 섹션</NavButton>
                            </motion.li>
                            <motion.li variants={itemVariants}>
                                <NavButton>승인검사</NavButton>
                            </motion.li>
                        </motion.ul>
                    </motion.nav>
                </nav>
                <div className="w-3/4">
                    {renderSelectedComponent()}
                </div>
            </div>

        </div>
    );
}
