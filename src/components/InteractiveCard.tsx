'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function InteractiveCard({ children, contentName }: { children: React.ReactNode, contentName: string }) {
    
    const router =useRouter ()

    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type === 'mouseover') {
            event.currentTarget.classList.remove('shadow-lg');
            event.currentTarget.classList.add('shadow-2xl');
        } else {
            event.currentTarget.classList.remove('shadow-2xl');
            event.currentTarget.classList.add('shadow-lg');
        }
    }

    return (
        <div className='w-full h-[400px] rounded-lg shadow-lg bg-white pb-[50px]'
            onMouseOver={(e) => onCardMouseAction(e)}
            onMouseOut={(e) => onCardMouseAction(e)}>
            {children}
        </div>
    )
}