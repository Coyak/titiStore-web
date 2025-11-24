import { createContext, useContext, useState, useEffect } from 'react';
import * as cartApi from '../api/cartApi';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      const data = await cartApi.getCart();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      alert('Por favor inicia sesión para agregar productos al carro');
      return;
    }
    try {
      await cartApi.addToCart(product.id, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await cartApi.updateCartItem(productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartApi.removeCartItem(productId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setItems([]);
    } catch (error) {
      console.error('Failed to clear cart', error);
    }
  };

  const total = items.reduce((sum, item) => {
    return sum + Number(item.product?.price || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, total, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
