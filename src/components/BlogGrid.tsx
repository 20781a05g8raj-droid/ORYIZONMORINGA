'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import styles from './BlogGrid.module.css';

export default function BlogGrid() {
    const { posts } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Ensure we only pass valid elements
        const validCards = cardsRef.current.filter(el => el !== null);

        if (validCards.length > 0) {
            ScrollTrigger.batch(validCards, {
                onEnter: batch => gsap.fromTo(batch,
                    { autoAlpha: 0, y: 50 },
                    { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out" }
                ),
                start: "top 80%"
            });
        }

    }, []);

    return (
        <section className={styles.blogSection} ref={containerRef}>
            <h2 className={styles.heading}>Discover Moringa Powder Benefits.</h2>
            <div className={styles.grid}>
                {posts.map((post, index) => (
                    <article
                        key={post.id}
                        className={styles.card}
                        ref={el => { if (el) cardsRef.current[index] = el; }}
                    >
                        <div className={styles.imageWrapper}>
                            <img src={post.image} alt={post.altText || post.title} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{post.title}</h3>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                            <Link href={`/blog/${post.id}`} className={styles.link}>Read Story &rarr;</Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
