'use client';

import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

export default function CartPage() {
    const { items, removeFromCart, cartTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className={styles.container}>
                <div className={styles.emptyState}>
                    <h1 className={styles.title}>Your Cart</h1>
                    <p className={styles.message}>Your wellness journey hasn't started yet. <br /> Your cart is currently empty.</p>
                    <a href="/shop" className={styles.link}>Shop the Collection</a>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.cartWrapper}>
                <h1 className={styles.title}>Your Cart</h1>

                <div className={styles.itemList}>
                    {items.map(item => (
                        <div key={item.id} className={styles.item}>
                            <img src={item.image} alt={item.title} className={styles.itemImage} />
                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                                <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                                <span className={styles.quantity}>Qty: {item.quantity}</span>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className={styles.removeBtn}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>

                    <a href="/checkout" className={styles.checkoutBtn} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                        Proceed to Checkout
                    </a>

                    <button className={styles.clearBtn} onClick={clearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </main>
    );
}
