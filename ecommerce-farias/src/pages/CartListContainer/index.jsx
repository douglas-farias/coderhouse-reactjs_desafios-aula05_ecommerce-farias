import './style.css';
import CartList from '../../components/CartList';
import { useCart } from '../../context/CartProvider';

function CartListContainer() {

    const { cart, totalCarrinho, limparCarrinho } = useCart();

    let desconto = 0;
    
    return (
        <div className='cartListContainer'>
            <div className='cartListContainer__titulo'>
                <h1>CARRINHO</h1>
            </div>
            <CartList />
            <div className='cartListContainer__cupom'>
                <h4>DESCONTO</h4>
                <div>
                    <input type="text" name="" id="" placeholder='insira o seu cupom de desconto'/>
                </div>
                <button>INSERIR</button>
            </div>
            <div className='cartListContainer__entrega'>
                <div className='cartListContainer__entregaEndereco'>
                    <h4>ENTREGA</h4>
                    <div>
                        <p>ENDEREÇO&nbsp;&nbsp;</p>
                        <span>-</span>
                    </div>
                    <div>
                        <p>COMPLEMENTO&nbsp;&nbsp;</p>
                        <span>-</span>
                    </div>
                    <div>
                        <p>CEP&nbsp;&nbsp;</p>
                        <span>-</span>
                    </div>
                    <div>
                        <p>CIDADE&nbsp;&nbsp;</p>
                        <span>-</span>
                    </div>
                </div>
                <div className='cartListContainer__entregaFrete'>
                    <h4>FRETE</h4>
                </div>
            </div>
            <div className='cartListContainer__resumo'>
                <h2>TOTAIS</h2>
                <div className='cartListContainer__resumoContainer'>
                    <div className='cartListContainer__resumoValores'>
                        <div>
                            <p>subtotal</p>
                            <span>R$ {totalCarrinho().toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div>
                            <p>desconto</p>
                            <span>R$ 0,00</span>
                        </div>
                        <div>
                            <p>frete</p>
                            <span>R$ 10,00</span>
                        </div>
                        <div>
                            <p>TOTAL</p>
                            <span>R$ {(cart.length != 0 ? (totalCarrinho() - desconto + 10) : 0).toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                    <div className='cartListContainer__resumoBotoes'>
                        <button onClick={() => limparCarrinho(cart)} disabled={(cart.length === 0)}>LIMPAR</button>
                        <button disabled={(cart.length === 0)}>FINALIZAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartListContainer