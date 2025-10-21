
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity, selectedSize: size, selectedColor: color, cartItemId }];
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
