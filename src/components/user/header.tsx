"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Search, User, ExternalLink, Menu, X, Globe } from "lucide-react";

// Sous-composant pour le sélecteur de langue
const LanguageSwitcher = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const switchLocale = (nextLocale: string) => {
		// ⚠️ avec next/navigation, pas de { locale } dans les options
		router.push(`/${nextLocale}${pathname}`);
	};

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-1 hover:text-kya-green transition-colors"
				aria-label="Changer de langue"
			>
				<Globe size={24} />
				<span className="font-semibold">{locale.toUpperCase()}</span>
			</button>
			{isOpen && (
				<div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border text-black">
					<button onClick={() => switchLocale('fr')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Français</button>
					<button onClick={() => switchLocale('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">English</button>
				</div>
			)}
		</div>
	);
};

export default function Header() {
	const h = useTranslations('Header');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ href: '/', textKey: 'm-acceuil' },
		{ href: '/logiciels', textKey: 'm-logiciel', icon: ChevronDown },
		{ href: '/a-propos', textKey: 'm-a-propos', icon: ExternalLink, isExternal: true },
	];

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
			<div className="w-full h-24 flex justify-between items-center px-6 md:px-12 lg:px-18 border-b border-gray-200">
				{/* Logo */}
				<Link href="/">
					<Image
						src={"/logo.png"}
						alt="Logo"
						width={130}
						height={130}
						className="w-auto h-auto"
						priority
					/>
				</Link>

				{/* Navigation Desktop */}
				<nav className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-700">
					{navLinks.map((link) => (
						<Link
							key={link.textKey}
							href={link.href}
							target={link.isExternal ? '_blank' : '_self'}
							className="flex items-center gap-2 hover:text-kya-green transition-colors duration-300"
						>
							<span>{h(link.textKey)}</span>
							{link.icon && <link.icon size={20} />}
						</Link>
					))}
				</nav>

				{/* Icônes et Langue (Desktop) */}
				<div className="hidden md:flex items-center gap-6">
					<button className="hover:text-kya-green transition-colors" aria-label="Recherche"><Search /></button>
					<button className="hover:text-kya-green transition-colors" aria-label="Compte utilisateur"><User /></button>
					<LanguageSwitcher />
				</div>

				{/* Bouton du Menu Mobile */}
				<div className="md:hidden">
					<button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu">
						{isMenuOpen ? <X size={30} /> : <Menu size={30} />}
					</button>
				</div>
			</div>

			{/* Menu Mobile Overlay */}
			<div className={`
                md:hidden absolute top-24 left-0 w-full h-[calc(100vh-6rem)] bg-white transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
				<nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
					{navLinks.map((link) => (
						<Link
							key={link.textKey}
							href={link.href}
							target={link.isExternal ? '_blank' : '_self'}
							className="flex items-center gap-2 hover:text-kya-green transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<span>{h(link.textKey)}</span>
							{link.icon && <link.icon size={24} />}
						</Link>
					))}
					<div className="border-t border-gray-200 w-3/4 my-4" />
					<div className="flex items-center gap-8">
						<button className="hover:text-kya-green transition-colors" aria-label="Recherche"><Search size={28} /></button>
						<button className="hover:text-kya-green transition-colors" aria-label="Compte utilisateur"><User size={28} /></button>
					</div>
					<div className="mt-4">
						<LanguageSwitcher />
					</div>
				</nav>
			</div>
		</header>
	);
}
