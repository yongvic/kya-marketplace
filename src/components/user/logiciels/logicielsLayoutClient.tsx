"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/user/header';
import HeaderScroll from './headerScroll';

export default function LogicielsLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // The trigger point is the height of the main header (h-24 = 96px).
            // When the user scrolls past this point, the secondary header becomes sticky.
            setIsSticky(window.scrollY > 96);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup the event listener on component unmount.
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* 1. The main site header. It is rendered normally and scrolls with the page. */}
            <Header />

            {/* 2. The secondary software-specific header. It is wrapped in a sticky container. */}
            {/* It will stick to the top of the viewport after the user scrolls past the main header. */}
            <header className={`sticky top-0 z-30 transition-shadow duration-300 ${isSticky ? 'shadow-md' : ''}`}>
                <HeaderScroll />
            </header>

            {/* 3. The page content. No extra padding is needed as the headers are handled in the normal document flow. */}
            <main>
                {children}
            </main>
        </>
    );
}