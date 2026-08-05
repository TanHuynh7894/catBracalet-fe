import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshCart = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setCartCount(0);
            setCartItems([]);
            return;
        }

        try {
            setLoading(true);
            const data = await getCart();
            const items = data.items || [];
            setCartItems(items);
            setCartCount(items.length);
        } catch (error) {
            console.error('Error fetching cart for context:', error);

            if (error === 'Unauthorized' || (error.response && error.response.status === 401)) {
                setCartCount(0);
                setCartItems([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshCart();


        const handleStorageChange = (e) => {
            if (e.key === 'accessToken' || e.key === 'user') {
                refreshCart();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [refreshCart]);

    return (
        <CartContext.Provider value={{ cartCount, cartItems, refreshCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};
