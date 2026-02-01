// ProductShowcase.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ProductShowcase.module.css';

export default function ProductShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const poster1Ref = useRef<HTMLImageElement>(null);
    const poster2Ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return; // Guard clause

        // Simple Floating Animation for Posters
        if (poster1Ref.current) {
            gsap.to(poster1Ref.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
        if (poster2Ref.current) {
            gsap.to(poster2Ref.current, {
                y: -15,
                duration: 3, // Different duration for organic feel
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.5
            });
        }
    }, []);

    return (
        <section className={styles.showcase} ref={containerRef}>
            <h2 className={styles.title}>Nature's Best Kept Secret. <span className={styles.subtitle}>Unlock Your Potential.</span></h2>

            <div className={styles.gridContainer}>
                {/* Poster 1: Organic */}
                <div className={styles.posterWrapper}>
                    <img
                        ref={poster1Ref}
                        src="/showcase-organic.png"
                        alt="100% Organic Moringa - Premium Quality"
                        className={styles.posterImage}
                    />
                    <div className={styles.posterOverlay}>
                        <span className={styles.badge}>100% Organic</span>
                    </div>
                </div>

                {/* Poster 2: Energy */}
                <div className={styles.posterWrapper}>
                    <img
                        ref={poster2Ref}
                        src="/showcase-energy.png"
                        alt="Energy Boost with Moringa Smoothie"
                        className={styles.posterImage}
                    />
                    <div className={styles.posterOverlay}>
                        <span className={styles.badge}>Boost Energy</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
