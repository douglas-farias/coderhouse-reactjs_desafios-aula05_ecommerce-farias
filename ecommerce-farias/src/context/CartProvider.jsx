import React, { useState, createContext, useContext, useEffect } from 'react';

const CartContext = createContext(undefined);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function acumuladorCartWidget() {
    return cart.reduce((acc, item) => acc + item.quantidade, 0);
  }

  function isInCart(id) {
    return cart.some(item => item.id === id);
  }

  function adicionarAoCarrinho(item) {
    setCart(prevCart => {
      const updatedCart = isInCart(item.id)
        ? prevCart.map(obj => obj.id === item.id
            ? { ...obj, quantidade: Math.min(obj.quantidade + item.quantidade, obj.estoque) }
            : obj)
        : [...prevCart, item];
      return updatedCart;
    });
  }

  function removerDoCarrinho(itemId) {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }

  function totalCarrinho() {
    return cart.reduce((acc, item) => acc + item.quantidade * (item.priceWithDiscount || item.preco), 0);
  }

  function limparCarrinho() {
    setCart([]);
  }

  function atualizarQuantidade(id, quantidade) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  }

  return (
    <CartContext.Provider value={{ cart, acumuladorCartWidget, isInCart, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, totalCarrinho, atualizarQuantidade }}>
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
