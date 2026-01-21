'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Format: ezgif-frame-001.jpg, etc.
            const filename = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            img.src = `/sequence/${filename}`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }
        imagesRef.current = images;
    }, []);

    // Canvas Animation Logic
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Set canvas dimensions to window size
        const updateSize = () => {
            const wrapper = pinRef.current;
            if (wrapper) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                renderFrame(0);
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        const sequence = { frame: 0 };

        // GSAP ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth interaction
                pin: pinRef.current, // Pin the wrapper containing both canvas and text
            }
        });

        tl.to(sequence, {
            frame: FRAME_COUNT - 1,
            snap: "frame", // Snap to whole numbers
            ease: "none",
            onUpdate: () => {
                renderFrame(sequence.frame);
            }
        });

        function renderFrame(index: number) {
            const img = imagesRef.current[Math.round(index)];
            if (!img || !context) return;

            // "Object-fit: cover" logic for canvas
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;

            context.clearRect(0, 0, cw, ch);
            context.drawImage(img, x, y, iw * scale, ih * scale);
        }

        return () => {
            window.removeEventListener('resize', updateSize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [imagesLoaded]);

    const pinRef = useRef<HTMLDivElement>(null);

    // Framer Motion for text
    const { scrollY } = useScroll();
    const textY = useTransform(scrollY, [0, 500], [0, -150]);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section ref={containerRef} className={styles.heroContainer}>
            <div ref={pinRef} className={styles.pinWrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />

                {!imagesLoaded && (
                    <div className={styles.loader}>
                        <h2>Loading Experience...</h2>
                    </div>
                )}

                {/* Floating Overlay Content with Framer Motion */}
                {/* Fixed container for centering */}
                <div className={styles.centerContainer}>
                    <motion.div
                        style={{ y: textY, opacity: textOpacity }}
                        className={styles.motionWrapper}
                    >
                        <h1 className={styles.headline}>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                Nature’s Origin.
                            </motion.span><br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                Your New Horizon.<br />
                                <span style={{ fontSize: '0.6em', opacity: 0.9 }}>The Best Organic Moringa Powder</span>
                            </motion.span><br />
                            <motion.span
                                className={styles.brandName}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.0, duration: 0.8 }}
                            >
                                Oryizon.
                            </motion.span>
                        </h1>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
