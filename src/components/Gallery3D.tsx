'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Gallery3D.module.css';
import { cn } from '@/lib/utils';

// Placeholder images - using existing products for now
const galleryImages = [
    { src: '/product-1.png', alt: 'Moringa Original', title: 'Pure Essence' },
    { src: '/product-2.jpg', alt: 'Moringa Lifestyle', title: 'Daily Ritual' },
    { src: '/product-3.png', alt: 'Moringa Capsule', title: 'Vitality' },
    { src: '/product-4.png', alt: 'Moringa Powder', title: 'Nature\'s Gift' },
    { src: '/product.png', alt: 'Moringa Pack', title: 'Collection' },
];

export default function Gallery3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={containerRef} className={styles.gallerySection}>
            <div className={styles.stickyWrapper}>
                <motion.h2
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
                    className={styles.headline}
                >
                    Experience the Future of Vitality
                </motion.h2>

                <div className={styles.cardsContainer}>
                    {galleryImages.map((img, i) => {
                        const targetScale = 1 - ((galleryImages.length - 1 - i) * 0.05);
                        const rangeStart = i * 0.25;
                        const rangeEnd = 1;

                        // Stacked card effect logic
                        const scale = useTransform(scrollYProgress, [rangeStart, 1], [1, targetScale]);
                        const translateY = useTransform(scrollYProgress, [rangeStart, 1], [0, -50 * i]); // Slight overlap

                        // Only scale down if it's not the last one? 
                        // Actually, let's do a classic "card stack" parallax

                        return (
                            <Card
                                key={i}
                                i={i}
                                img={img}
                                progress={scrollYProgress}
                                range={[i * 0.2, 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const Card = ({ i, img, progress, range, targetScale }: any) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    // Rotate slightly based on index and scroll for 3D feel
    const rotateX = useTransform(progress, [0, 1], [0, 15]);

    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div
                style={{ scale, top: `calc(-10% + ${i * 25}px)` }}
                className={styles.card}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        fill
                        src={img.src}
                        alt={img.alt}
                        className={styles.image}
                    />
                </div>
                <div className={styles.cardOverlay}>
                    <h3>{img.title}</h3>
                </div>
            </motion.div>
        </div>
    )
}
