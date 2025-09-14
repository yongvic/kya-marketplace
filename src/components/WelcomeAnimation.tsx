'use client';

import { useEffect, useRef, FC } from 'react';
import { gsap } from 'gsap';

const WelcomeAnimation: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const tl = gsap.timeline();

            // --- ANIMATION 1: Les bulles tombent et rebondissent ---
            tl.from(".letter-bubble", {
                y: "-100vh",
                opacity: 0,
                duration: 1.5,
                ease: "bounce.out",
                stagger: { each: 0.05, from: "random" }
            });

            // --- ANIMATION 2: Les bulles "éclatent" ---
            tl.to(".letter-bubble", {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                stagger: { each: 0.05, from: "random" }
            }, "-=1.0");

            // --- ANIMATION 3: Les lettres finales apparaissent ---
            tl.to(".final-letter", {
                opacity: 1,
                duration: 0.4,
                stagger: { each: 0.05, from: "random" }
            }, "<"); // Le "<" démarre en même temps que l'animation précédente

            // --- NOUVELLE ANIMATION 4: Le texte final disparaît en s'envolant ---
            tl.to(".final-letter", {
                y: "-50px", // Monte légèrement
                opacity: 0, // Disparaît en fondu
                duration: 0.75,
                ease: "power2.in",
                stagger: { each: 0.05, from: "start" } // Disparaît de gauche à droite
            }, "+=1.5"); // Le "+=1.5" attend 1.5s après la fin de l'apparition

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const text = "Welcome to KYA Energy Group";
    const letters = text.split("").map((char, index) => {
        const colors = ['bg-kya-green', 'bg-kya-yellow', 'bg-kya-coffee', 'bg-kya-orange', 'bg-kya-yellow'];
        const colorClass = colors[index % colors.length];

        if (char === ' ') {
            return <span key={index} className="inline-block w-4 md:w-6"></span>; // Espace responsive
        }

        return (
            <div key={index} className="relative inline-block">
                {/* LA CORRECTION CLÉ EST ICI : Le style du dégradé est appliqué DIRECTEMENT à la lettre */}
                <span className="final-letter opacity-0 bg-gradient-to-r from-kya-green via-kya-yellow to-kya-orange text-transparent bg-clip-text">
                    {char}
                </span>

                {/* La bulle, positionnée par-dessus la lettre */}
                <div className={`letter-bubble absolute inset-0 rounded-full ${colorClass}`}></div>
            </div>
        );
    });

    return (
        <div ref={containerRef} className="relative flex h-screen w-full items-center justify-center bg-white overflow-hidden z-40">
            {/* Le H1 est maintenant un simple conteneur pour la taille de police et le centrage */}
            <div className="z-10 text-4xl text-center font-bold 
                         md:text-6xl lg:text-7xl">
                {letters}
            </div>
        </div>
    );
};

export default WelcomeAnimation;