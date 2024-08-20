import React, { useState, createContext, useContext, useEffect } from 'react';
import db from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext(undefined);

export default function CartProvider({ children }) {

  const usuarioLogado = JSON.parse(localStorage.getItem('loggedInUser'));
  const [cart, setCart] = useState(usuarioLogado?.carrinho || []);

  useEffect(() => {
    if (usuarioLogado) {
      const updatedUser = { ...usuarioLogado, carrinho: cart };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    }
  }, [cart]);

  const abrirModalLogin = () => {
    toast.warn('Login necessário para acessar o carrinho!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const modalEvent = new CustomEvent('abrirModalLogin');
    window.dispatchEvent(modalEvent);
  };

  const verificarLogin = () => {
    if (!usuarioLogado) {
      abrirModalLogin();
      return false;
    }
    return true;
  };

  function acumuladorCartWidget() {
    return cart.reduce((acc, item) => acc + item.quantidade, 0);
  }

  function atualizarQuantidade(id, quantidade) {
    if (!verificarLogin()) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  }

  function isInCart(id) {
    return cart.some(item => item.id === id);
  }

  function adicionarAoCarrinho(item) {
    if (!verificarLogin()) return;
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
    if (!verificarLogin()) return;
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }

  function totalCarrinho() {
    return cart.reduce((acc, item) => acc + item.quantidade * (item.priceWithDiscount || item.preco), 0);
  }

  function limparCarrinho() {
    if (!verificarLogin()) return;
    setCart([]);
  }

  const atualizarCarrinhoNoFirebase = async () => {    
    try {
      const carrinhoUsuario = doc(db, 'RegisteredUsers', usuarioLogado.id);
      await updateDoc(carrinhoUsuario, { carrinho: cart });
      console.log("Carrinho atualizado no Firebase com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar o carrinho no Firebase:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        acumuladorCartWidget,
        isInCart,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        totalCarrinho,
        atualizarQuantidade,
        atualizarCarrinhoNoFirebase
      }}
    >
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