"use client";

import { ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react"; // Ligne d'import corrigée



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

    const ref = useRef(null);

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
        // Padding de section ajusté pour être plus petit sur mobile
        <section ref={ref} className=" relative bg-gradient-to-b from-teal-500 via-teal-400 to-white pt-16 pb-24 sm:pt-20 sm:pb-32 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2/3 bg-teal-500 transform -skew-y-6 origin-top-left" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                    {t("title")}
                </h2>

                {/* MODIFIÉ: Le conteneur du contenu est maintenant un 'motion.div' et applique le style 'scale' */}
                <div
                    className="mt-12 sm:mt-16 max-w-3xl mx-auto relative">
                    <div className="relative bg-white rounded-3xl shadow-2xl pt-20 pb-12 px-4 sm:pt-24 sm:pb-16 sm:px-8 flex items-center justify-center min-h-[460px] sm:min-h-[480px]">
                        {/* Le reste de votre JSX reste identique à l'intérieur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 z-10">
                            <div className="w-full h-full rounded-full border-[10px] sm:border-[12px] border-kya-orange opacity-15 flex items-center justify-center animate-spin-slow">
                                <div className="w-[85%] h-[85%] rounded-full border-[10px] sm:border-[12px] border-kya-yellow bg-purple-50/60" />
                            </div>
                            <div className="absolute inset-0 animate-reverse-orbit">
                                <div className="absolute inset-0"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-kya-yellow rounded-full" /></div>
                                <div className="absolute inset-0 rotate-[120deg]"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-kya-yellow rounded-full" /></div>
                                <div className="absolute inset-0 rotate-[240deg]"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-kya-yellow rounded-full" /></div>
                            </div>
                        </div>

                        <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-20">
                            <figure className="flex flex-col items-center text-center">
                                <div className="p-2 bg-kya-yellow rounded-full shadow-xl border-4 border-white transform transition hover:scale-110">
                                    <activeTestimonial.icon className="w-14 h-14 sm:w-16 sm:h-16 text-gray-700 bg-white rounded-full p-2 sm:p-3" />
                                </div>
                                <figcaption className="mt-2">
                                    <div className="font-bold text-base sm:text-lg text-gray-900">{activeTestimonial.name}</div>
                                    <div className="text-xs sm:text-sm text-gray-500">{t(activeTestimonial.titleKey)}</div>
                                </figcaption>
                            </figure>
                        </div>

                        <div key={activeIndex} className="relative z-10 text-center animate-fade-in max-w-md">
                            <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 text-purple-200/50 -z-20" />
                            <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed px-2 sm:px-4">
                                <span className="block mb-1 sm:mb-2 font-serif text-4xl sm:text-5xl text-gray-300">“</span>
                                {t(activeTestimonial.testimonialKey)}
                                <span className="block mt-1 sm:mt-2 font-serif text-4xl sm:text-5xl text-gray-300">”</span>
                            </p>
                        </div>
                    </div>

                    <button onClick={prevSlide} className="absolute top-1/2 -left-2 sm:-left-4 md:-left-8 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-kya-orange text-white rounded-full shadow-xl hover:bg-kya-orange transition transform hover:scale-110 flex items-center justify-center z-30"><ChevronLeft size={24} /></button>
                    <button onClick={nextSlide} className="absolute top-1/2 -right-2 sm:-right-4 md:-right-8 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-kya-orange text-white rounded-full shadow-xl hover:bg-kya-orange transition transform hover:scale-110 flex items-center justify-center z-30"><ChevronRight size={24} /></button>

                    <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                        {testimonialsData.map((_, index) => (
                            <button key={index} onClick={() => goToSlide(index)} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-kya-orange scale-125" : "bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to slide ${index + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserTestimonials;