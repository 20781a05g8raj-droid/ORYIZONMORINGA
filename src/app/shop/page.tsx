'use client';

import ProductCard from '@/components/ProductCard';
import styles from './Shop.module.css';
import { useStore } from '@/context/StoreContext';

export default function ShopPage() {
    const { products } = useStore();

    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Shop Pure Wellness</h1>
                <p className={styles.subtitle}>Elevate your health with nature's most potent superfood.</p>
            </section>

            <section className={styles.grid}>
                {products.map(product => (
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
            </section>
        </main>
    );
}
