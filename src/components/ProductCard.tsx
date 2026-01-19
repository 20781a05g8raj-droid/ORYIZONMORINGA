'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    imageAlt?: string;
}

export default function ProductCard({ id, title, price, originalPrice, rating, image, imageAlt }: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <Link href={`/shop/${id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={imageAlt || title} className={styles.image} />
                {discount > 0 && <span className={styles.badge}>-{discount}%</span>}
            </div>
            <div className={styles.content}>
                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>★</span>
                    ))}
                </div>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{price.toFixed(2)}</span>
                    {originalPrice && <span className={styles.originalPrice}>₹{originalPrice.toFixed(2)}</span>}
                </div>
                <button className={styles.button}>View Details</button>
            </div>
        </Link>
    );
}
