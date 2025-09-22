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
    // Memoize the list of categories to prevent re-computation on every render.
    // This includes the "All" category, which is dynamically translated.
    const allCategories = useMemo(() => [t('all'), ...categories], [categories, t]);

    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    // Clear the refs array on each render to ensure it's always up-to-date.
    buttonRefs.current = [];

    // GSAP animation for the active category pill.
    // This effect runs whenever the active category changes.
    useGSAP(() => {
        const activeIndex = allCategories.indexOf(activeCategory);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            // Animate the pill to the position and width of the active button.
            gsap.to('.active-pill', {
                x: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
                duration: 0.5,
                ease: 'power3.out',
            });
        }
    }, { dependencies: [activeCategory, allCategories], scope: containerRef });

    // Effect to handle window resizing.
    // This ensures the active pill stays correctly positioned when the viewport changes.
    useEffect(() => {
        const handleResize = () => {
            const activeIndex = allCategories.indexOf(activeCategory);
            const activeButton = buttonRefs.current[activeIndex];
            if (activeButton) {
                // Instantly set the pill's position and width without animation.
                gsap.set('.active-pill', {
                    x: activeButton.offsetLeft,
                    width: activeButton.offsetWidth,
                });
            }
        };
        window.addEventListener('resize', handleResize);
        // Set initial position on mount.
        handleResize();
        // Cleanup the event listener on component unmount.
        return () => window.removeEventListener('resize', handleResize);
    }, [activeCategory, allCategories]);

    // Function to add button elements to the refs array.
    // This is used in the `ref` prop of the button elements.
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
                    // The ref callback populates the buttonRefs array.
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