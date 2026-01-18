'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    email: string;
    name: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('oryizon_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        const newUser = { email, name: email.split('@')[0] };
        setUser(newUser);
        localStorage.setItem('oryizon_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('oryizon_user');
    };

    const isAdmin = user?.email === 'admin@oryizon.com';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAdmin }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
