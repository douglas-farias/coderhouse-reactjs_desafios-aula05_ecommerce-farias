import './style.css';
import { useState } from 'react';
import CartList from '../../components/CartList';
import { useCart } from '../../context/CartProvider';

function CartListContainer() {
    const { cart, totalCarrinho, limparCarrinho } = useCart();
    const [desconto, setDesconto] = useState(0);

    const listaCupons = [
        { codigo: "CUPOM10", valor: 0.1 },
        { codigo: "CUPOM15", valor: 0.15 },
        { codigo: "CUPOM25", valor: 0.25 },
        { codigo: "CUPOM50", valor: 0.5 },
    ];

    function calcularDesconto() {
        const inputCupom = document.getElementById('inputCupom').value;
        const cupom = listaCupons.find(c => c.codigo === inputCupom.toUpperCase());
        if (cupom) {
            setDesconto(totalCarrinho() * cupom.valor);
        } else {
            setDesconto(0);
            document.getElementById('inputCupom').value = "CÓDIGO INVÁLIDO";
        }
    }

    function cupomKeyDown(event) {
        if (event.key === 'Enter') {
            calcularDesconto()
        }
    }
    
    return (
        <div className='cartListContainer'>
            <div className='cartListContainer__titulo'>
                <h1>CARRINHO</h1>
            </div>
            <CartList />
            <div className='cartListContainer__cupom'>
                <h4>DESCONTO</h4>
                <div>
                    <input
                        type="text"
                        id="inputCupom"
                        placeholder='Insira o seu cupom de desconto'
                        onKeyDown={cupomKeyDown}
                    />
                </div>
                <button onClick={calcularDesconto}>INSERIR</button>
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
                    <table className="cartListContainer__freteTabela">
                        <tr>
                            <th>_</th>
                            <th>ENVIO</th>
                            <th>PRAZO</th>
                            <th>PREÇO</th>
                        </tr>
                        <tr id="fretePadrao">
                            <td><input type="radio" name="opcaoFrete" value="5" /></td>
                            <td>PADRÃO</td>
                            <td>10 a 15 dias</td>
                            <td>R$ 5,00</td>
                        </tr>
                        <tr id="freteExpresso">
                            <td><input type="radio" name="opcaoFrete" value="10" /></td>
                            <td>EXPRESSO</td>   
                            <td>3 a 5 dias</td>
                            <td>R$ 10,00</td>
                        </tr>
                    </table>
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
                            <span>R$ {desconto.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div>
                            <p>frete</p>
                            <span>R$ 10,00</span>
                        </div>
                        <div>
                            <p>TOTAL</p>
                            <span>R$ {(cart.length !== 0 ? (totalCarrinho() - desconto + 10) : 0).toFixed(2).replace('.', ',')}</span>
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

export default CartListContainer;