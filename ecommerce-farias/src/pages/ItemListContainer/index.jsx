import './style.css';
import ItemList from '../../components/ItemList';
import { useState, useEffect } from 'react';
import db from '../../services/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function ItemListContainer() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    obterProdutos();
  }, []);

  const obterProdutos = async () => {
    try {
      const produtosCollection = collection(db, "ItemCollection");
      const produtosQuery = query(produtosCollection, orderBy("nome"));
      const snapshot = await getDocs(produtosQuery);
      const produtos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setItens(produtos);
    } catch (error) {
      console.error("Erro ao obter produtos: ", error);
    }
  };

  return (
    <div className='itemListContainer'>
      <ItemList itens={itens} />
    </div>
  );
}

export default ItemListContainer;