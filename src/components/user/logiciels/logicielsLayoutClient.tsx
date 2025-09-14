"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/user/header';
import HeaderScroll from './headerScroll';

export default function LogicielsLayoutClient({ children }: { children: React.ReactNode }) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Le point de déclenchement est la hauteur du premier header (h-24 = 96px)
            setIsSticky(window.scrollY > 96);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* 1. Le Header Principal est rendu normalement. Il n'a pas de position fixe ou sticky. */}
            {/* Il défilera avec le reste de la page. */}
            <Header />

            {/* 2. Le Header des Logiciels est dans un wrapper "sticky". */}
            {/* Il restera à sa place jusqu'à ce que le défilement le pousse vers le haut, puis il se "collera" à top: 0. */}
            <header className={`sticky top-0 z-30 transition-shadow duration-300 ${isSticky ? 'shadow-md' : ''}`}>
                <HeaderScroll />
            </header>

            {/* 3. Le contenu de la page vient directement après. Pas besoin de padding-top car les headers sont dans le flux normal. */}
            <main>
                {children}
            </main>
        </>
    );
}