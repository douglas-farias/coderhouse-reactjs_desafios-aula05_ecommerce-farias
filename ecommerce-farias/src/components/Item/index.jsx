import './style.css';
import ItemCount from '../ItemCount';

function Item({ item, selecionarItem, adicionar, subtrair }) {
    return (
        <div className='produtoContainer'>
            <figure>
                <img src={item.imagem} alt={item.imagemAlt} />
            </figure>
            <h2>{item.nome.toUpperCase()}</h2>
            <span>R$ {item.preco.toFixed(2).replace('.', ',')}</span>
            <button className='btnDetalhes' onClick={() => selecionarItem(item)}>Detalhes do produto</button>
            <ItemCount
                contador={item.contador}
                adicionar={() => adicionar(item.id)}
                subtrair={() => subtrair(item.id)}
                estoque={item.estoque}
            />
        </div>
    );
}

export default Item;