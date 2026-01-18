'use client';

import { useState } from 'react';
import styles from './ReviewForm.module.css';

export default function ReviewForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }
        setError('');
        const reviewData = {
            id: Date.now().toString(),
            author: name || 'Anonymous User',
            rating,
            date: new Date().toLocaleDateString(),
            text: (e.target as any).comment.value
        };
        onSubmit(reviewData);
        // Reset form (simplified)
        setName('');
        setRating(0);
        (e.target as any).reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title}>Write a Review</h3>

            <div className={styles.field}>
                <label className={styles.label}>Rating</label>
                <div className={styles.starContainer}>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={styles.starBtn}
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <span className={ratingValue <= (hover || rating) ? styles.starFilled : styles.starEmpty}>★</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input
                    type="text"
                    id="name"
                    className={styles.input}
                    placeholder="John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="comment" className={styles.label}>Review</label>
                <textarea id="comment" className={styles.textarea} rows={4} placeholder="Tell us what you think..." required></textarea>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitBtn}>Submit Review</button>
        </form>
    );
}
