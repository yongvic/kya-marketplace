"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

import AnimatedArrow from './animatedArrow';

// Type pour les easing
type ValidEasing =
    | 'linear'
    | 'easeIn'
    | 'easeOut'
    | 'easeInOut'
    | 'circIn'
    | 'circOut'
    | 'circInOut'
    | 'backIn'
    | 'backOut'
    | 'backInOut'
    | 'anticipate'
    | [number, number, number, number];

interface TransitionConfig {
    duration: number;
    delay: number;
    ease: ValidEasing;
}

export default function HeroSection() {
    const t = useTranslations('LogicielsPage.hero');

    const arrowVariants = {
        left: {
            initial: { opacity: 0, x: -50, y: -20 },
            animate: { opacity: 1, x: 0, y: 0 },
            transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } as const satisfies TransitionConfig,
        },
        right: {
            initial: { opacity: 0, x: 50, y: -20 },
            animate: { opacity: 1, x: 0, y: 0 },
            transition: { duration: 0.6, delay: 0.7, ease: "easeOut" } as const satisfies TransitionConfig,
        },
        bottomRight: {
            initial: { opacity: 0, y: 50, x: 20 },
            animate: { opacity: 1, y: 0, x: 0 },
            transition: { duration: 0.8, delay: 1.0, ease: "easeOut" } as const satisfies TransitionConfig,
        },
    };

    return (
        <section className="relative w-full bg-white pt-24 pb-20 md:pt-28 lg:pt-16 md:pb-20 overflow-hidden min-h-[90vh] md:min-h-[80vh] flex items-center">
            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">

                {/* Flèches animées */}
                <AnimatedArrow
                    className="absolute top-12 left-4 sm:left-10 lg:left-24 -rotate-45 hidden lg:block"
                    initial={arrowVariants.left.initial}
                    animate={arrowVariants.left.animate}
                    transition={arrowVariants.left.transition}
                />
                <AnimatedArrow
                    className="absolute top-12 right-4 sm:right-10 lg:right-24 rotate-45 scale-x-[-1] hidden lg:block"
                    initial={arrowVariants.right.initial}
                    animate={arrowVariants.right.animate}
                    transition={arrowVariants.right.transition}
                />
                <AnimatedArrow
                    className="absolute bottom-10 right-16 md:right-32 hidden xl:block"
                    initial={arrowVariants.bottomRight.initial}
                    animate={arrowVariants.bottomRight.animate}
                    transition={arrowVariants.bottomRight.transition}
                />

                {/* Indicateurs d'utilisateurs animés - Positionnement et taille affinés pour les écrans moyens */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    // AJUSTEMENT ICI : Position et taille pour tablettes (md)
                    className="absolute top-8 md:top-12 left-10 md:left-16 lg:left-24 w-36 h-36 lg:w-40 lg:h-40 border-2 border-gray-200 rounded-full hidden md:flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm"
                >
                    <Users className="text-gray-400 w-8" />
                    <span className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{t('users')}</span>
                    <span className="text-2xl lg:text-3xl font-bold text-gray-800">200+</span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    // AJUSTEMENT ICI : Position et taille pour tablettes (md)
                    className="absolute top-8 md:top-12 right-10 md:right-16 lg:right-24 w-36 h-36 lg:w-40 lg:h-40 border-2 border-gray-200 rounded-full hidden md:flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm"
                >
                    <Users className="text-gray-400 w-8" />
                    <span className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{t('users')}</span>
                    <span className="text-2xl lg:text-3xl font-bold text-gray-800">200+</span>
                </motion.div>

                {/* Titre principal animé - AJUSTEMENT ICI : Taille de police affinée pour md et lg */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900"
                >
                    {t('preTitle')}<br />
                    <span className="text-kya-orange">{t('title')}</span>
                </motion.h1>

                {/* Sous-titre animé */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-base sm:text-lg text-gray-600"
                >
                    {t('subtitle')}
                </motion.p>

                {/* Boutons d'action animés */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <button className="w-full sm:w-auto bg-kya-orange text-white font-bold py-3 px-8 rounded-md transform transition-all duration-300 hover:bg-kya-orange hover:shadow-lg hover:scale-105">
                        {t('ctaOnline')}
                    </button>
                    <button className="w-full sm:w-auto bg-white text-gray-800 font-bold py-3 px-8 rounded-md border-2 border-gray-300 transform transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105">
                        {t('ctaDownload')}
                    </button>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-4 text-sm text-gray-500"
                >
                    {t('ctaNote')}
                </motion.p>

                {/* Image du logiciel animée */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="mt-10 sm:mt-12 max-w-4xl mx-auto"
                >
                    <Image
                        src="/documentation-rapports.png"
                        alt="Aperçu du logiciel KYA-SolDesign"
                        width={1920}
                        height={1080}
                        className="rounded-lg shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
    );
}