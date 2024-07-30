import './style.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount';
import { useCart } from '../../context/CartProvider';

function CartItem({ item }) {
    const { removerDoCarrinho } = useCart();

    // Calcula o subtotal formatado
    const subTotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',')

    return (
        <div className='cartItem'>
            <div className='item__imagemContainer'>
                <img src={item.imagem} alt={item.imagemAlt} />
            </div>
            <div>
                <Link to={`/produto/${item.id}`} className='item__nome'>
                    <h3>{item.nome.toUpperCase()}</h3>
                </Link>
                <h3 className='item__categoria'>{item.categoria}</h3>
            </div>
            <h3 className='item__preco'>R$ {item.preco.toFixed(2).replace('.', ',')}</h3>
            <ItemCount
                estoque={item.estoque}
                contadorInicial={item.quantidade}
            />
            {/* Interpola a variável subTotal diretamente no JSX */}
            <h3 className='item__subtotal'>R$ {subTotal}</h3>
            <button className='quantidade__deletar' onClick={() => removerDoCarrinho(item.id)}>
                <img src='/black-bold_fechar.png' alt='Excluir item' />
            </button>
        </div>
    );
}

export default CartItem;