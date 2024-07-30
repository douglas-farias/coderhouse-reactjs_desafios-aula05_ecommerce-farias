import './style.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import ItemCount from '../ItemCount';

function CartItem({ item }) {
  const { cart, removerDoCarrinho, atualizarQuantidade } = useCart();
  const itemNoCarrinho = cart.find(cartItem => cartItem.id === item.id);
  const quantidadeNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
  const [contador, setContador] = useState(quantidadeNoCarrinho);

  useEffect(() => {
    if (contador !== quantidadeNoCarrinho) {
      atualizarQuantidade(item.id, contador);
    }
  }, [contador, item.id, quantidadeNoCarrinho, atualizarQuantidade]);

  const subTotal = (item.preco * contador).toFixed(2).replace('.', ',');

  const tratarMudancaContador = (novoContador) => {
    setContador(novoContador);
  };

  return (
    <div className='cartItem'>
      <div className='cartItem__imagemContainer'>
        <img src={item.imagem} alt={item.imagemAlt} />
      </div>
      <div>
        <Link to={`/produto/${item.id}`} className='cartItem__nome'>
          <h3>{item.nome.toUpperCase()}</h3>
        </Link>
        <h3 className='cartItem__categoria'>{item.categoria}</h3>
      </div>
      <h3 className='cartItem__preco'>R$ {item.preco.toFixed(2).replace('.', ',')}</h3>
      <div className='cartItem__count'>
        <ItemCount
          estoque={item.estoque}
          contadorInicial={contador}
          quantidadeNoCarrinho={quantidadeNoCarrinho}
          atualizacaoContador={tratarMudancaContador}
          contexto='carrinho'
        />
      </div>
      <h3 className='cartItem__subtotal'>R$ {subTotal}</h3>
      <button className='cartItem__deletar' onClick={() => removerDoCarrinho(item.id)}>
        <img src='/black-bold_fechar.png' alt='Excluir item' />
      </button>
    </div>
  );
}

export default CartItem;
