'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PageHero.module.css';



interface PageHeroProps {
    title: string;
    subtitle: string;
    image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure GSAP is registered only on client side
        if (typeof window !== 'undefined') {
            try {
                gsap.registerPlugin(ScrollTrigger);
            } catch (e) {
                console.warn("GSAP registration failed", e);
            }
        }

        if (!containerRef.current || !bgRef.current || !cardRef.current) return;

        // Parallax Effect
        gsap.to(bgRef.current, {
            yPercent: 0,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Simple Fade In
        gsap.to(cardRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.2
        });

    }, []);

    return (
        <section ref={containerRef} className={styles.heroContainer}>
            <img
                ref={bgRef}
                src={image}
                alt={title}
                className={styles.parallaxBg}
            />
            <div className={styles.overlay}></div>
            <div className={styles.contentWrapper}>
                <div ref={cardRef} className={styles.glassCard}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </div>
        </section>
    );
}
