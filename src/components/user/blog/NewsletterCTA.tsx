'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('BlogPage');

    useGSAP(() => {
        const el = containerRef.current;
        if (!el) return;

        gsap.from(el, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-gradient-to-r from-kya-green to-green-700 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative w-full h-64 md:h-full rounded-2xl overflow-hidden">
                    <Image src="/images2.jpeg" alt="Personne utilisant un ordinateur portable" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="text-white space-y-4">
                    <h2 className="text-3xl font-bold">{t('newsletterTitle')}</h2>
                    <p>{t('newsletterSubtitle')}</p>
                    <form className="flex flex-col sm:flex-row gap-3 mt-4">
                        <input type="email" placeholder={t('emailPlaceholder')} className="w-full px-4 py-3 rounded-lg text-gray-800" />
                        <button type="submit" className="bg-kya-orange hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-lg transition-colors">{t('subscribeButton')}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}