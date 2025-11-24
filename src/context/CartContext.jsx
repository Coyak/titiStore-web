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
      console.error('No se pudo cargar el carro', error);
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
      console.error('No se pudo agregar al carro', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await cartApi.updateCartItem(productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('No se pudo actualizar el carro', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartApi.removeCartItem(productId);
      await fetchCart();
    } catch (error) {
      console.error('No se pudo eliminar del carro', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setItems([]);
    } catch (error) {
      console.error('No se pudo vaciar el carro', error);
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
