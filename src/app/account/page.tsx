'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Account.module.css';

export default function AccountPage() {
    const { user, login, logout, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email);
        }
    };

    if (isAuthenticated && user) {
        return (
            <main className={styles.container}>
                <div className={styles.loginBox}>
                    <h1 className={styles.title}>Welcome, {user.name}!</h1>
                    <p className={styles.subtitle}>You are signed in to Oryizon.</p>
                    <div className={styles.group}>
                        <button className={styles.button} onClick={() => window.location.href = '/shop'}>
                            Continue Shopping
                        </button>
                        <button
                            className={styles.button}
                            style={{ backgroundColor: 'transparent', border: '1px solid currentColor', marginTop: '1rem' }}
                            onClick={logout}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to access your Oryizon account</p>

                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.group}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Sign In</button>

                    <p className={styles.footer}>
                        Don't have an account? <a href="#" className={styles.link}> Create one</a>
                    </p>
                </form>
            </div>
        </main>
    );
}
