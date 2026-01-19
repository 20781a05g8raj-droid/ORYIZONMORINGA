'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ProductShowcase.module.css';

export default function ProductShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imageRef.current) return;

        // Antigravity "Bobbing" Animation
        gsap.to(imageRef.current, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Parallax Tilt Effect on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !imageRef.current) return;

            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(imageRef.current, {
                rotationY: x * 20, // Tilt Intensity
                rotationX: -y * 20,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <section className={styles.showcase} ref={containerRef}>
            <h2 className={styles.title}>Oryizon Gold. <span className={styles.subtitle}>Pure Potency.</span></h2>

            <div className={styles.productContainer}>
                <img
                    ref={imageRef}
                    src="/product.png"
                    alt="Oryizon Organic Moringa Powder - Premium Superfood"
                    className={styles.productImage}
                />

                {/* Hotspots Example */}
                <div className={styles.hotspot} style={{ top: '30%', left: '40%' }}>
                    <div className={styles.dot}></div>
                    <div className={styles.tooltip}>100% Organic</div>
                </div>

                <div className={styles.hotspot} style={{ top: '60%', right: '35%' }}>
                    <div className={styles.dot}></div>
                    <div className={styles.tooltip}>Rich in Antioxidants</div>
                </div>
            </div>
        </section>
    );
}
