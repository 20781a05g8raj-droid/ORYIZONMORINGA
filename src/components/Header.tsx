'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Add Contexts
    const { cartCount } = useCart();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isHome && !isScrolled ? styles.alternate : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="/">Oryizon</a>
                </div>

                <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
                    <a href="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="/shop" className={styles.link} onClick={() => setIsMenuOpen(false)}>Shop</a>
                    <a href="/blog" className={styles.link} onClick={() => setIsMenuOpen(false)}>Blog</a>
                    <a href="/story" className={styles.link} onClick={() => setIsMenuOpen(false)}>Our Story</a>
                    <a href="/contact" className={styles.link} onClick={() => setIsMenuOpen(false)}>Contact</a>
                </nav>

                <div className={styles.utilities}>
                    <a href="/search" className={styles.iconBtn} aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </a>
                    <a href="/cart" className={styles.iconBtn} aria-label="Cart">
                        <div style={{ position: 'relative' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                        </div>
                    </a>
                    <a href="/account" className={styles.iconBtn} aria-label="Account">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={isAuthenticated ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>
                </div>

                <button className={styles.hamburger} aria-label="Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
}
