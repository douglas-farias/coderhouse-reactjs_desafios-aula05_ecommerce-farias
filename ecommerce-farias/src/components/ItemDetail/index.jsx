import './style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import ItemCount from '../ItemCount';

function ItemDetail({ item }) {
    const { cart, adicionarAoCarrinho } = useCart();
    const [contador, setContador] = useState(1);

    const itemNoCarrinho = cart.find(cartItem => cartItem.id === item.id);
    const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
    

    return (
        <div className='itemDetail'>
            <div className='item__titulo'>
                <h1>{item.nome.toUpperCase()}</h1>
                <Link to={'/produtos'}>
                    <button><h5>voltar</h5></button>
                </Link>
            </div>
            <div className='item__imagemContainer'>
                <figure>
                    <img src={item.imagem} alt={item.imagemAlt} />
                </figure>
            </div>
            <div className='item__detalhesContainer'>
                <div>
                    <h3>Detalhe X</h3>
                    <h4>{item.detalhe1}</h4>
                </div>
                <div>
                    <h3>Detalhe Y</h3>
                    <h4>{item.detalhe2}</h4>
                </div>
                <div>
                    <h3>Detalhe Z</h3>
                    <h4>{item.detalhe3}</h4>
                </div>
            </div>
            <ItemCount
                estoque={item.estoque}
                contadorInicial={1}
                contexto='detalhe'
                quantidadeNoCarrinho={quantidadeNoCarrinho}
                atualizacaoContador={setContador}
            />
            <div className='item__descricaoContainer'>
                <h4>{item.categoria} &gt; {item.subcategoria}</h4>
                <p>{item.descricao}</p>
                <h2>R$ {item.preco.toFixed(2).replace('.', ',')}</h2>
            </div>
            <div className='botaoCarrinho'>
                <button onClick={() => adicionarAoCarrinho({ ...item, quantidade: contador })}>Adicionar ao carrinho</button>
            </div>
        </div>
    );
}

export default ItemDetail;