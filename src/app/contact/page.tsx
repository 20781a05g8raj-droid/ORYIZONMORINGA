'use client';

import React, { useState } from 'react';
import styles from './Contact.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useStore } from '@/context/StoreContext';

export default function ContactPage() {
    const { addMessage } = useStore();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
            date: new Date().toLocaleDateString()
        };

        await addMessage(data);
        setStatus('success');
        form.reset();
    };
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
                            {status === 'success' ? (
                                <div className={styles.successMessage}>
                                    <p>Thank you! We've received your message and will get back to you soon.</p>
                                    <button onClick={() => setStatus('idle')} className={styles.submitBtn} style={{ marginTop: '1rem' }}>Send Another</button>
                                </div>
                            ) : (
                                <form className={styles.form} onSubmit={handleSubmit}>
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

                                    <button type="submit" className={styles.submitBtn}>
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
