"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ExternalLink, Menu, X, Globe } from "lucide-react";

// Le sélecteur de langue
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
		const newPath = pathname.startsWith(`/${locale}`) ? pathname.substring(locale.length + 1) : pathname;
		router.push(`/${nextLocale}${newPath}`);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-1 hover:text-teal-500 transition-colors"
				aria-label="Changer de langue"
			>
				<Globe size={24} />
				<span className="font-semibold">{locale.toUpperCase()}</span>
			</button>
			{isOpen && (
				<div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border text-black z-50">
					<button onClick={() => switchLocale('fr')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Français</button>
					<button onClick={() => switchLocale('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">English</button>
				</div>
			)}
		</div>
	);
};

// Le composant Header principal, sans positionnement fixe par défaut.
export default function Header() {
	const h = useTranslations('Header');
	const pathname = usePathname();
	const locale = useLocale();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ href: '/', textKey: 'm-acceuil' },
		{ href: '/logiciels', textKey: 'm-logiciel' },
		{ href: 'https://www.google.com', textKey: 'm-a-propos', icon: ExternalLink, isExternal: true },
	];

	const isLinkActive = (href: string) => {
		const cleanedPathname = pathname.replace(`/${locale}`, '') || '/';
		return cleanedPathname === href;
	};

	return (
		<div className="w-full h-24 bg-white border-b border-gray-200">
			<div className="w-full h-full flex justify-between items-center px-6 md:px-12 lg:px-18">
				<Link href="/" className="transition-transform duration-300 hover:scale-105">
					<Image
						src={"/logo.png"}
						alt="KYA-Energy MARKET Logo"
						width={130} height={60} priority
					/>
				</Link>

				<nav className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-800">
					{navLinks.map((link) => (
						<Link
							key={link.textKey}
							href={link.href}
							target={link.isExternal ? '_blank' : '_self'}
							className="relative flex items-center gap-2 py-2 transition-transform duration-300 ease-out hover:text-teal-500 hover:-translate-y-0.5"
						>
							<span>{h(link.textKey)}</span>
							{link.icon && <link.icon size={20} />}
							<span className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 transform origin-left transition-transform duration-300 ease-out ${isLinkActive(link.href) ? 'scale-x-100' : 'scale-x-0'}`}></span>
						</Link>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-4">
					<button className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-teal-500 transition-colors" aria-label="Recherche"><Search /></button>
					<button className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-teal-500 transition-colors" aria-label="Compte utilisateur"><User /></button>
					<LanguageSwitcher />
				</div>

				<div className="md:hidden">
					<button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu">
						{isMenuOpen ? <X size={30} /> : <Menu size={30} />}
					</button>
				</div>
			</div>

			{/* Menu Mobile Overlay */}
			<div className={`
                md:hidden fixed top-24 left-0 w-full h-[calc(100vh-6rem)] bg-white transform transition-transform duration-500 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
				<nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
					{navLinks.map((link) => (
						<Link
							key={link.textKey}
							href={link.href}
							target={link.isExternal ? '_blank' : '_self'}
							className="flex items-center gap-2 hover:text-teal-500 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<span>{h(link.textKey)}</span>
							{link.icon && <link.icon size={24} />}
						</Link>
					))}
					<div className="border-t border-gray-200 w-3/4 my-4" />
					<div className="flex items-center gap-8">
						<button className="hover:text-teal-500 transition-colors" aria-label="Recherche"><Search size={28} /></button>
						<button className="hover:text-teal-500 transition-colors" aria-label="Compte utilisateur"><User size={28} /></button>
					</div>
					<div className="mt-4">
						<LanguageSwitcher />
					</div>
				</nav>
			</div>
		</div>
	);
}