'use client';

import styles from './ReviewList.module.css';

interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    if (reviews.length === 0) {
        return <p className={styles.noReviews}>No reviews yet. Be the first to write one!</p>;
    }

    return (
        <div className={styles.container}>
            {reviews.map((review) => (
                <div key={review.id} className={styles.review}>
                    <div className={styles.header}>
                        <span className={styles.author}>{review.author}</span>
                        <div className={styles.rating}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>★</span>
                            ))}
                        </div>
                        <span className={styles.date}>{review.date}</span>
                    </div>
                    <p className={styles.text}>{review.text}</p>
                </div>
            ))}
        </div>
    );
}
