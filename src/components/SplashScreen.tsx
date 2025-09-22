'use client';

import { useState, useEffect, FC } from 'react';

interface SplashScreenProps {
    onAnimationComplete: () => void;
}

// A simple SVG icon component for the zipper pull.
const ZipperIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-12 text-gray-600 drop-shadow-lg">
        <path d="M10.94,6.45L12,5.39L13.06,6.45L12,7.5L10.94,6.45M12,2A1,1 0 0,1 13,3V15.54L15.39,17.94C15.58,18.13 15.69,18.38 15.69,18.64C15.69,19.19 15.23,19.65 14.68,19.65C14.42,19.65 14.17,19.54 13.97,19.34L12,17.38L10.03,19.34C9.83,19.54 9.58,19.65 9.32,19.65C8.77,19.65 8.31,19.19 8.31,18.64C8.31,18.38 8.42,18.13 8.61,17.94L11,15.54V3A1,1 0 0,1 12,2M12,9.12L16.2,13.31C16.5,13.6 17,13.83 17,14.5C17,15.88 15.88,17 14.5,17C14.13,17 13.8,16.9 13.5,16.7L12,15.2L10.5,16.7C10.2,16.9 9.87,17 9.5,17C8.12,17 7,15.88 7,14.5C7,13.83 7.5,13.6 7.8,13.31L12,9.12Z" />
    </svg>
);

const SplashScreen: FC<SplashScreenProps> = ({ onAnimationComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // Effect to run the animation logic.
    useEffect(() => {
        let animationFrameId: number;
        // Start the animation after a short delay.
        const startTimer = setTimeout(() => {
            let startTime: number | null = null;
            const animationDuration = 1500; // 1.5 seconds

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const newProgress = Math.min((elapsed / animationDuration) * 100, 100);
                setProgress(newProgress);

                if (newProgress < 100) {
                    // Continue the animation on the next frame.
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    // Once the animation is complete, trigger the callback.
                    setTimeout(() => {
                        setIsFinished(true);
                        onAnimationComplete();
                    }, 300);
                }
            };
            animationFrameId = requestAnimationFrame(animate);
        }, 500);

        // Cleanup function to cancel timers and animation frames.
        return () => {
            clearTimeout(startTimer);
            cancelAnimationFrame(animationFrameId);
        };
    }, [onAnimationComplete]);

    // Calculate the zipper's vertical position based on progress.
    const zipperY = progress;
    // Calculate the horizontal separation of the zipper teeth.
    const teethSeparation = (progress / 100) * 20;

    // Data URL for a single SVG zipper tooth.
    const zipperTeethSVG = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='10'%3e%3crect x='5' y='0' width='15' height='8' rx='2' fill='%23A0AEC0'/%3e%3c/svg%3e";

    if (isFinished) return null;

    return (
        <div style={{ clipPath: 'url(#zipper-clip-path)' }} className="fixed inset-0 z-50 bg-gray-100 overflow-hidden">

            <div className="absolute inset-0 flex justify-center">
                {/* Left side of the zipper teeth. */}
                <div className="h-full w-1/2" style={{
                    transform: `translateX(${teethSeparation}px)`,
                    backgroundImage: `url('${zipperTeethSVG}')`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'right center',
                }}></div>
                {/* Right side of the zipper teeth (mirrored). */}
                <div className="h-full w-1/2" style={{
                    backgroundImage: `url('${zipperTeethSVG}')`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'left center',
                    transformOrigin: 'left',
                    // Both scaleX and translateX transforms are applied here.
                    transform: `scaleX(-1) translateX(-${teethSeparation}px)`,
                }}></div>
            </div>

            {/* The zipper pull, which moves down the screen. */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-500"
                style={{ top: `${zipperY}%`, opacity: progress > 95 ? 0 : 1 }}
            >
                <ZipperIcon />
            </div>

            {/* Invisible SVG that defines the clip-path for the "unzipping" effect. */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="zipper-clip-path" clipPathUnits="objectBoundingBox">
                        {/* The path is dynamically drawn based on the animation progress. */}
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