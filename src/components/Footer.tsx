'use client';

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
                            <a href="#" aria-label="Instagram">Instagram</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.column}>
                        <h4 className={styles.heading}>Explore</h4>
                        <ul className={styles.links}>
                            <li><a href="/shop">Shop Oryizon</a></li>
                            <li><a href="/story">Our Story</a></li>
                            <li><a href="/blog">The Blog</a></li>
                            <li><a href="#">Sustainability</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className={styles.column}>
                        <h4 className={styles.heading}>Contact</h4>
                        <ul className={styles.links}>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/track">Track Order</a></li>
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
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
