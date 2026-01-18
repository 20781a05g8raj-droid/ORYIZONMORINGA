'use client';

import React from 'react';
import styles from './Contact.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className={styles.container}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.subtitle}>
                        Have questions about our products or want to learn more about our journey? We'd love to hear from you.
                    </p>

                    <div className={styles.content}>
                        <div className={styles.infoSection}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Address</span>
                                <div className={styles.value}>
                                    Raxaul, Hariya<br />
                                    India
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Email</span>
                                <a href="mailto:oryizoncompany@gmail.com" className={styles.value}>
                                    oryizoncompany@gmail.com
                                </a>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Phone</span>
                                <a href="tel:+918969124404" className={styles.value}>
                                    +91 89691 24404
                                </a>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <form className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" className={styles.input} required />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" className={styles.input} required />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" className={styles.textarea} required></textarea>
                                </div>

                                <button type="submit" className={styles.submitBtn}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
