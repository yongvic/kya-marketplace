'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { getDummyPosts } from '@/lib/dummy-data';
import HeroSection from '@/components/user/blog/HeroSection';
import CategoryFilter from '@/components/user/blog/CategoryFilter';
import PostGrid from '@/components/user/blog/PostGrid';
import Pagination from '@/components/user/blog/Pagination';
import NewsletterCTA from '@/components/user/blog/NewsletterCTA';
import { useTranslations } from 'next-intl';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
    const t = useTranslations('BlogPage');
    const allPosts = useMemo(() => getDummyPosts(t), [t]);
    const allCategories = useMemo(() => [...new Set(allPosts.map(p => p.category))], [allPosts]);

    const [activeCategory, setActiveCategory] = useState(t('all'));
    const [currentPage, setCurrentPage] = useState(1);

    const gridRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    // Gérer la réinitialisation de la page lors du changement de catégorie
    useEffect(() => {
        const filtered = activeCategory === t('all')
            ? allPosts
            : allPosts.filter(p => p.category === activeCategory);
        const newTotalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(1);
        }
    }, [activeCategory, allPosts, currentPage, t]);

    // Dériver les posts filtrés et paginés
    const { posts: displayedPosts, totalPages } = useMemo(() => {
        const filtered = activeCategory === t('all')
            ? allPosts
            : allPosts.filter(p => p.category === activeCategory);

        const total = Math.ceil(filtered.length / POSTS_PER_PAGE);
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const posts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

        return { posts, totalPages: total };
    }, [activeCategory, currentPage, allPosts, t]);

    useGSAP(() => {
        const sections = mainRef.current?.children;
        if (!sections) return;
        gsap.from(sections, {
            opacity: 0, y: 50, duration: 1, ease: 'power3.out', stagger: 0.2
        });
    }, { scope: mainRef });

    useGSAP(() => {
        const gridItems = gridRef.current?.children;
        if (!gridItems || displayedPosts.length === 0) return;

        gsap.from(gridItems, {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.2
        });
    }, { dependencies: [displayedPosts], scope: gridRef });

    return (
        <div className="bg-[#F7F9F6]">
            <main ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24">
                <HeroSection latestPost={allPosts[0]} topReads={allPosts.slice(1, 4)} />
                <section>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">{t('browseByCategory')}</h2>
                        <div className='flex justify-center items-center'>
                            <CategoryFilter categories={allCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                        </div>
                    </div>
                    <div ref={gridRef} className="mt-12">
                        <PostGrid posts={displayedPosts} />
                    </div>
                </section>
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
                <NewsletterCTA />
            </main>
        </div>
    );
}