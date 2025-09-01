"use client";

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { LayoutDashboard, BarChart3, Database, FileText, Sparkles, SlidersHorizontal } from 'lucide-react';

const featuresList = [
    { id: 'intuitiveDesign', icon: <LayoutDashboard size={40} className="text-orange-500" /> },
    { id: 'preciseSimulation', icon: <BarChart3 size={40} className="text-orange-500" /> },
    { id: 'componentDatabase', icon: <Database size={40} className="text-orange-500" /> },
    { id: 'detailedReports', icon: <FileText size={40} className="text-orange-500" /> },
    { id: 'smartOptimization', icon: <Sparkles size={40} className="text-orange-500" /> },
    { id: 'intuitiveDesign2', icon: <SlidersHorizontal size={40} className="text-orange-500" />, duplicateOf: 'intuitiveDesign' },
];

// Animation Variants pour le conteneur et les cartes
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0, 0, 0.2, 1], // ✅ équivalent à "easeOut"
        },
    },
};

export default function FeaturesSection() {
    const t = useTranslations('LogicielsPage.features');

    return (
        <section className="py-20 bg-orange-500">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                >
                    {t('mainTitle')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 max-w-3xl mx-auto text-lg text-white/90"
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuresList.map((feature) => {
                        const key = feature.duplicateOf || feature.id;
                        return (
                            <motion.div
                                key={feature.id}
                                variants={itemVariants}
                                className="bg-white p-8 rounded-xl shadow-lg text-left transform transition-transform duration-300 hover:-translate-y-2"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900">{t(`cards.${key}.title`)}</h3>
                                <p className="mt-2 text-gray-600">{t(`cards.${key}.description`)}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
