'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !bgRef.current || !textRef.current) return;

        // Parallax Effect for Background
        gsap.to(bgRef.current, {
            yPercent: 0, // Disabled vertical movement to stop cropping
            scale: 1.1, // Slight zoom for effect instead
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Entrance Animation
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(bgRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5 }
        )
            .to(textRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: -0.5
            });

    }, []);

    return (
        <section ref={containerRef} className={styles.heroContainer}>
            {/* Parallax Background Image */}
            <img
                ref={bgRef}
                src="/hero-home-v2.png"
                alt="Lush Organic Moringa Farm with Nanobana Flowers"
                className={styles.parallaxBg}
            />

            {/* Dark Overlay */}
            <div className={styles.overlay}></div>

            {/* Glassmorphism Content */}
            <div className={styles.contentWrapper}>
                <div ref={textRef} className={styles.glassCard}>
                    <h1 className={styles.headline}>
                        Nature’s Origin.<br />
                        <span className={styles.brandName}>ORYIZON MORINGA</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', margin: '1rem 0 2rem', opacity: 0.9 }}>
                        The purest organic moringa powder, cultivated in harmony with nature.
                    </p>
                    <Link href="/shop" className={styles.ctaButton}>
                        Discover Pure Potency
                    </Link>
                </div>
            </div>
        </section >
    );
}
