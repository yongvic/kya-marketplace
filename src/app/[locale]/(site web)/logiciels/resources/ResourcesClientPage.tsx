// src/app/[locale]/(site web)/logiciels/resources/ResourcesClientPage.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResourceCard from '@/components/user/logiciels/ResourceCard';
import Testimonials from '@/components/user/logiciels/Testimonials';
import { useTranslations } from 'next-intl';

interface Resource {
    id: number;
    title: string;
    category: string;
    description: string;
    link: string;
    imageUrl: string;
}

interface ResourcesClientPageProps {
    resources: Resource[];
    categories: string[];
    locale: string;
}

const ResourcesClientPage = ({ resources, categories, }: ResourcesClientPageProps) => {
    const t = useTranslations('ResourcesPage');

    // Définir la catégorie par défaut selon la langue
    const defaultCategory = t('allCategory');
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

    // Filtrer les ressources selon la catégorie sélectionnée
    const filteredResources = selectedCategory === defaultCategory
        ? resources
        : resources.filter(r => r.category === selectedCategory);

    // Animations — CONTENIR UNIQUEMENT LES VALEURS, PAS transition
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            // ✅ transition est déplacée sur le composant <motion.div> ci-dessous
        },
    };

    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('description')}
                        </p>
                    </motion.div>

                    {/* Filter Section */}
                    <div className="flex justify-center items-center flex-wrap gap-2 md:gap-4 mb-12">
                        {categories.map(category => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 whitespace-nowrap ${selectedCategory === category
                                    ? 'bg-kya-green text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>

                    {/* Resources Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            staggerChildren: 0.1,
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {filteredResources.map(resource => (
                                <motion.div
                                    key={resource.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                    }}
                                    layout
                                >
                                    <ResourceCard {...resource} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </div>
            <Testimonials />
        </>
    );
};

export default ResourcesClientPage;