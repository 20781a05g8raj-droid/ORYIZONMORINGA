'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Define Types
export type ContactMessage = {
    id?: string;
    name: string;
    email: string;
    message: string;
    date: string;
};

export type Review = {
    id?: string;
    product_id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
};

export type Product = {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    imageAlt?: string;
    images?: string[];
    imagesAlt?: string[];
    description: string;
    ingredients: string;
    benefits: string[];
    reviews: Review[];
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
    messages: ContactMessage[];

    addProduct: (product: Product) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string | null>;

    addPost: (post: BlogPost) => Promise<void>;
    updatePost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;

    addOrder: (order: Order) => Promise<void>;
    updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;

    addReview: (review: Review) => Promise<void>;
    addMessage: (msg: ContactMessage) => Promise<void>;

    resetStore: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        try {
            // Fetch Products
            const { data: prodData } = await supabase.from('products').select('*');

            // Fetch Reviews
            const { data: revData } = await supabase.from('reviews').select('*');

            // Merge Reviews into Products
            if (prodData) {
                const mergedProducts = prodData.map(p => ({
                    ...p,
                    reviews: revData ? revData.filter(r => r.product_id === p.id) : []
                }));
                setProducts(mergedProducts);
            }

            const { data: postData } = await supabase.from('posts').select('*');
            if (postData) setPosts(postData);

            const { data: orderData } = await supabase.from('orders').select('*');
            if (orderData) setOrders(orderData);

            const { data: msgData } = await supabase.from('messages').select('*');
            if (msgData) setMessages(msgData);

            setIsLoaded(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        // Ideally listen to realtime changes on 'reviews' table too
    }, []);


    // --- Product Actions ---
    const addProduct = async (product: Product) => {
        const { error } = await supabase.from('products').insert([product]);
        if (!error) setProducts(prev => [product, ...prev]);
        else console.error("Supabase Error:", JSON.stringify(error, null, 2));
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        const { error } = await supabase.from('products').update(updates).eq('id', id);
        if (!error) setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
        else console.error("Supabase Update Error:", JSON.stringify(error, null, 2));
    };

    const deleteProduct = async (id: string) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) setProducts(prev => prev.filter(p => p.id !== id));
        else console.error(error);
    };

    // --- Review Actions ---
    const addReview = async (review: Review) => {
        const { data, error } = await supabase.from('reviews').insert([review]).select();

        if (!error && data) {
            const newReview = data[0];
            // Update local state with the actual saved review (has ID)
            setProducts(prev => prev.map(p => {
                if (p.id === review.product_id) {
                    return { ...p, reviews: [newReview, ...(p.reviews || [])] };
                }
                return p;
            }));
        } else {
            console.error("Error adding review:", JSON.stringify(error, null, 2));
        }
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

    // --- Image Upload ---
    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('uploads')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                return null;
            }

            const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
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

    // --- Message Actions ---
    const addMessage = async (msg: ContactMessage) => {
        const { error } = await supabase.from('messages').insert([msg]);
        if (!error) setMessages(prev => [msg, ...prev]);
        else console.error(error);
    };

    const resetStore = async () => {
        if (confirm("DANGER: This will wipe the database. Are you sure?")) {
            await supabase.from('products').delete().neq('id', '0');
            await supabase.from('posts').delete().neq('id', '0');
            await supabase.from('orders').delete().neq('id', '0');
            await supabase.from('reviews').delete().neq('id', '0');
            await supabase.from('messages').delete().neq('id', '0');
            setProducts([]);
            setPosts([]);
            setOrders([]);
            setMessages([]);
        }
    };

    if (!isLoaded) return null;

    return (
        <StoreContext.Provider value={{
            products, posts, orders, messages,
            addProduct, updateProduct, deleteProduct,
            addPost, updatePost, deletePost,
            addOrder, updateOrder,
            uploadImage,
            addReview,
            addMessage,
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
