"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ExternalLink, Menu, X, Globe, Loader, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

// --- SÉLECTEUR DE LANGUE ---
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
				<div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border text-black z-80 min-w-[120px]">
					<button onClick={() => switchLocale('fr')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Français</button>
					<button onClick={() => switchLocale('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">English</button>
				</div>
			)}
		</div>
	);
};

// --- COMPOSANT DE RÉSULTATS DE RECHERCHE ---
const SearchResultsDropdown = ({ query, onResultClick }: { query: string, onResultClick: () => void }) => {
	const [results, setResults] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (query.trim().length < 3) {
			setResults([]);
			return;
		}

		setIsLoading(true);
		const searchTimeout = setTimeout(() => {
			const bodyText = document.body.innerText;
			const regex = new RegExp(`.{0,50}${query}.{0,50}`, 'gi');
			const matches = bodyText.match(regex);

			if (matches) {
				const uniqueMatches = [...new Set(matches)];
				setResults(uniqueMatches.slice(0, 5));
			} else {
				setResults([]);
			}

			setIsLoading(false);
		}, 500);

		return () => clearTimeout(searchTimeout);
	}, [query]);

	if (!query || query.length < 3) return null;

	return (
		<div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border rounded-md shadow-lg z-10">
			{isLoading && (
				<div className="flex justify-center items-center p-4">
					<Loader className="animate-spin text-teal-500" />
				</div>
			)}
			{!isLoading && results.length > 0 && (
				<ul>
					<p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400">Résultats sur cette page</p>
					{results.map((result, index) => (
						<li key={index}>
							<a
								href={`#`}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
								onClick={(e) => { e.preventDefault(); onResultClick(); }}
								dangerouslySetInnerHTML={{ __html: result.replace(new RegExp(query, 'gi'), (match) => `<strong class="text-teal-500">${match}</strong>`) }}
							/>
						</li>
					))}
				</ul>
			)}
			{!isLoading && results.length === 0 && (
				<p className="px-4 py-3 text-sm text-gray-500">Aucun résultat trouvé pour &quot;{query}&quot;.</p>
			)}
		</div>
	);
};

// --- DÉFINITION DES TYPES POUR LES LIENS DE NAVIGATION ---
type NavLinkBase = {
	textKey: string;
};

type StandardNavLink = NavLinkBase & {
	href: string;
	isDropdown?: false;
	icon?: React.ElementType;
	isExternal?: boolean;
};

type DropdownNavLink = NavLinkBase & {
	isDropdown: true;
	dropdownItems: {
		href: string;
		textKey: string;
	}[];
};

type NavLink = StandardNavLink | DropdownNavLink;


