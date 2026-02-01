'use client';

import React from 'react';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

// Inline styles to avoid dependency on potentially stale CSS modules while debugging
const containerStyle = {
    paddingTop: 'var(--header-height)',
    minHeight: '100vh',
    /* backgroundColor removed to inherit from globals */
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
};

const gridStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem 6rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2.5rem',
    width: '100%'
};

export default function ShopPage() {
    // Attempt to get data from store, but don't block on it
    const store = useStore();
    const productsFromStore = store?.products || [];

    // Fallback "Nanobana" Demo Products to ensure page ALWAYS has content
    const demoProducts = [
        {
            id: 'demo-1',
            title: 'Organic Moringa Powder',
            price: 599,
            originalPrice: 899,
            rating: 5,
            image: '/product-mockup.png',
            imageAlt: 'Premium Moringa Powder Pouch'
        },
        {
            id: 'demo-2',
            title: 'Nanobana Moringa Tea',
            price: 499,
            originalPrice: 699,
            rating: 4,
            image: '/usage-tea.png',
            imageAlt: 'Herbal Moringa Tea'
        },
        {
            id: 'demo-3',
            title: 'Golden Moringa Oil',
            price: 1299,
            originalPrice: 1599,
            rating: 5,
            image: '/shop-hero.png',
            imageAlt: 'Pure Moringa Oil'
        },
        {
            id: 'demo-4',
            title: 'Superfood Capsules',
            price: 799,
            originalPrice: 999,
            rating: 5,
            image: '/product-mockup.png',
            imageAlt: 'Moringa Capsules'
        }
    ];

    // Prefer store products if available, otherwise show demo
    // The previous check might have been "if null return loading", we MUST NOT do that.
    const displayProducts = productsFromStore.length > 0 ? productsFromStore : demoProducts;

    return (
        <main style={containerStyle}>
            <PageHero
                title="Shop Pure Wellness"
                subtitle="Elevate your health with nature's most potent superfood."
                image="/hero-shop-v2.png"
            />

            <section style={gridStyle}>
                {displayProducts.map(product => (
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
