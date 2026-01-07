"use client"
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children, initial = 0 }) {
    const [cartCount, setCartCount] = useState(Number(initial) || 0);

    const addToCart = (n = 1) => {
        setCartCount((c) => c + (Number(n) || 1));
    };

    const clearCart = () => setCartCount(0);

    return (
        <CartContext.Provider value={{ cartCount, addToCart, setCartCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}
