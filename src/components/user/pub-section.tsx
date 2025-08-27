import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '../button';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PubSection = () => {
    const p = useTranslations('PubSection');

    return (
        // L'overflow-hidden sur la section parente est crucial pour couper l'image qui dépasse.
        <section className="bg-white rounded-2xl mb-10 pb-10 sm:pb-20 overflow-hidden">
            
            {/* Contenu principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center -mt-10">
                
                {/* Partie gauche - Texte */}
                {/* Padding ajusté pour être moins important sur mobile */}
                <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1 px-4 sm:px-6 lg:pl-16 xl:pl-32 mt-4 lg:mt-0">
                    {/* Tailles de police réduites pour les écrans plus petits */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-tight">
                        {p('title')}
                    </h1>
                    {/* Tailles de police réduites pour les écrans plus petits */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-snug">
                        {p('subtitle')}
                    </p>
                    <div className="flex justify-center lg:justify-start mt-4">
                        {/* Taille du texte et padding du bouton réduits pour les petits écrans */}
                        <Button className="font-semibold px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-lg text-white">
                            {p('button')}
                        </Button>
                    </div>
                </div>

                {/* Partie droite - Image produit */}
                <div className="relative flex items-center justify-center lg:justify-end w-full h-64 sm:h-80 lg:h-full order-1 lg:order-2">
                    {/* Taille du conteneur de l'image réduite sur les petits écrans */}
                    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] lg:translate-x-[10%]">
                        <Image
                            src="/bac-pub.svg"
                            alt="Fond promo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 800px"
                            priority
                            unoptimized
                        />
                        {/* Produit */}
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {/* Marge négative ajustée pour la réactivité */}
            <div className="flex items-center justify-center gap-4 mt-8 lg:-mt-40">
                <button className="p-2 sm:p-3 border-2 rounded-full hover:bg-gray-100 transition">
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <span className="text-gray-800 font-bold text-lg sm:text-xl">1/5</span>
                <button className="p-2 sm:p-3 border-2 rounded-full bg-orange-500 text-white hover:bg-orange-300 transition">
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
            </div>
        </section>
    );
};

export default PubSection;