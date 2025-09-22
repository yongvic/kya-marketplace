import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '../button';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PubSection = () => {
    const p = useTranslations('PubSection');

    return (
        // `overflow-hidden` on the parent section is crucial to clip the decorative image
        // that intentionally extends beyond the component's bounds.
        <section className="bg-white rounded-2xl mb-10 pb-10 sm:pb-20 overflow-hidden">

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center -mt-10">

                {/* Left Side - Text Content */}
                {/* Padding is adjusted for smaller screens. */}
                <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1 px-4 sm:px-6 lg:pl-16 xl:pl-32 mt-4 lg:mt-0">
                    {/* Font sizes are reduced for smaller screens to improve readability. */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-tight">
                        {p('title')}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-snug">
                        {p('subtitle')}
                    </p>
                    <div className="flex justify-center lg:justify-start mt-4">
                        {/* Button text and padding are scaled down on smaller screens. */}
                        <Button className="font-semibold px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-lg shadow-m text-white">
                            {p('button')}
                        </Button>
                    </div>
                </div>

                {/* Right Side - Product Image */}
                <div className="relative flex items-center justify-center lg:justify-end w-full h-64 sm:h-80 lg:h-full order-1 lg:order-2 pointer-events-none">
                    {/* The image container's size is reduced on smaller screens. */}
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
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            {/* Negative margin is adjusted responsively to position the controls correctly. */}
            <div className="flex items-center justify-center gap-4 mt-8 lg:-mt-40">
                <button className="p-2 sm:p-3 border-2 rounded-full hover:bg-gray-100 transition">
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <span className="text-gray-800 font-bold text-lg sm:text-xl">1/5</span>
                <button className="p-2 sm:p-3 border-2 rounded-full bg-kya-orange text-white hover:bg-kya-orange/50 transition">
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
            </div>
        </section>
    );
};

export default PubSection;