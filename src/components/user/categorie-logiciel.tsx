"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BarChart, Clock, FileText, Users } from 'lucide-react';
import Image from 'next/image';

import Image from 'next/image';

// Define TypeScript types for robust data structures.
type Badge = {
    textKey: string; // Translation key for the badge text.
    position: string; // Tailwind CSS classes for positioning.
};

type SoftwareCategory = {
    id: 'monitoring' | 'management' | 'reporting' | 'collaboration';
    icon: React.ElementType;
    titleKey: string;
    softwareNameKey: string;
    descriptionKey: string;
    imageSrc: string;
    badges: Badge[];
};

// Centralized data for each software category.
// This makes it easy to update content like images, text keys, etc.
const softwareData: SoftwareCategory[] = [
    {
        id: 'monitoring',
        icon: BarChart,
        titleKey: 'categories.monitoring',
        softwareNameKey: 'softwares.kya-analytics.name',
        descriptionKey: 'softwares.kya-analytics.description',
        imageSrc: '/monitoring-image.png', // TODO: Replace with actual image path
        badges: [
            { textKey: 'badges.realtime', position: 'top-10 -left-10' },
            { textKey: 'badges.performance', position: 'bottom-20 -right-16' },
        ],
    },
    {
        id: 'management',
        icon: Clock,
        titleKey: 'categories.management',
        softwareNameKey: 'softwares.kya-control.name',
        descriptionKey: 'softwares.kya-control.description',
        imageSrc: '/management-image.png', // TODO: Replace with actual image path
        badges: [
            { textKey: 'badges.optimization', position: 'top-1/4 -left-12' },
            { textKey: 'badges.planning', position: 'bottom-1/4 -right-12' },
        ],
    },
    {
        id: 'reporting',
        icon: FileText,
        titleKey: 'categories.reporting',
        softwareNameKey: 'softwares.kya-report.name',
        descriptionKey: 'softwares.kya-report.description',
        imageSrc: '/documentation-rapports.png', // Mockup image
        badges: [
            { textKey: 'badges.history', position: 'top-[20%] -left-24' },
            { textKey: 'badges.report', position: 'top-1/2 -right-24' },
            { textKey: 'badges.lists', position: 'bottom-[10%] -left-16' },
        ],
    },
    {
        id: 'collaboration',
        icon: Users,
        titleKey: 'categories.collaboration',
        softwareNameKey: 'softwares.kya-share.name',
        descriptionKey: 'softwares.kya-share.description',
        imageSrc: '/collaboration-image.png', // TODO: Replace with actual image path
        badges: [
            { textKey: 'badges.teams', position: 'top-16 -left-12' },
            { textKey: 'badges.projects', position: 'bottom-16 -right-16' },
        ],
    },
];


const CategorieLogiciel = () => {
    // Hook for accessing translations under the "SoftwareSection" namespace.
    const t = useTranslations('SoftwareSection');
    // State to track the currently selected software category.
    const [activeCategory, setActiveCategory] = useState<SoftwareCategory['id']>('reporting');

    // Find the data object for the currently active software category.
    const activeSoftware = softwareData.find(s => s.id === activeCategory);

    // Safety check: if no active software is found, render nothing.
    if (!activeSoftware) return null;

    return (
        <section className="py-16 sm:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                {/* Section Titles */}
                <h2 className="text-gray-500 font-semibold text-lg uppercase tracking-wider">
                    {t('categoryTitle')}
                </h2>
                <h3 className="mt-2 text-4xl sm:text-5xl font-bold text-gray-900 max-w-3xl mx-auto">
                    {t('mainTitle')}
                </h3>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>

                {/* Clickable Category Selection Grid */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-4xl mx-auto">
                    {softwareData.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex flex-col items-center gap-4 cursor-pointer group"
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <div className={`
                                flex items-center justify-center h-20 w-20 rounded-full transition-all duration-300
                                ${activeCategory === cat.id ? 'bg-kya-green text-white shadow-lg' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}
                            `}>
                                <cat.icon size={32} />
                            </div>
                            <p className={`
                                font-semibold text-center transition-colors duration-300 max-w-[120px]
                                ${activeCategory === cat.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}
                            `}>
                                {t(cat.titleKey)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Dynamic Display Section */}
                <div className="mt-20 relative">
                    <p className="text-kya-green font-bold text-xl">
                        {t(activeSoftware.softwareNameKey)}
                    </p>
                    <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
                        {t(activeSoftware.descriptionKey)}
                    </p>

                    <div className="mt-8 relative max-w-4xl mx-auto">
                        {/* Main Image */}
                        <div className="relative aspect-[16/10] w-full">
                            <Image
                                src={activeSoftware.imageSrc}
                                alt={`Extrait de ${t(activeSoftware.softwareNameKey)}`}
                                fill
                                className="rounded-2xl shadow-2xl mx-auto object-cover object-top"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 960px"
                            />
                        </div>

                        {/* Floating Badges with SVG Arrows */}
                        {activeSoftware.badges.map((badge, index) => (
                            <div key={index} className={`absolute transform -translate-y-1/2 ${badge.position} hidden md:block`}>
                                <div className="relative">
                                    {/* Decorative curved SVG arrow */}
                                    <svg width="80" height="60" viewBox="0 0 80 60" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-gray-300/80">
                                        <path d="M70 30 C 40 30, 40 30, 10 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4 4" />
                                    </svg>
                                    <span className="bg-white/70 backdrop-blur-sm text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg whitespace-nowrap">
                                        {t(badge.textKey)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorieLogiciel;