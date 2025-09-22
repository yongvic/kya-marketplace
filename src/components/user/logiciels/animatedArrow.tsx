"use client";

import { motion, MotionProps } from 'framer-motion';

// Extract specific types from Framer Motion for cleaner prop definitions.
type FramerInitial = MotionProps['initial'];
type FramerAnimate = MotionProps['animate'];
type FramerTransition = MotionProps['transition'];

interface AnimatedArrowProps {
    className?: string;
    initial?: FramerInitial;
    animate?: FramerAnimate;
    transition?: FramerTransition;
}

export default function AnimatedArrow({
    className = '',
    initial,
    animate,
    transition,
}: AnimatedArrowProps) {
    // The SVG path data that defines the shape of the arrow.
    const svgPath =
        "M21.5062 41.4748C19.5877 38.4406 20.4921 34.4256 23.5263 32.5071L72.9711 1.24282C76.0053 -0.67572 80.0203 0.228699 81.9388 3.26288C83.8573 6.29706 82.9529 10.312 79.9187 12.2306L35.9678 40.021L63.7582 83.972C65.6767 87.0062 64.7723 91.0212 61.7381 92.9397C58.704 94.8582 54.689 93.9538 52.7705 90.9196L21.5062 41.4748ZM6.00007 292.001L0.781729 288.126C32.2541 245.747 56.2889 210.509 72.9035 181.099C89.5813 151.578 98.4417 128.508 100.198 110.354C101.907 92.687 96.9125 79.7763 85.3741 69.5359C73.3831 58.8939 53.8385 50.7095 25.5717 44.3421L27.0001 38.001L28.4285 31.6598C57.3297 38.1702 79.508 46.9483 94.0033 59.8129C108.951 73.0793 115.206 90.2194 113.137 111.606C111.116 132.507 101.17 157.495 84.2222 187.494C67.2114 217.605 42.8014 253.349 11.2184 295.876L6.00007 292.001Z";

    return (
        <motion.svg
            width="114"
            height="296"
            viewBox="0 0 114 296"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial={initial}
            animate={animate}
            transition={transition}
        >
            <motion.path
                d={svgPath}
                fill="black"
                fillOpacity="0.18"
                // This inner animation creates a subtle, continuous "breathing" effect.
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
            />
        </motion.svg>
    );
}