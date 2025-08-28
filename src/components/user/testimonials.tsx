"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, User, Quote } from "lucide-react";

const testimonialsData = [
    // ... vos données restent les mêmes
    { name: "Young Vic", titleKey: "testimonials.user1.title", testimonialKey: "testimonials.user1.text", icon: User },
    { name: "Jane Doe", titleKey: "testimonials.user2.title", testimonialKey: "testimonials.user2.text", icon: User },
    { name: "John Smith", titleKey: "testimonials.user3.title", testimonialKey: "testimonials.user3.text", icon: User },
];

const UserTestimonials = () => {
    const t = useTranslations("TestimonialSection");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const activeTestimonial = testimonialsData[activeIndex];

    const goToSlide = (index: number) => setActiveIndex(index);
    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(nextSlide, 7000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, activeIndex]);

    return (
        <section className="relative bg-gradient-to-b from-teal-500 via-teal-400 to-white pt-20 pb-32 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2/3 bg-teal-500 transform -skew-y-6 origin-top-left" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                    {t("title")}
                </h2>

                <div
                    className="mt-16 max-w-3xl mx-auto relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative bg-white rounded-3xl shadow-2xl pt-24 pb-16 px-8 flex items-center justify-center min-h-[480px]">

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 z-10">
                            {/* Cercles de fond */}
                            <div className="w-full h-full rounded-full border-[12px] border-orange-300 opacity-15 flex items-center justify-center animate-spin-slow">
                                <div className="w-[85%] h-[85%] rounded-full border-[12px] border-yellow-300 bg-purple-50/60" />
                            </div>

                            {/* NOUVEAU: Conteneur pour l'orbite des 3 points */}
                            <div className="absolute inset-0 animate-reverse-orbit">
                                {/* Point 1 (en haut) */}
                                <div className="absolute inset-0">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-kya-orange opa rounded-full" />
                                </div>
                                {/* Point 2 (120 degrés) */}
                                <div className="absolute inset-0 rotate-[120deg]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-kya-orange rounded-full" />
                                </div>
                                {/* Point 3 (240 degrés) */}
                                <div className="absolute inset-0 rotate-[240deg]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-kya-orange rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
                            {/* ... Figure du profil utilisateur (inchangé) ... */}
                            <figure className="flex flex-col items-center text-center">
                                <div className="p-2 bg-yellow-200 rounded-full shadow-xl border-4 border-white transform transition hover:scale-110">
                                    <activeTestimonial.icon className="w-16 h-16 text-gray-700 bg-white rounded-full p-3" />
                                </div>
                                <figcaption className="mt-2">
                                    <div className="font-bold text-lg text-gray-900">{activeTestimonial.name}</div>
                                    <div className="text-sm text-gray-500">{t(activeTestimonial.titleKey)}</div>
                                </figcaption>
                            </figure>
                        </div>

                        <div key={activeIndex} className="relative z-10 text-center animate-fade-in max-w-md">
                            {/* ... Texte du témoignage (inchangé) ... */}
                            <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 text-purple-200/50 -z-20" />
                            <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed">
                                <span className="block mb-2 font-serif text-5xl text-gray-300">“</span>
                                {t(activeTestimonial.testimonialKey)}
                                <span className="block mt-2 font-serif text-5xl text-gray-300">”</span>
                            </p>
                        </div>
                    </div>

                    {/* ... Boutons de navigation et pagination (inchangés) ... */}
                    <button onClick={prevSlide} className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 w-12 h-12 bg-orange-400 text-white rounded-full shadow-xl hover:bg-orange-500 transition transform hover:scale-110 flex items-center justify-center z-30"><ChevronLeft /></button>
                    <button onClick={nextSlide} className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 w-12 h-12 bg-orange-400 text-white rounded-full shadow-xl hover:bg-orange-500 transition transform hover:scale-110 flex items-center justify-center z-30"><ChevronRight /></button>
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {testimonialsData.map((_, index) => (
                            <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to slide ${index + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserTestimonials;