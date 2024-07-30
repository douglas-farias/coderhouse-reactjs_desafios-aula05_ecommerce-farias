import React, { useState, createContext, useContext } from 'react'

const NewContext = createContext(undefined);

export default function NewProvider({ children }) {
  const [newState, setNewState] = useState("");

  function mudarState(valor) {
    setNewState(valor);
  }

  return (
    <NewContext.Provider value={{ newState, mudarState }}>
      {children}
    </NewContext.Provider>
  );
};

export function useNew() {
  const context = useContext(NewContext);

  if (!context) {
    throw new Error('Para usar o useCart seu componente precisa estar dentro do CartProvider');
  }

  return context;
}