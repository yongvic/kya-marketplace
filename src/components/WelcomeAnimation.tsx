'use client';

import { useEffect, useRef, FC } from 'react';
import { gsap } from 'gsap';

const WelcomeAnimation: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set up the GSAP animation context.
        const ctx = gsap.context(() => {

            const tl = gsap.timeline();

            // --- ANIMATION 1: Bubbles fall from the top and bounce. ---
            tl.from(".letter-bubble", {
                y: "-100vh",
                opacity: 0,
                duration: 1.5,
                ease: "bounce.out",
                stagger: { each: 0.05, from: "random" } // Stagger for a more natural effect.
            });

            // --- ANIMATION 2: Bubbles "burst" by scaling down to zero. ---
            tl.to(".letter-bubble", {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                stagger: { each: 0.05, from: "random" }
            }, "-=1.0"); // Overlap with the end of the previous animation.

            // --- ANIMATION 3: The final text letters fade in. ---
            tl.to(".final-letter", {
                opacity: 1,
                duration: 0.4,
                stagger: { each: 0.05, from: "random" }
            }, "<"); // The "<" ensures this starts at the same time as the previous animation.

            // --- ANIMATION 4: The final text flies up and fades out. ---
            tl.to(".final-letter", {
                y: "-50px", // Move up slightly.
                opacity: 0, // Fade out.
                duration: 0.75,
                ease: "power2.in",
                stagger: { each: 0.05, from: "start" } // Stagger from left to right.
            }, "+=1.5"); // Wait 1.5s after the previous animation completes.

        }, containerRef);

        // Clean up the GSAP context on component unmount.
        return () => ctx.revert();
    }, []);

    const text = "Welcome to KYA Energy Group";
    const letters = text.split("").map((char, index) => {
        const colors = ['bg-kya-green', 'bg-kya-yellow', 'bg-kya-coffee', 'bg-kya-orange', 'bg-kya-yellow'];
        const colorClass = colors[index % colors.length];

        if (char === ' ') {
            return <span key={index} className="inline-block w-4 md:w-6"></span>; // Responsive space.
        }

        return (
            <div key={index} className="relative inline-block">
                {/* The final letter, initially invisible, with a gradient style. */}
                <span className="final-letter opacity-0 bg-gradient-to-r from-kya-green via-kya-yellow to-kya-orange text-transparent bg-clip-text">
                    {char}
                </span>

                {/* The colored bubble, positioned on top of the letter. */}
                <div className={`letter-bubble absolute inset-0 rounded-full ${colorClass}`}></div>
            </div>
        );
    });

    return (
        <div ref={containerRef} className="relative flex h-screen w-full items-center justify-center bg-white overflow-hidden z-40">
            {/* The main container for the animated text. */}
            <div className="z-10 text-4xl text-center font-bold 
                         md:text-6xl lg:text-7xl">
                {letters}
            </div>
        </div>
    );
};

export default WelcomeAnimation;