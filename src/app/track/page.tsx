'use client';

import { useState } from 'react';
import { useStore, Order } from '@/context/StoreContext';
import styles from './Track.module.css';

export default function TrackPage() {
    const { orders } = useStore();
    const [searchId, setSearchId] = useState('');
    const [foundOrder, setFoundOrder] = useState<Order | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const order = orders.find(o => o.id === searchId.trim());
        setFoundOrder(order || null);
        setHasSearched(true);
    };

    const getStatusStep = (status: string) => {
        if (status === 'Delivered') return 3;
        if (status === 'Shipped') return 2;
        return 1; // Processing
    };

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Track Your Order</h1>
                <p className={styles.subtitle}>Enter your Order ID (e.g., ORD-1234) to see the current status.</p>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Enter Order ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.btn}>Track</button>
                </form>

                {hasSearched && !foundOrder && (
                    <div className={styles.error}>
                        <p>Order not found. Please check the ID and try again.</p>
                    </div>
                )}

                {foundOrder && (
                    <div className={styles.resultCard}>
                        <div className={styles.header}>
                            <h2>Order {foundOrder.id}</h2>
                            <span className={styles.date}>{foundOrder.date}</span>
                        </div>

                        {foundOrder.trackingDetails && (
                            <div className={styles.trackingInfo} style={{ marginBottom: '2rem', padding: '1rem', background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '4px', textAlign: 'center' }}>
                                <strong>Tracking Information:</strong> {foundOrder.trackingDetails}
                            </div>
                        )}

                        <div className={styles.progressContainer}>
                            <div className={`${styles.progressBar} step-${getStatusStep(foundOrder.status)}`}>
                                <div className={styles.line}></div>
                                <div className={`${styles.step} ${getStatusStep(foundOrder.status) >= 1 ? styles.active : ''}`}>
                                    <div className={styles.dot}></div>
                                    <span>Processing</span>
                                </div>
                                <div className={`${styles.step} ${getStatusStep(foundOrder.status) >= 2 ? styles.active : ''}`}>
                                    <div className={styles.dot}></div>
                                    <span>Shipped</span>
                                </div>
                                <div className={`${styles.step} ${getStatusStep(foundOrder.status) >= 3 ? styles.active : ''}`}>
                                    <div className={styles.dot}></div>
                                    <span>Delivered</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.customerInfo}>
                                <h3>Delivery To</h3>
                                <p>{foundOrder.customer.name}</p>
                                <p>{foundOrder.customer.address}</p>
                            </div>
                            <div className={styles.orderInfo}>
                                <h3>Order Summary</h3>
                                {foundOrder.items.map((item: any) => (
                                    <div key={item.id} className={styles.itemRow}>
                                        <span>{item.title} x {item.quantity}</span>
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className={styles.totalRow}>
                                    <span>Total</span>
                                    <span>₹{foundOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
