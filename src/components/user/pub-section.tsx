import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '../button';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PubSection = () => {
  const p = useTranslations('PubSection');

  return (
    <section className="bg-white rounded-2xl shadow-xl">
      {/* Contenu principal */}
      <div className="w-full h-[calc(100vh-6rem)] grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center overflow-hidden px-4 lg:px-0">
        
        {/* Partie gauche - Texte */}
        <div className="flex flex-col gap-4 lg:gap-8 max-w-3xl w-full lg:pl-32 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight lg:text-nowrap">
            {p('title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 leading-snug">
            {p('subtitle')}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button className="font-semibold px-4 py-3 lg:px-6 lg:py-4 text-white text-lg sm:text-xl lg:text-2xl">
              {p('button')}
            </Button>
          </div>
        </div>

        {/* Partie droite - Image produit avec fond dégradé */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 min-h-[300px] lg:min-h-0">
          {/* Fond dégradé */}
          <Image
            src="/bac-pub.svg"
            alt="Fond promo"
            width={1000}
            height={1000}
            className="absolute object-contain w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] lg:-mr-64"
            priority
            unoptimized
          />
          {/* Produit */}
          <Image
            src="/kya-sop.png"
            alt="KYA-SOP"
            width={400}
            height={400}
            className="absolute z-10 object-contain w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] lg:right-16"
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 lg:gap-6 -mt-6 lg:-mt-10 pb-4 lg:pb-0">
        <button className="p-3 lg:p-4 border-2 rounded-full hover:bg-gray-100 transition">
          <ChevronLeft size={24} className="lg:w-8 lg:h-8" />
        </button>
        <span className="text-gray-800 font-bold text-xl lg:text-2xl">1/5</span>
        <button className="p-3 lg:p-4 border-2 rounded-full bg-orange-500 text-white hover:bg-orange-300 transition">
          <ChevronRight size={24} className="lg:w-8 lg:h-8" />
        </button>
      </div>
    </section>
  );
};

export default PubSection;