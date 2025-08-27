"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ClientSection = () => {
  const c = useTranslations('Client');

  // On duplique la liste pour assurer un défilement infini et fluide
  const partenaires = [
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
  ];
  const allLogos = [...partenaires, ...partenaires]; // Duplication pour l'effet de boucle

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto text-center px-4">
        {/* Titres avec tailles de police responsives */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {c('title')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {c('subtitle')}
        </p>

        {/* Conteneur du carrousel avec une largeur responsive */}
        <div className="relative mx-auto w-full md:w-4/5 lg:w-2/3 overflow-hidden rounded-full">
          {/* L'attribut `mask-image` crée un effet de fondu sur les côtés pour une meilleure intégration visuelle */}
          <div
            className="flex w-max animate-slide"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {allLogos.map((logo, index) => (
              // Espacement et taille des logos responsifs
              <div key={index} className="flex-shrink-0 px-4 sm:px-8">
                <Image
                  src={logo}
                  alt={`Partenaire ${index + 1}`}
                  width={150} // La largeur peut être indicative, le style CSS primera
                  height={80}  // La hauteur peut être indicative, le style CSS primera
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;