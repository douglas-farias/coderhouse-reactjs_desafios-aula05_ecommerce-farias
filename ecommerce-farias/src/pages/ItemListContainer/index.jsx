// src/pages/ItemListContainer.js
import './style.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../services/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import ItemList from '../../components/ItemList';

function ItemListContainer() {
  const [itens, setItens] = useState([]);
  const { filter } = useParams();

  const filterMap = (filter) => {
    if (!filter) return null;
    
    const mapping = {
      'categoria-a': 'Categoria A',
      'categoria-b': 'Categoria B',
      'categoria-c': 'Categoria C',
      'categoria-d': 'Categoria D',
    };

    return mapping[filter.toLowerCase()] || null;
  };

  useEffect(() => {
    const obterProdutos = async () => {
      try {
        const produtosCollection = collection(db, 'ItemCollection');
        let produtosQuery = query(produtosCollection, orderBy('nome'));
        
        const categoriaFiltrada = filterMap(filter);
        if (categoriaFiltrada) {
          produtosQuery = query(
            produtosCollection,
            orderBy('nome'),
            where('categoria', '==', categoriaFiltrada)
          );
        } else {
          produtosQuery = query(produtosCollection, orderBy('nome'));
        }

        const snapshot = await getDocs(produtosQuery);
        const produtos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setItens(produtos);
      } catch (error) {
        console.error('Erro ao obter produtos: ', error);
      }
    };

    obterProdutos();
  }, [filter]);

  var titulo = filterMap(filter);

  if (filterMap(filter) === null) {
    titulo = 'TODOS OS PRODUTOS'
  } else {
    titulo = filterMap(filter).toUpperCase()
  }

  return (
    <div className='itemListContainer'>
      <h1 className='itemLista__titulo'>{titulo}</h1>
      <ItemList itens={itens} />
    </div>
  );
}

export default ItemListContainer;