// --- HEADER PRINCIPAL ---
export default function Header() {
	const h = useTranslations('Header');
	const pathname = usePathname();
	const locale = useLocale();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchRef = useRef<HTMLDivElement>(null);
	const [isSoftwareDropdownOpen, setSoftwareDropdownOpen] = useState(false);

	const navLinks: NavLink[] = [
		{ href: '/', textKey: 'm-acceuil' },
		{
			textKey: 'm-logiciel',
			isDropdown: true,
			dropdownItems: [
				{ href: '/logiciels', textKey: 'KYA-SolDesign' }
			]
		},
		{ href: '/blog', textKey: 'm-blog' },
		{ href: 'https://www.google.com', textKey: 'm-a-propos', icon: ExternalLink, isExternal: true },
	];

	const isLinkActive = (href: string) => {
		const cleanedPathname = pathname.replace(`/${locale}`, '') || '/';
		if (href === '/') {
			return cleanedPathname === '/';
		}
		return cleanedPathname.startsWith(href);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsSearchActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsSearchActive(false);
				setIsMobileSearchOpen(false);
				setSearchQuery("");
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<header className="w-full h-24 bg-white border-b border-gray-200 sticky top-0 z-30">
			<div className="w-full h-full flex items-center px-6 md:px-12 lg:px-18">
				<div className="flex-1 flex justify-start">
					<Link href="/" className="transition-transform duration-300 hover:scale-105 flex-shrink-0">
						<Image
							src={"/logo.png"}
							alt="KYA-Energy MARKET Logo"
							width={130}
							height={60}
							priority
						/>
					</Link>
				</div>

				<nav className={`hidden md:flex justify-center items-center gap-10 text-lg font-medium text-gray-800 transition-opacity duration-300 ease-in-out ${isSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
					{navLinks.map((link) => (
						link.isDropdown ? (
							<div
								key={link.textKey}
								className="relative"
								onMouseEnter={() => setSoftwareDropdownOpen(true)}
								onMouseLeave={() => setSoftwareDropdownOpen(false)}
							>
								<button className="relative flex items-center gap-2 py-2 transition-transform duration-300 ease-out hover:text-teal-500 hover:-translate-y-0.5">
									<span>{h(link.textKey)}</span>
									<ChevronDown size={20} className={`transition-transform duration-300 ${isSoftwareDropdownOpen ? 'rotate-180' : ''}`} />
									<span className={`absolute bottom-0 left-0 z-40 w-full h-0.5 bg-teal-500 transform origin-left transition-transform duration-300 ease-out ${isLinkActive('/logiciels') ? 'scale-x-100' : 'scale-x-0'}`}></span>
								</button>
								<AnimatePresence>
									{isSoftwareDropdownOpen && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.2 }}
											className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
										>
											{link.dropdownItems?.map(item => (
												<Link
													key={item.textKey}
													href={item.href}
													className="block px-4 py-3 text-base text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
												>
													{item.textKey}
												</Link>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						) : (
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
						)
					))}
				</nav>

				<div className="flex-1 hidden md:flex items-center justify-end gap-4">
					<div ref={searchRef} className="relative flex items-center">
						<div className={`flex items-center bg-gray-100 rounded-full transition-all duration-300 ease-in-out ${isSearchActive ? 'w-72 shadow-inner' : 'w-10'}`}>
							<button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 flex-shrink-0" aria-label="Ouvrir la recherche">
								<Search className="text-gray-700 hover:text-teal-500" />
							</button>
							<input
								type="text"
								placeholder="Rechercher sur la page..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setIsSearchActive(true)}
								className={`w-full bg-transparent border-none focus:ring-0 transition-opacity outline-none duration-200 text-gray-800 ${isSearchActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
							/>
						</div>
						{isSearchActive && <SearchResultsDropdown query={searchQuery} onResultClick={() => setIsSearchActive(false)} />}
					</div>
					<Link href="/dashboard/auth" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-teal-500 transition-colors" aria-label="Compte utilisateur"><User /></Link>
					<LanguageSwitcher />
				</div>

				<div className="md:hidden flex-1 flex justify-end">
					<button onClick={() => {
						const newMenuState = !isMenuOpen;
						setIsMenuOpen(newMenuState);
						if (newMenuState) {
							setIsMobileSearchOpen(false);
						}
					}} aria-label="Ouvrir le menu">
						{isMenuOpen ? <X size={30} /> : <Menu size={30} />}
					</button>
				</div>
			</div>

			{/* Menu Mobile Overlay */}
			<div className={`md:hidden fixed top-24 left-0 z-30 w-full h-[calc(100vh-6rem)] bg-white transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
				<nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
					{navLinks.map((link) => (
						<Link
							key={link.textKey}
							href={link.isDropdown ? '#' : link.href}
							target={!link.isDropdown && link.isExternal ? '_blank' : '_self'}
							className="flex items-center gap-2 hover:text-teal-500 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							<span>{h(link.textKey)}</span>
							{!link.isDropdown && link.icon && <link.icon size={24} />}
						</Link>
					))}
					<div className="border-t border-gray-200 w-3/4 my-4" />
					<div className="flex items-center gap-8">
						<button onClick={() => {
							setIsMobileSearchOpen(true);
							setIsMenuOpen(false);
						}} className="hover:text-teal-500 transition-colors" aria-label="Recherche">
							<Search size={28} />
						</button>
						<Link href="/dashboard/auth" className="hover:text-teal-500 transition-colors" aria-label="Compte utilisateur" onClick={() => setIsMenuOpen(false)}><User size={28} /></Link>
					</div>
					<div className="mt-4">
						<LanguageSwitcher />
					</div>
				</nav>
			</div>

			{/* Overlay de Recherche pour Mobile */}
			<div className={`md:hidden fixed top-0 left-0 z-40 w-full h-full bg-white transform transition-transform duration-300 ease-in-out ${isMobileSearchOpen ? 'translate-x-0' : 'translate-x-full'}`}>
				<div className="flex flex-col h-full">
					<div className="flex items-center p-4 border-b border-gray-200 flex-shrink-0">
						<button onClick={() => setIsMobileSearchOpen(false)} className="p-2 mr-2" aria-label="Retour">
							<ArrowLeft size={24} />
						</button>
						<input
							type="text"
							placeholder={h("searchPlaceholder")}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full text-lg bg-transparent border-none focus:ring-0"
							autoFocus
						/>
					</div>
					<div className="flex-grow overflow-y-auto">
						<SearchResultsDropdown
							query={searchQuery}
							onResultClick={() => {
								setIsMobileSearchOpen(false);
								setSearchQuery('');
							}}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}