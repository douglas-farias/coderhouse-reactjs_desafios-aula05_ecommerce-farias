import './style.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount';

function Item({ item }) {
    
    const [contador, setContador] = useState(0);

    const adicionar = () => {
        if (contador < item.estoque) {
            setContador(contador + 1);
        }
    };

    const subtrair = () => {
        if (contador > 0) {
            setContador(contador - 1);
        }
    };

    return (
        <div className='produtoContainer'>
            <figure>
                <img src={item.imagem} alt={item.imagemAlt} />
            </figure>
            <h2>{item.nome.toUpperCase()}</h2>
            <span>R$ {item.preco.toFixed(2).replace('.', ',')}</span>
            <Link to={`/produto/${item.id}`}>
                <button className='btnDetalhes'>Detalhes do produto</button>
            </Link>
            <ItemCount
                contador={contador}
                adicionar={adicionar}
                subtrair={subtrair}
                estoque={item.estoque}
            />
        </div>
    );
}

export default Item