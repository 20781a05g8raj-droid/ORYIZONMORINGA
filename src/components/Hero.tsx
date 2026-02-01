'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

// Reduced frame count for better performance (using every other frame)
const FRAME_COUNT = 120;
const PRELOAD_COUNT = 10; // Load first 10 frames immediately

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Progressive loading: preload first few frames, then lazy load rest
    useEffect(() => {
        const images: HTMLImageElement[] = new Array(FRAME_COUNT);
        let priorityLoaded = 0;
        let totalLoaded = 0;

        // Load priority frames first (first 10)
        for (let i = 0; i < PRELOAD_COUNT; i++) {
            const img = new Image();
            // Load every other frame from original sequence (1, 3, 5, 7...)
            const frameNumber = (i * 2) + 1;
            img.src = `/img/${frameNumber}.webp`;
            img.onload = () => {
                priorityLoaded++;
                totalLoaded++;
                setLoadingProgress(Math.round((totalLoaded / FRAME_COUNT) * 100));
                if (priorityLoaded === PRELOAD_COUNT) {
                    setImagesLoaded(true); // Ready for interaction
                    // Load remaining frames in background
                    loadRemainingFrames();
                }
            };
            images[i] = img;
        }

        // Lazy load remaining frames in background
        const loadRemainingFrames = () => {
            const loadFrame = (index: number) => {
                if (index >= FRAME_COUNT) return;

                const img = new Image();
                const frameNumber = (index * 2) + 1;
                img.src = `/img/${frameNumber}.webp`;
                img.onload = () => {
                    totalLoaded++;
                    setLoadingProgress(Math.round((totalLoaded / FRAME_COUNT) * 100));
                    // Load next frame
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(() => loadFrame(index + 1));
                    } else {
                        setTimeout(() => loadFrame(index + 1), 10);
                    }
                };
                images[index] = img;
            };

            // Start loading from frame 10 onwards
            loadFrame(PRELOAD_COUNT);
        };

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
                        <div className={styles.loaderContent}>
                            <h2>Loading Experience...</h2>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${loadingProgress}%` }}
                                />
                            </div>
                            <p className={styles.progressText}>{loadingProgress}%</p>
                        </div>
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
