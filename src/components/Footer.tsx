'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.column}>
                        <h3 className={styles.brand}>Oryizon</h3>
                        <p className={styles.tagline}>Nature’s Origin. Your New Horizon.</p>
                        <div className={styles.socials}>
                            <a href="https://www.instagram.com/oryizon?igsh=dW9mMWF3dHE5NDBl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.column}>
                        <h4 className={styles.heading}>Explore</h4>
                        <ul className={styles.links}>
                            <li><Link href="/shop">Shop Oryizon</Link></li>
                            <li><Link href="/story">Our Story</Link></li>
                            <li><Link href="/blog">The Blog</Link></li>
                            <li><Link href="#">Sustainability</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className={styles.column}>
                        <h4 className={styles.heading}>Contact</h4>
                        <ul className={styles.links}>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/track">Track Order</Link></li>
                            <li style={{ color: 'var(--color-text-light)', opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Raxaul, Hariya, India
                            </li>
                            <li><a href="mailto:oryizoncompany@gmail.com">oryizoncompany@gmail.com</a></li>
                            <li><a href="tel:+918969124404">+91 89691 24404</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.column}>
                        <h4 className={styles.heading}>Stay Connected</h4>
                        <p className={styles.text}>Join the community for wellness tips and exclusive offers.</p>
                        <form className={styles.form}>
                            <input type="email" placeholder="Your email address" className={styles.input} />
                            <button type="submit" className={styles.button}>Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Oryizon Wellness. All rights reserved. <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>v0.1.1</span></p>
                    <div className={styles.legal}>
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
