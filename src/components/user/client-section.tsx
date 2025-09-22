"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ClientSection = () => {
  const c = useTranslations('Client');

  // A list of partner logos.
  const partenaires = [
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
    "/partenaire.png",
  ];
  // Duplicate the list of logos to create a seamless, infinite scrolling effect.
  // When the animation reaches the end of the first set, the second set is already in place.
  const allLogos = [...partenaires, ...partenaires];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto text-center px-4">
        {/* Responsive section titles */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          {c('title')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {c('subtitle')}
        </p>

        {/* Carousel container with responsive width */}
        <div className="relative mx-auto w-full md:w-4/5 lg:w-2/3 overflow-hidden rounded-full">
          {/* The 'mask-image' attribute creates a fade-out effect on the sides for a cleaner look. */}
          <div
            className="flex w-max animate-slide"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {allLogos.map((logo, index) => (
              // Responsive spacing and sizing for logos
              <div key={index} className="flex-shrink-0 px-4 sm:px-8">
                <Image
                  src={logo}
                  alt={`Partenaire ${index + 1}`}
                  width={150} // Width is indicative; CSS classes will take precedence.
                  height={80}  // Height is indicative; CSS classes will take precedence.
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