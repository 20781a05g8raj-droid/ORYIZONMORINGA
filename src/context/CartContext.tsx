'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('oryizon_cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem('oryizon_cart', JSON.stringify(items));
    }, [items, isLoaded]);

    const addToCart = (product: any) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
