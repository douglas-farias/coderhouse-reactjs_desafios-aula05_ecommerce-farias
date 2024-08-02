import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import { useState } from 'react';
import CartWidget from '../CartWidget';
import LoginModal from '../LoginModal';

function NavBar() {
    
    const usuarioLogado = JSON.parse(localStorage.getItem('loggedInUser'));

    const { acumuladorCartWidget } = useCart();
    const [modalEstaAberto, setModalEstaAberto] = useState(false)

    const abrirFecharModal = () => {
        setModalEstaAberto(prevState => !prevState);
    };

    const navigate = useNavigate()
      
    return (
        <header className='navBar'>
            <nav>
                <div>
                    <Link to={'/'}>E_COMMERCE</Link>
                </div>
                {useLocation().pathname == '/cadastrousuario' ?
                    <div className='navBar__voltar'>
                        <a onClick={() => navigate(-1)}>
                            <button><h5>voltar</h5></button>
                        </a>
                    </div> :
                    <>
                        <ul className='navBarLista__central'>
                            <li>
                                <Link to='/produtos'>
                                    Produtos
                                </Link>
                            </li>
                            <li><a>Novidades</a></li>
                            <li><a>Ofertas</a></li>
                        </ul>
                        {usuarioLogado ?
                            <div className='auth-cart'>
                                <ul>
                                    <li><button onClick={abrirFecharModal}>Perfil</button></li>
                                </ul>
                                <CartWidget acumulador={acumuladorCartWidget()} />
                            </div> :
                            <div className='auth-cart'>
                                <ul>
                                    <li><button onClick={abrirFecharModal}>Login | Cadastro</button></li>
                                </ul>
                                <CartWidget acumulador={acumuladorCartWidget()} />
                            </div>
                        }
                    </>
                }
            </nav>
            {modalEstaAberto && <LoginModal
                                    abrirFecharModal={abrirFecharModal}
                                    modalEstaAberto={modalEstaAberto}
                                    />
            }
        </header>
    );
}

export default NavBar;
