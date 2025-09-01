"use client";

import Image from "next/image";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from "@/components/button";

export default function HeaderScroll() {
    const h = useTranslations('Header');

    const scrollNavLinks = [
        { href: '/fonctionnalites', textKey: 'sh-features' },
        { href: '/tarifs', textKey: 'sh-pricing' },
        { href: '/ressources', textKey: 'sh-resources' },
    ];

    return (
        <div className="w-full h-24 bg-white">
            <div className="w-full h-full flex justify-between items-center px-6 md:px-12 lg:px-18">
                <Link href="/" className="transition-transform duration-300 hover:scale-105">
                    <Image
                        src={"/kya-soldesign.png"}
                        alt="KYA-SolDesign Logo"
                        width={130} height={60}
                    />
                </Link>

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

                <div className="hidden md:flex items-center">
                    <Link href="/telecharger">


                        <Button className="text-white font-bold py-3 px-6  transform transition-all duration-300  hover:shadow-lg hover:scale-105">
                            {h('sh-download')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}