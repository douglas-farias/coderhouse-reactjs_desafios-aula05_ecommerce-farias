// src/pages/ItemListContainer.js
import './style.css';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import db from '../../services/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import ItemList from '../../components/ItemList';

function ItemListContainer() {
  const [itens, setItens] = useState([]);

  const [searchParams] = useSearchParams();
  const termoBusca = searchParams.get('busca');

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
      } else if (termoBusca) {
        produtosQuery = query(
          produtosCollection,
          orderBy('nome'),
          where('nome', '>=', termoBusca),
          where('nome', '<=', termoBusca + '\uf8ff')
        );
      }

      const snapshot = await getDocs(produtosQuery);
      const produtos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setItens(produtos);
    } catch (error) {
      console.error('Erro ao obter produtos: ', error);
      setItens([]);
    }
  };

  useEffect(() => {
    obterProdutos();
  }, [filter, termoBusca]);

  let titulo = filterMap(filter);

  if (!filter && !termoBusca) {
    titulo = 'TODOS OS PRODUTOS';
  } else if (termoBusca) {
    titulo = `BUSCA: "${termoBusca}"`;
  } else {
    titulo = filterMap(filter).toUpperCase();
  }

  return (
    <div className='itemListContainer'>
      <h1 className='itemLista__titulo'>{titulo}</h1>
      {itens.length === 0 ? (
        <p className='itemLista__mensagem'>Não foram encontrados resultados para sua busca.</p>
      ) : (
        <ItemList itens={itens} />
      )}
    </div>
  );
}

export default ItemListContainer;