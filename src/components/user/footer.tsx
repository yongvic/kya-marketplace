"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
    CheckCircle,
    Mail,
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Youtube,
    ExternalLink
} from 'lucide-react';
import Button from '../button'; // Ensure the path is correct

// Custom hook to detect when a component enters the viewport.
const useInView = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // When the element is intersecting the viewport, update the state.
            if (entry.isIntersecting) {
                setIsInView(true);
                // Stop observing once it's in view to prevent unnecessary checks.
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current; // Create a stable copy for the cleanup function.

        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup function to unobserve the element when the component unmounts.
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return { ref, isInView };
};

const Footer = () => {
    const t = useTranslations('Footer');
    // Use the custom hook to trigger a fade-in animation when the footer is scrolled into view.
    const { ref, isInView } = useInView({ threshold: 0.1 });

    const socialLinks = [
        { href: '#', icon: Facebook, label: 'Facebook' },
        { href: '#', icon: Linkedin, label: 'LinkedIn' },
        { href: '#', icon: Instagram, label: 'Instagram' },
        { href: '#', icon: Twitter, label: 'Twitter' },
        { href: '#', icon: Youtube, label: 'YouTube' },
    ];

    const navLinks = [
        { href: '/', textKey: 'links.home' },
        { href: '/logiciels', textKey: 'links.software' },
        { href: '/a-propos', textKey: 'links.about', isExternal: true },
    ];

    return (
        <footer
            ref={ref}
            className={`bg-slate-900 text-white transition-all duration-1000 ease-out
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6 py-12">
                {/* Top Section: Logo/Description and Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Left Side */}
                    <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
                        <Image src="/logo.png" alt="KYA-Energy Market Logo" width={150} height={50} />
                        <p className="max-w-md text-slate-400">
                            {t('description')}
                        </p>
                        <div className="flex items-center gap-2 text-kya-green font-semibold">
                            <CheckCircle size={20} />
                            <span>{t('iso_certified')}</span>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="flex flex-col gap-4 flex-end lg:items-start">
                        <h3 className="font-bold text-lg">{t('contact_title')}</h3>
                        <div className="relative w-full max-w-sm">
                            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                placeholder={t('email_placeholder')}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <Button className="w-full max-w-sm font-semibold py-3">
                            {t('submit_button')}
                        </Button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 my-10" />

                {/* Bottom Section: Copyright, Social Links, and Nav Links */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {t('copyright')}</p>

                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="p-2 bg-slate-700 rounded-full hover:bg-kya-green hover:scale-110 hover:-rotate-12 transition-all duration-300"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 text-slate-300">
                        {navLinks.map(({ href, textKey, isExternal }) => (
                            <a
                                key={textKey}
                                href={href}
                                className="hover:text-kya-green transition-colors flex items-center gap-1"
                            >
                                {t(textKey)}
                                {isExternal && <ExternalLink size={14} />}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
