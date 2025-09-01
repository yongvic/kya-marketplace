// src/components/logiciels/logiciels-header.tsx
"use client";

import Image from "next/image";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ChevronDown, Search, User, ExternalLink } from "lucide-react";

export default function LogicielsHeader() {
    const h = useTranslations('Header');
    const pathname = usePathname();

    const topNavLinks = [
        { href: '/', textKey: 'm-acceuil' },
        { href: '/logiciels', textKey: 'm-logiciel', icon: ChevronDown },
        { href: '/a-propos', textKey: 'm-a-propos', icon: ExternalLink, isExternal: true },
    ];

    // Simple vérification si le lien est actif
    const isLinkActive = (href: string) => pathname.endsWith(href);

    return (
        <div className="w-full h-24 bg-white border-b border-gray-200">
            <div className="w-full h-full flex justify-between items-center px-6 md:px-12 lg:px-18">
                <Link href="/">
                    <Image
                        src={`/${h('link-logo')}`}
                        alt="KYA-Energy MARKET Logo"
                        width={130}
                        height={60}
                        priority
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
                    {topNavLinks.map((link) => (
                        <Link
                            key={link.textKey}
                            href={link.href}
                            target={link.isExternal ? '_blank' : '_self'}
                            className={`flex items-center gap-2 pb-1 hover:text-teal-600 transition-colors duration-300 border-b-2 ${isLinkActive(link.href) ? 'border-teal-500 text-teal-600' : 'border-transparent'}`}
                        >
                            <span>{h(link.textKey)}</span>
                            {link.icon && <link.icon size={20} />}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-6">
                    <button className="hover:text-teal-600 transition-colors" aria-label="Recherche"><Search /></button>
                    <button className="hover:text-teal-600 transition-colors" aria-label="Compte utilisateur"><User /></button>
                </div>
            </div>
        </div>
    );
}