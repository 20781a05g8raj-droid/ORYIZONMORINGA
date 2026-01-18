'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Define Types
export type Product = {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    images?: string[];
    description: string;
    ingredients: string;
    benefits: string[];
    reviews: any[];
};

export type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    image: string;
    slug?: string;
    seoTitle?: string;
    metaDescription?: string;
    altText?: string;
};

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export type Order = {
    id: string;
    date: string;
    status: OrderStatus;
    trackingDetails?: string;
    items: any[];
    total: number;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
};

type StoreContextType = {
    products: Product[];
    posts: BlogPost[];
    orders: Order[];

    addProduct: (product: Product) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    addPost: (post: BlogPost) => Promise<void>;
    updatePost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;

    addOrder: (order: Order) => Promise<void>;
    updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;

    resetStore: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const { data: prodData } = await supabase.from('products').select('*');
            if (prodData) setProducts(prodData);

            const { data: postData } = await supabase.from('posts').select('*');
            if (postData) setPosts(postData);

            const { data: orderData } = await supabase.from('orders').select('*');
            if (orderData) setOrders(orderData);

            setIsLoaded(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();

        // Optional: Realtime subscriptions could go here
    }, []);


    // --- Product Actions ---
    const addProduct = async (product: Product) => {
        const { error } = await supabase.from('products').insert([product]);
        if (!error) setProducts(prev => [product, ...prev]);
        else console.error(error);
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        const { error } = await supabase.from('products').update(updates).eq('id', id);
        if (!error) setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
        else console.error(error);
    };

    const deleteProduct = async (id: string) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) setProducts(prev => prev.filter(p => p.id !== id));
        else console.error(error);
    };

    // --- Blog Actions ---
    const addPost = async (post: BlogPost) => {
        const { error } = await supabase.from('posts').insert([post]);
        if (!error) setPosts(prev => [post, ...prev]);
        else console.error(error);
    };

    const updatePost = async (id: string, updates: Partial<BlogPost>) => {
        const { error } = await supabase.from('posts').update(updates).eq('id', id);
        if (!error) setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
        else console.error(error);
    };

    const deletePost = async (id: string) => {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (!error) setPosts(prev => prev.filter(p => p.id !== id));
        else console.error(error);
    };

    // --- Order Actions ---
    const addOrder = async (order: Order) => {
        const { error } = await supabase.from('orders').insert([order]);
        if (!error) setOrders(prev => [order, ...prev]);
        else console.error(error);
    };

    const updateOrder = async (id: string, updates: Partial<Order>) => {
        const { error } = await supabase.from('orders').update(updates).eq('id', id);
        if (!error) setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
        else console.error(error);
    };

    const resetStore = async () => {
        // Warning: This deletes everything in the DB!
        // For safety, maybe standard reset? Or just empty local state for now?
        // Let's safe-guard it.
        if (confirm("DANGER: This will wipe the database. Are you sure?")) {
            await supabase.from('products').delete().neq('id', '0');
            await supabase.from('posts').delete().neq('id', '0');
            await supabase.from('orders').delete().neq('id', '0');
            setProducts([]);
            setPosts([]);
            setOrders([]);
        }
    };

    if (!isLoaded) return null; // Or a loading spinner

    return (
        <StoreContext.Provider value={{
            products, posts, orders,
            addProduct, updateProduct, deleteProduct,
            addPost, updatePost, deletePost,
            addOrder, updateOrder,
            resetStore
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
