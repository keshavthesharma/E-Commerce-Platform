import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load cart from local storage on initial render
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.product === product._id);
            if (itemExists) {
                return prevItems.map((item) =>
                    item.product === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { product: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.product !== productId));
    };

    const updateQuantity = (productId, qty) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product === productId ? { ...item, quantity: Number(qty) } : item
            )
        );
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};