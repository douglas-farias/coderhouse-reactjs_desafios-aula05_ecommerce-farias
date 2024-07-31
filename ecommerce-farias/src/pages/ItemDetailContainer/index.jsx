import './style.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail';
import db from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ItemDetailContainer({ voltar }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    obterProduto();
  }, [id]);

  const obterProduto = async () => {
    try {
      const produtoRef = doc(db, "ItemCollection", id);
      const snapshot = await getDoc(produtoRef);
      if (snapshot.exists()) {
        setItem({ ...snapshot.data(), id: snapshot.id });
      } else {
        console.error("Produto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao obter produto: ", error);
    }
  };

  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='itemDetailContainer'>
      <ItemDetail voltar={voltar} item={item} />
    </div>
  );
}

export default ItemDetailContainer;
