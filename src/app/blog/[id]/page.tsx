'use client';

import { use } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import styles from './BlogPost.module.css';

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { posts } = useStore();
    const post = posts.find(p => p.id === id);

    if (!post) {
        if (posts.length === 0) return <div className={styles.container}>Loading...</div>;
        return (
            <div className={styles.container}>
                <h1>Post not found</h1>
                <Link href="/blog">Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <Link href="/blog" className={styles.backLink}>&larr; Back to Blog</Link>
                <span className={styles.meta}>{post.date} • by {post.author}</span>
                <h1 className={styles.title}>{post.title}</h1>
            </header>

            <img src={post.image} alt={post.altText || post.title} className={styles.image} />

            <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
}
