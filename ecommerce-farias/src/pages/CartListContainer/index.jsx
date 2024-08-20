import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartProvider';
import { format } from "date-fns";
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import db from '../../services/firebase';
import CartList from '../../components/CartList';
import FinalModal from '../../components/FinalModal';

function CartListContainer() {
    const { cart, totalCarrinho, limparCarrinho, atualizarCarrinhoNoFirebase } = useCart();
    const [modalEstaAberto0, setModalEstaAberto0] = useState(false);
    const [desconto, setDesconto] = useState(0);
    // const [distancia, setDistancia] = useState(null);

    const navigate = useNavigate();
    const usuarioLogado = JSON.parse(localStorage.getItem('loggedInUser'));

    // const enderecoOrigem = '-23.5492,-46.6331';
    // const enderecoDestinoCompleto = `${usuarioLogado.endereco.logradouro}, ${usuarioLogado.endereco.numero} - ${usuarioLogado.endereco.bairro} - ${usuarioLogado.endereco.cidade}, ${usuarioLogado.endereco.uf}`;

    // useEffect(() => {
    //     const loadGoogleMaps = () => {
    //         const script = document.createElement('script');
    //         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTfmS9NX4L8tw-XLGlwDibbtMqNiRQTPY&libraries=places`;
    //         script.async = true;
    //         script.onload = () => handleCalculateDistance();
    //         document.head.appendChild(script);
    //     };

    //     const handleCalculateDistance = () => {
    //         const service = new google.maps.DistanceMatrixService();
    //         service.getDistanceMatrix({
    //             origins: [enderecoOrigem],
    //             destinations: [enderecoDestinoCompleto],
    //             travelMode: google.maps.TravelMode.DRIVING,
    //             unitSystem: google.maps.UnitSystem.METRIC,
    //             avoidHighways: false,
    //             avoidTolls: false
    //         }, callback);
    //     };

    //     loadGoogleMaps();
    // }, [enderecoOrigem, enderecoDestinoCompleto]);

    // function callback(response, status) {
    //     if (status === 'OK') {
    //         const origin = response.originAddresses[0];
    //         const destination = response.destinationAddresses[0];
    //         const element = response.rows[0].elements[0];
    //         const distance = element.distance.text;
    //         const duration = element.duration.text;

    //         console.log(`De: ${origin}`);
    //         console.log(`Para: ${destination}`);
    //         console.log(`Distância: ${distance}`);
    //         console.log(`Duração: ${duration}`);

    //         setDistancia(distance);
    //     } else {
    //         console.error(`Erro: ${status}`);
    //     }
    // }

    // const enderecoDestinoFormatado = encodeURI(enderecoDestinoCompleto);
    // const calcularDistancia = async () => {
    //     const apiKey = 'AIzaSyCTfmS9NX4L8tw-XLGlwDibbtMqNiRQTPY';
    //     const origem = '-23.5492,-46.6331';
    //     const destino = enderecoDestinoFormatado;
    
    //     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${destino}&key=${apiKey}`;
    
    //     try {
    //         const response = await axios.get(url);
    //         const resultado = response.data;
    //         const distanciaEmMetros = resultado.rows[0].elements[0].distance.value;
    //         localStorage.setItem('distancia', JSON.stringify(resultado))
    //         setDistancia(distanciaEmMetros);
    //         console.log(distanciaEmMetros);
    //     } catch (error) {
    //         console.error('Erro ao buscar dados: ', error);
    //     }
    // };

    // calcularDistancia()

    const enviarPedido = async () => {
        // abrirFecharModal0();
        const currentDateTime = format(new Date(), 'dd.MM.yyyy - HH:mm:ss');

        const itens = usuarioLogado.carrinho;
        const itensFiltrados = itens.map(item => ({
            id: item.id,
            nome: item.nome,
            quantidade: item.quantidade,
            subtotal: (item.preco * item.quantidade)
        }));

        const totalCompra = (cart.length !== 0 ? (totalCarrinho() - desconto + 10) : 0).toFixed(2);

        const pedidoFinalizado = {
            data: currentDateTime,
            cliente: {
                id: usuarioLogado.id,
                nome: `${usuarioLogado.nome} ${usuarioLogado.sobrenome}`,
                email: usuarioLogado.email,
            },
            compra: itensFiltrados,
            entrega: {
                endereco: usuarioLogado.endereco,
                tipo: 'Padrão',
                prazo: '10 a 15 dias'
            },
            valores: {
                subtotal: totalCarrinho(),
                frete: (10).toFixed(2),
                desconto: desconto.toFixed(2),
                total: totalCompra
            }
        };

        try {
            await addDoc(collection(db, 'Orders'), pedidoFinalizado);
            console.log(pedidoFinalizado)
            toast.info(
                'Processando pagamento', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    onClose: () => {
                        toast.success(
                            'Compra Finalizada com sucesso!', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Bounce,
                                onClose: () => {
                                    abrirFecharModal0();
                                    limparCarrinho();
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {
            console.error("Erro ao enviar pedido: ", error);
            toast.error('Erro ao enviar pedido.');
        }
    }

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
            calcularDesconto();
        }
    }

    return (
        <div className='cartListContainer'>
            <ToastContainer />
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
                        <span>{ `${usuarioLogado.endereco.logradouro}, ${usuarioLogado.endereco.numero}` }</span>
                    </div>
                    <div>
                        <p>COMPLEMENTO&nbsp;&nbsp;</p>
                        <span>{usuarioLogado.endereco.complemento}</span>
                    </div>
                    <div>
                        <p>CEP&nbsp;&nbsp;</p>
                        <span>{usuarioLogado.endereco.cep}</span>
                    </div>
                    <div>
                        <p>CIDADE&nbsp;&nbsp;</p>
                        <span>{`${usuarioLogado.endereco.cidade}, ${usuarioLogado.endereco.uf}`}</span>
                    </div>
                </div>
                <div className='cartListContainer__entregaFrete'>
                    <h4>FRETE</h4>
                    <table className="cartListContainer__freteTabela">
                        <thead>
                            <tr>
                                <th>_</th>
                                <th>ENVIO</th>
                                <th>PRAZO</th>
                                <th>PREÇO</th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>
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
                        <button onClick={enviarPedido} disabled={(cart.length === 0)}>FINALIZAR</button>
                    </div>
                </div>
            </div>
            {modalEstaAberto0 && <FinalModal
                                    abrirFecharModal0={abrirFecharModal0}
                                    modalEstaAberto0={modalEstaAberto0}
                                />
            }
        </div>
    );
}

export default CartListContainer;
