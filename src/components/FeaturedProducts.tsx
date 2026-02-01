'use client';

import ProductCard from './ProductCard';
import { useStore } from '@/context/StoreContext';
import styles from './FeaturedProducts.module.css';
import Link from 'next/link';

export default function FeaturedProducts() {
    const { products } = useStore();
    // Show first 3 products
    const featured = products.slice(0, 3);

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Shop Organic Moringa Powder</h2>
            <div className={styles.grid}>
                {featured.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        rating={product.rating}
                        image={product.image}
                        imageAlt={product.imageAlt}
                    />
                ))}
            </div>
            <div className={styles.viewAll}>
                <Link href="/shop" className={styles.button}>View All Products</Link>
            </div>
        </section>
    );
}
