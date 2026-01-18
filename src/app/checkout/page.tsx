'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useStore, Order } from '@/context/StoreContext';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { addOrder } = useStore();
    const [orderId, setOrderId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        building: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate Order ID
        const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        setOrderId(newOrderId);

        // Create Order Object
        const newOrder: Order = {
            id: newOrderId,
            date: new Date().toLocaleDateString(),
            status: 'Processing',
            items: items,
            total: cartTotal,
            customer: {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phoneNumber,
                address: `${formData.building}, ${formData.area}, ${formData.city}, ${formData.state} - ${formData.pincode}`
            }
        };

        // Save to Store
        addOrder(newOrder);

        console.log('Order Submitted:', newOrder);
        setIsSubmitted(true);
        clearCart();
    };

    if (items.length === 0 && !isSubmitted) {
        return (
            <main className={styles.container}>
                <div className={styles.emptyState}>
                    <h1 className={styles.title}>Checkout</h1>
                    <p className={styles.message}>Your cart is empty. Please add items before checking out.</p>
                    <a href="/shop" className={styles.link}>Return to Shop</a>
                </div>
            </main>
        );
    }

    if (isSubmitted && orderId) {
        return (
            <main className={styles.container}>
                <div className={styles.successState}>
                    <h1 className={styles.title}>Order Placed Successfully!</h1>
                    <p className={styles.message}>Thank you, {formData.fullName}.</p>
                    <div style={{ background: '#f4f4f4', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1B3022' }}>Order ID: {orderId}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>Save this ID to track your order.</p>
                    </div>
                    <p className={styles.message}>Your order will be delivered to:</p>
                    <p className={styles.address}>
                        {formData.address}, {formData.building}<br />
                        {formData.area}, {formData.city}<br />
                        {formData.state} - {formData.pincode}
                    </p>
                    <p className={styles.total}>Total Amount: ₹{cartTotal.toFixed(2)}</p>
                    <a href="/track" className={styles.link} style={{ marginRight: '1rem' }}>Track Order</a>
                    <a href="/" className={styles.link}>Continue Shopping</a>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.checkoutWrapper}>
                <h1 className={styles.title}>Checkout</h1>

                <div className={styles.grid}>
                    {/* Form Section */}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2 className={styles.sectionTitle}>Delivery Details</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className={styles.input}
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className={styles.input}
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Flat, House no., Building, Company, Apartment</label>
                            <input
                                type="text"
                                name="building"
                                className={styles.input}
                                value={formData.building}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Area, Street, Sector, Village</label>
                            <input
                                type="text"
                                name="area"
                                className={styles.input}
                                value={formData.area}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Landmark / Full Address</label>
                            <textarea
                                name="address"
                                className={styles.textarea}
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>City/Town</label>
                                <input
                                    type="text"
                                    name="city"
                                    className={styles.input}
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    className={styles.input}
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>State</label>
                            <input
                                type="text"
                                name="state"
                                className={styles.input}
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Place Order — ₹{cartTotal.toFixed(2)}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className={styles.summary}>
                        <h2 className={styles.sectionTitle}>Order Summary</h2>
                        <div className={styles.itemList}>
                            {items.map(item => (
                                <div key={item.id} className={styles.item}>
                                    <span>{item.title} (x{item.quantity})</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.totalRow}>
                            <span>Total to Pay</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
