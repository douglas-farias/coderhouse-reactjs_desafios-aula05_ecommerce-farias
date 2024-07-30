import React, { useState, createContext, useContext } from 'react';

const CartContext = createContext(undefined);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  function atualizarLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function isInCart(id) {
    return cart.some(item => item.id === id);
  }

  function adicionarAoCarrinho(item) {
    let updatedCart;

    if (isInCart(item.id)) {
      setCart(prevCart => {
        updatedCart = prevCart.map(obj =>
          obj.id === item.id ? { ...obj, quantidade: Math.min(obj.quantidade + item.quantidade, obj.estoque) } : obj
        );
        atualizarLocalStorage(updatedCart);
        return updatedCart;
      });
    } else {
      updatedCart = [...cart, item];
      setCart(updatedCart);
      atualizarLocalStorage(updatedCart);
    }
  }

  function removerDoCarrinho(itemId) {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    atualizarLocalStorage(updatedCart);
  }

  function limparCarrinho() {
    const updatedCart = [];
    setCart(updatedCart);
    atualizarLocalStorage(updatedCart);
  }

  return (
    <CartContext.Provider value={{ cart, isInCart, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Para usar o useCart seu componente precisa estar dentro do CartProvider');
  }

  return context;
}