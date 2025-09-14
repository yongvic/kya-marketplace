"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from "@/components/button"

export default function HeaderScroll() {
    const h = useTranslations('Header');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollNavLinks = [
        { href: '/fonctionnalites', textKey: 'sh-features' },
        { href: '/tarifs', textKey: 'sh-pricing' },
        { href: '/ressources', textKey: 'sh-resources' },
    ];

    // Verrouille le scroll du body quand le menu mobile est ouvert
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    // Variants pour les animations
    const headerVariants: Variants = {
        hidden: { y: '-100%', opacity: 0 },
        visible: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };

    const mobileMenuVariants: Variants = {
        hidden: { opacity: 0, y: '-50%' },
        visible: { opacity: 1, y: '0%', transition: { staggerChildren: 0.1 } },
        exit: { opacity: 0, y: '-50%' },
    };

    const linkVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>


            {/* Le header est maintenant rendu en permanence */}
            <motion.header
                className="w-full h-24 bg-white/80 backdrop-blur-lg border-b border-gray-200  left-0 z-10"
                initial="hidden"
                animate="visible"
                variants={headerVariants}
            >
                <div className="w-full h-full flex justify-between items-center px-6 md:px-12 lg:px-18">
                    <Link href="/" className="transition-transform duration-300 hover:scale-105">
                        <Image
                            src={"/kya-soldesign.png"}
                            alt="KYA-SolDesign Logo"
                            width={130} height={60}
                        />
                    </Link>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-800">
                        {scrollNavLinks.map((link) => (
                            <Link
                                key={link.textKey}
                                href={link.href}
                                className="py-2 hover:text-teal-500 transition-colors duration-300"
                            >
                                <span>{h(link.textKey)}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Bouton Desktop */}
                    <div className="hidden md:flex items-center">
                        <Link href="/telecharger">
                            <Button className="text-white font-bold py-3 px-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                                {h('sh-download')}
                            </Button>
                        </Link>
                    </div>

                    {/* Bouton Hamburger Mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isMenuOpen ? 'close' : 'open'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Panneau Menu Mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="relative md:hidden  top-10 left-0 w-full h-[calc(100vh-6rem)] bg-white z-20 flex flex-col items-center justify-center gap-8"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {scrollNavLinks.map((link) => (
                                <motion.div key={link.textKey} variants={linkVariants}>
                                    <Link
                                        href={link.href}
                                        className="text-2xl font-medium text-gray-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span>{h(link.textKey)}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <motion.div variants={linkVariants}>
                            <Link href="/telecharger" onClick={() => setIsMenuOpen(false)}>
                                <Button className="text-white font-bold py-3 px-12 text-lg">
                                    {h('sh-download')}
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}