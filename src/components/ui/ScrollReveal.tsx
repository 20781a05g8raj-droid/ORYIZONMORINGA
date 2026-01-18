'use client';

import { motion, useInView, useAnimation, Variant } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export const ScrollReveal = ({ children, width = "fit-content", className, delay = 0, direction = "up" }: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants: { [key: string]: Variant } = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 75 : direction === "down" ? -75 : 0,
            x: direction === "left" ? 75 : direction === "right" ? -75 : 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.17, 0.55, 0.55, 1] // Custom ease
            }
        },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
};
