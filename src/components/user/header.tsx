"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, ExternalLink, Menu, X, Globe, Loader, ArrowLeft } from "lucide-react";

// --- SÉLECTEUR DE LANGUE (INCHANGÉ) ---
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
				<div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border text-black z-50 min-w-[120px]">
					<button onClick={() => switchLocale('fr')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Français</button>
					<button onClick={() => switchLocale('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">English</button>
				</div>
			)}
		</div>
	);
};

// --- COMPOSANT DE RÉSULTATS DE RECHERCHE (AMÉLIORÉ) ---
// Ce composant recherche maintenant le texte dans le DOM de la page actuelle.
const SearchResultsDropdown = ({ query, onResultClick }: { query: string, onResultClick: () => void }) => {
	const [results, setResults] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (query.trim().length < 3) { // On augmente à 3 caractères pour de meilleurs résultats
			setResults([]);
			return;
		}

		setIsLoading(true);
		const searchTimeout = setTimeout(() => {
			// Logique de recherche sur la page actuelle
			const bodyText = document.body.innerText;
			const regex = new RegExp(`.{0,50}${query}.{0,50}`, 'gi'); // Trouve le mot avec un peu de contexte autour
			const matches = bodyText.match(regex);

			// Nettoyage des résultats pour éviter les doublons et les textes non pertinents
			if (matches) {
				const uniqueMatches = [...new Set(matches)];
				setResults(uniqueMatches.slice(0, 5)); // Limite à 5 résultats
			} else {
				setResults([]);
			}

			setIsLoading(false);
		}, 500); // Debounce pour ne pas surcharger la recherche

		return () => clearTimeout(searchTimeout);
	}, [query]);

	if (!query || query.length < 3) return null;

	return (
		<div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border rounded-md shadow-lg z-50">
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
							{/* Cliquer sur un résultat pourrait faire défiler la page jusqu'à cet élément à l'avenir */}
							<a
								href={`#`} // Idéalement, on voudrait un lien vers l'ancre de l'élément trouvé
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

// --- HEADER PRINCIPAL (RÉVISÉ) ---
export default function Header() {
	const h = useTranslations('Header');
	const pathname = usePathname();
	const locale = useLocale();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// NOUVEAUX ÉTATS: pour la recherche intégrée
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchRef = useRef<HTMLDivElement>(null);

	const navLinks = [
		{ href: '/', textKey: 'm-acceuil' },
		{ href: '/logiciels', textKey: 'm-logiciel' },
		{ href: 'https://www.google.com', textKey: 'm-a-propos', icon: ExternalLink, isExternal: true },
	];

	const isLinkActive = (href: string) => {
		const cleanedPathname = pathname.replace(`/${locale}`, '') || '/';
		return cleanedPathname === href;
	};

	// Gère la fermeture des overlays (recherche, menu) en cliquant à l'extérieur
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsSearchActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Gère la fermeture avec la touche "Échap"
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

	// Ferme le menu principal si la recherche mobile est ouverte
	useEffect(() => {
		if (isMobileSearchOpen && isMenuOpen) {
			setIsMenuOpen(false);
		}
	}, [isMobileSearchOpen, isMenuOpen]);


	return (
		<header className="w-full h-24 bg-white border-b border-gray-200 sticky top-0 z-40">
			<div className="w-full h-full flex items-center px-6 md:px-12 lg:px-18">
				{/* Section Gauche: Logo */}
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

				{/* Section Centrale: Navigation (visible sur desktop) */}
				<nav className="hidden md:flex justify-center items-center gap-10 text-lg font-medium text-gray-800">
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

				{/* Section Droite: Actions (recherche, compte, langue) */}
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
								className={`w-full bg-transparent border-none focus:ring-0 transition-opacity duration-200 text-gray-800 ${isSearchActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
							/>
						</div>
						{isSearchActive && <SearchResultsDropdown query={searchQuery} onResultClick={() => setIsSearchActive(false)} />}
					</div>
					<Link href="/dashboard/auth" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-teal-500 transition-colors" aria-label="Compte utilisateur"><User /></Link>
					<LanguageSwitcher />
				</div>

				{/* Bouton du menu pour mobile */}
				<div className="md:hidden flex-1 flex justify-end">
					<button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu">
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
						<button onClick={() => setIsMobileSearchOpen(true)} className="hover:text-teal-500 transition-colors" aria-label="Recherche">
							<Search size={28} />
						</button>
						<Link href="/dashboard/auth" className="hover:text-teal-500 transition-colors" aria-label="Compte utilisateur" onClick={() => setIsMenuOpen(false)}><User size={28} /></Link>
					</div>
					<div className="mt-4">
						<LanguageSwitcher />
					</div>
				</nav>
			</div>

			{/* NOUVEAU: Overlay de Recherche pour Mobile */}
			<div className={`md:hidden fixed top-0 left-0 z-40 w-full h-full bg-white transform transition-transform duration-300 ease-in-out ${isMobileSearchOpen ? 'translate-x-0' : 'translate-x-full'}`}>
				<div className="flex flex-col h-full">
					<div className="flex items-center p-4 border-b border-gray-200 flex-shrink-0">
						<button onClick={() => setIsMobileSearchOpen(false)} className="p-2 mr-2" aria-label="Retour">
							<ArrowLeft size={24} />
						</button>
						<input
							type="text"
							placeholder="Rechercher sur la page..."
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