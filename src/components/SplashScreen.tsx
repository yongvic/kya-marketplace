'use client';

import { useState, useEffect, FC } from 'react';

interface SplashScreenProps {
    onAnimationComplete: () => void;
}

const ZipperIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-12 text-gray-600 drop-shadow-lg">
        <path d="M10.94,6.45L12,5.39L13.06,6.45L12,7.5L10.94,6.45M12,2A1,1 0 0,1 13,3V15.54L15.39,17.94C15.58,18.13 15.69,18.38 15.69,18.64C15.69,19.19 15.23,19.65 14.68,19.65C14.42,19.65 14.17,19.54 13.97,19.34L12,17.38L10.03,19.34C9.83,19.54 9.58,19.65 9.32,19.65C8.77,19.65 8.31,19.19 8.31,18.64C8.31,18.38 8.42,18.13 8.61,17.94L11,15.54V3A1,1 0 0,1 12,2M12,9.12L16.2,13.31C16.5,13.6 17,13.83 17,14.5C17,15.88 15.88,17 14.5,17C14.13,17 13.8,16.9 13.5,16.7L12,15.2L10.5,16.7C10.2,16.9 9.87,17 9.5,17C8.12,17 7,15.88 7,14.5C7,13.83 7.5,13.6 7.8,13.31L12,9.12Z" />
    </svg>
);

const SplashScreen: FC<SplashScreenProps> = ({ onAnimationComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let animationFrameId: number;
        const startTimer = setTimeout(() => {
            let startTime: number | null = null;
            const animationDuration = 1500;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const newProgress = Math.min((elapsed / animationDuration) * 100, 100);
                setProgress(newProgress);

                if (newProgress < 100) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setTimeout(() => {
                        setIsFinished(true);
                        onAnimationComplete();
                    }, 300);
                }
            };
            animationFrameId = requestAnimationFrame(animate);
        }, 500);

        return () => {
            clearTimeout(startTimer);
            cancelAnimationFrame(animationFrameId);
        };
    }, [onAnimationComplete]);

    const zipperY = progress;
    const teethSeparation = (progress / 100) * 20;

    const zipperTeethSVG = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3e%3crect x='5' y='0' width='15' height='8' rx='2' fill='%23A0AEC0'/%3e%3c/svg%3e";

    if (isFinished) return null;

    return (
        <div style={{ clipPath: 'url(#zipper-clip-path)' }} className="fixed inset-0 z-50 bg-gray-100 overflow-hidden">

            <div className="absolute inset-0 flex justify-center">
                {/* Dents de gauche */}
                <div className="h-full w-1/2" style={{
                    transform: `translateX(${teethSeparation}px)`,
                    backgroundImage: `url('${zipperTeethSVG}')`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'right center',
                }}></div>
                {/* Dents de droite (symétrique) */}
                <div className="h-full w-1/2" style={{
                    backgroundImage: `url('${zipperTeethSVG}')`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'left center',
                    transformOrigin: 'left',
                    // --- CORRECTION APPLIQUÉE ICI ---
                    // Les deux transformations sont maintenant sur la même ligne,
                    // séparées par un espace.
                    transform: `scaleX(-1) translateX(-${teethSeparation}px)`,
                }}></div>
            </div>

            {/* Tirette qui se déplace */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-500"
                style={{ top: `${zipperY}%`, opacity: progress > 95 ? 0 : 1 }}
            >
                <ZipperIcon />
            </div>

            {/* Définition du SVG pour le clip-path (invisible) */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="zipper-clip-path" clipPathUnits="objectBoundingBox">
                        <path d={`M 0,0 
                       L 0,${progress / 100} 
                       C 0.25,${(progress / 100) + 0.05} 0.75,${(progress / 100) + 0.05} 1,${progress / 100} 
                       L 1,0 Z`} />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default SplashScreen;