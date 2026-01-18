'use client';

import { useEffect, useRef, useState } from 'react';
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

        // Text Animation: Fade out and move up as user scrolls
        // We want it to be visible initially, then disappear so it doesn't block the sequence
        gsap.to(`.${styles.overlay}`, {
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "15% top",
                scrub: true
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

    return (
        <section ref={containerRef} className={styles.heroContainer}>
            <div ref={pinRef} className={styles.pinWrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />

                {!imagesLoaded && (
                    <div className={styles.loader}>
                        <h2>Loading Experience...</h2>
                    </div>
                )}

                {/* Floating Overlay Content */}
                <div className={styles.overlay}>
                    <h1 className={styles.headline}>
                        <span>Nature’s Origin.</span><br />
                        <span>Your New Horizon.</span><br />
                        <span className={styles.brandName}>Oryizon.</span>
                    </h1>
                </div>
            </div>
        </section>
    );
}
