import './style.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail';

function ItemDetailContainer({ voltar, adicionar, subtrair }) {
  
    const { id } = useParams();
    const [itens, setItens] = useState([]);
    const [item, setItem] = useState(null);
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
                            detalhe1: 'XXX',
                            detalhe2: 'YYY',
                            detalhe3: 'ZZZ',
                            preco: 9.90,
                            imagem: '/produto01-1.png',
                            imagemAlt: 'Descrição da imagem 1',
                            novidade: true,
                            oferta: false,
                            precoOferta: 0.00,
                            estoque: 15,
                            contador: 0
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
                            contador: 0
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
                            contador: 0
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
                            contador: 0
                        }
                    ]);
                }, 2000);
            });
        };
  
      obterProdutos().then(produtos => {
        setItens(produtos);
        const itemSelecionado = produtos.find(item => item.id === id);
        setItem(itemSelecionado);
        setCarregamento(false);
      });
    }, [id]);

    return (
        <div className='itemDetailContainer'>
            {carregamento ? (
                <div className='carregamento'>
                    <figure className='logoCentral'>
                        <img src='/transparente_logo.png' alt='Logo Ecommerce' />
                    </figure>
                    <h2>Carregando produto...</h2>
                </div>
            ) : (
                <ItemDetail
                    voltar={voltar}
                    key={item.id}
                    item={item}
                    adicionar={adicionar}
                    subtrair={subtrair}
                />
            )}          
        </div>
    );
}

export default ItemDetailContainer