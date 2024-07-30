import './style.css';
import ItemList from '../../components/ItemList';
import { useState, useEffect } from 'react';

function ItemListContainer() {

  const [itens, setItens] = useState([]);
  const [carregamento, setCarregamento] = useState(true);

  useEffect(() => {
    const obterProdutos = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { 
              id: '0001',
              categoria: 'Categoria A',
              subcategoria: 'Categoria A1',
              nome: 'Produto 01',
              descricao: 'Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.',
              detalhe1: 'Detalhe X',
              detalhe2: 'Detalhe Y',
              preco: 9.90,
              imagem: '/produto01-1.png',
              imagemAlt: 'Descrição da imagem 1',
              novidade: true,
              oferta: false,
              precoOferta: 0.00,
              estoque: 15,
              quantidade: 0
            },
            {
              id: '0002',
              categoria: 'Categoria A',
              subcategoria: 'Categoria A1',
              nome: 'Produto 02',
              descricao: 'Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.',
              detalhe1: 'XXX',
              detalhe2: 'YYY',
              detalhe3: 'ZZZ',
              preco: 19.90,
              imagem: '/produto01-1.png',
              imagemAlt: 'Descrição da imagem 2',
              novidade: true,
              oferta: false,
              precoOferta: 0.00,
              estoque: 20,
              quantidade: 0
            },
            {
              id: '0003',
              categoria: 'Categoria A',
              subcategoria: 'Categoria A1',
              nome: 'Produto 03',
              descricao: 'Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.',
              detalhe1: 'XXX',
              detalhe2: 'YYY',
              detalhe3: 'ZZZ',
              preco: 29.90,
              imagem: '/produto01-1.png',
              imagemAlt: 'Descrição da imagem 3',
              novidade: true,
              oferta: false,
              precoOferta: 0.00,
              estoque: 25,
              quantidade: 0
            },
            {
              id: '0004',
              categoria: 'Categoria A',
              subcategoria: 'Categoria A1',
              nome: 'Produto 04',
              descricao: 'Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus.',
              detalhe1: 'XXX',
              detalhe2: 'YYY',
              detalhe3: 'ZZZ',
              preco: 39.90,
              imagem: '/produto01-1.png',
              imagemAlt: 'Descrição da imagem 4',
              novidade: true,
              oferta: false,
              precoOferta: 0.00,
              estoque: 30,
              quantidade: 0
            }
          ]);
        }, 2000);
      });
    };

    obterProdutos().then(produtos => {
      setItens(produtos);
      setCarregamento(false);
    });
  }, []);

  return (
    <div className='itemListContainer'>
      {carregamento ? (
        <div className='carregamento'>
          <img src='/transparente_logo.png' alt='Logo Ecommerce' />
          <h2>Carregando a lista de produtos...</h2>
        </div>
      ) : (
        <ItemList
          itens={itens}
        />
      )}
    </div>
  );
}

export default ItemListContainer;
