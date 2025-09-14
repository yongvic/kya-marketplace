'use client';

import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
    const t = useTranslations('BlogPage');
    // --- CORRECTION ESLINT : useMemo ---
    const allCategories = useMemo(() => [t('all'), ...categories], [categories, t]);

    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    buttonRefs.current = []; // Vider le tableau à chaque rendu

    useGSAP(() => {
        const activeIndex = allCategories.indexOf(activeCategory);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            gsap.to('.active-pill', {
                x: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
                duration: 0.5,
                ease: 'power3.out',
            });
        }
    }, { dependencies: [activeCategory, allCategories], scope: containerRef });

    useEffect(() => {
        const handleResize = () => {
            const activeIndex = allCategories.indexOf(activeCategory);
            const activeButton = buttonRefs.current[activeIndex];
            if (activeButton) {
                gsap.set('.active-pill', {
                    x: activeButton.offsetLeft,
                    width: activeButton.offsetWidth,
                });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [activeCategory, allCategories]);

    const addToRefs = (el: HTMLButtonElement | null) => {
        if (el && !buttonRefs.current.includes(el)) {
            buttonRefs.current.push(el);
        }
    };

    return (
        <div ref={containerRef} className="relative flex flex-wrap gap-3 p-2 bg-white rounded-full shadow-inner-sm">
            <div className="active-pill absolute top-2 left-0 h-10 bg-kya-green rounded-full shadow-md" />
            {allCategories.map((category) => (
                <button
                    // --- CORRECTION TYPESCRIPT : ref ---
                    ref={addToRefs}
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeCategory === category
                            ? 'text-white'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}