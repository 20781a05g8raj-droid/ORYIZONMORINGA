'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import { useCart } from '@/context/CartContext';
import styles from './ProductDetails.module.css';
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { products, addReview } = useStore();
    const product = products.find(p => p.id === id);

    if (!product) {
        // We can show a simple loading state if store isn't ready
        if (products.length === 0) return <div className={styles.container}>Loading...</div>;
        notFound();
    }

    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    // Reviews are now coming from the product object itself (which is merged with DB reviews)
    const [reviews, setReviews] = useState(product.reviews || []);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Sync reviews when product updates (e.g. after fetch)
    useEffect(() => {
        if (product?.reviews) {
            setReviews(product.reviews);
        }
    }, [product]);

    const handleReviewSubmit = async (newReview: any) => {
        const reviewWithId = { ...newReview, product_id: product.id };
        await addReview(reviewWithId);
        // Optimistic update handled by store, but we can also update local if needed
        // setReviews([reviewWithId, ...reviews]); 
    };

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <main className={styles.container}>
            <div className={styles.productWrapper}>
                {/* Gallery Section */}
                <section className={styles.gallery}>
                    <div className={styles.imageContainer}>
                        {(() => {
                            const validImages = product.images?.filter(img => img.trim() !== '') || [];
                            const mainImage = selectedImage || (validImages.length > 0 ? validImages[0] : product.image);
                            const altText = `${product.title} - Main Product Shot - Premium Organic Quality`;
                            return <img src={mainImage} alt={altText} className={styles.mainImage} />;
                        })()}
                        {discount > 0 && <span className={styles.badge}>-{discount}%</span>}
                    </div>
                    {product.images && product.images.filter(img => img.trim() !== '').length > 1 && (
                        <div className={styles.thumbnails}>
                            {product.images.filter(img => img.trim() !== '').map((img, i) => {
                                // Dynamic SEO Alt Text
                                const altSuffixes = ['Front View', 'Side Profile', 'Ingredients Close-up', 'Lifestyle Usage', 'Detail View'];
                                const suffix = altSuffixes[i] || `View ${i + 1}`;
                                const thumbAlt = `${product.title} - ${suffix}`;

                                return (
                                    <div
                                        key={i}
                                        className={`${styles.thumb} ${((selectedImage === img) || (!selectedImage && i === 0)) ? styles.activeThumb : ''}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt={thumbAlt} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Info Section */}
                <section className={styles.info}>
                    <div className={styles.header}>
                        <div className={styles.ratingRow}>
                            <span className={styles.stars}>{"★".repeat(Math.round(product.rating))}</span>
                            <span className={styles.reviewCount}>({reviews.length} reviews)</span>
                        </div>
                        <h1 className={styles.title}>{product.title}</h1>
                        <div className={styles.priceRow}>
                            <span className={styles.price}>₹{product.price.toFixed(2)}</span>
                            {product.originalPrice && <span className={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</span>}
                        </div>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.actions}>
                        <button
                            className={`${styles.addToCartBtn} ${isAdded ? styles.added : ''}`}
                            onClick={handleAddToCart}
                        >
                            {isAdded ? "Added to Cart!" : `Add to Cart — ₹${(product.price).toFixed(2)}`}
                        </button>
                    </div>

                    <div className={styles.accordion}>
                        <details open>
                            <summary>Benefits</summary>
                            <ul>
                                {product.benefits?.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </details>
                        <details>
                            <summary>Ingredients</summary>
                            <p>{product.ingredients}</p>
                        </details>
                    </div>
                </section>
            </div>

            {/* Reviews Section */}
            <section className={styles.reviewsSection}>
                <h2 className={styles.sectionTitle}>Customer Reviews</h2>
                <div className={styles.reviewsGrid}>
                    <div className={styles.reviewList}>
                        <ReviewList reviews={reviews} />
                    </div>
                    <div className={styles.reviewForm}>
                        <ReviewForm onSubmit={handleReviewSubmit} />
                    </div>
                </div>
            </section>
        </main>
    );
}
