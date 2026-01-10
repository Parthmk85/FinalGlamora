'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check auth status on mount
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(storedUser);
    }
  }, []);

  const getCartKey = () => {
    if (typeof window === 'undefined') return 'cart_guest';
    return user ? `cart_${user.email}` : 'cart_guest';
  };

  // Load cart (Combined Logic)
  useEffect(() => {
    const loadCart = async () => {
      // 1. If Logged In -> Try Fetch from DB
      if (user && user.id) {
        try {
          const res = await fetch(`/api/cart?userId=${user.id}`);
          const data = await res.json();
          if (res.ok && data.items) {
            setCartItems(data.items);
            setCartCount(data.items.reduce((total, item) => total + item.quantity, 0));
            return; // Success, stop here
          }
        } catch (error) {
          console.error("Failed to load cart from DB:", error);
        }
      }

      // 2. Fallback / Guest -> Load from LocalStorage
      const savedCart = localStorage.getItem(getCartKey());
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        setCartCount(items.reduce((total, item) => total + item.quantity, 0));
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    };

    loadCart();

    // Poll for cart updates (Real-time sync)
    // This ensures if Admin deletes a product, it disappears from User's cart
    let intervalId;
    if (user && user.id) {
        intervalId = setInterval(loadCart, 3000);
    }

    return () => {
        if (intervalId) clearInterval(intervalId);
    };
  }, [user]); // Re-run when user state changes

  // Save cart (Combined Logic)
  useEffect(() => {
    // Save to LocalStorage (Always good for backup/offline)
    localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
    
    // Save to DB (If logged in)
    if (user && user.id) {
      // Debounce saving to avoid too many requests? For now direct.
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, items: cartItems })
      }).catch(err => console.error("Failed to save cart to DB", err));
    }

    // Calculate cart count
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems, user]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        // Add new item with specified quantity or default to 1
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
