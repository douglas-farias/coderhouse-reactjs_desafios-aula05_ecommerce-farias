import './NavBar.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../context/CartProvider';
import CartWidget from '../CartWidget';
import LoginModal from '../LoginModal';


function NavBar() {
    
    const usuarioLogado = JSON.parse(localStorage.getItem('loggedInUser'));
    const { acumuladorCartWidget, atualizarCarrinhoNoFirebase } = useCart();
    const [modalEstaAberto, setModalEstaAberto] = useState(false); 

    const navigate = useNavigate();
    const location = useLocation();

    const logoff = () => {
        if (usuarioLogado) {
            atualizarCarrinhoNoFirebase();
            usuarioLogado.login = false;
            localStorage.removeItem('loggedInUser');
            toast.info(
                'Sainda da sua conta. Até Breve!', {
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
                        navigate('/')
                    }
                }
            );
        }
    }

    const abrirFecharModal = () => {
        setModalEstaAberto(prevState => !prevState);
    };

    useEffect(() => {
        const handleAbrirModalLogin = () => {
            setModalEstaAberto(true);
        };

        window.addEventListener('abrirModalLogin', handleAbrirModalLogin);

        return () => {
            window.removeEventListener('abrirModalLogin', handleAbrirModalLogin);
        };
    }, []);
      
    return (
        <header className='navBar'>
            <nav>
                <div>
                    <Link to={'/'}>E_COMMERCE</Link>
                </div>
                {location.pathname === '/cadastrousuario' ? (
                    <div className='navBar__voltar'>
                        <a onClick={() => navigate(-1)}>
                            <button><h5>voltar</h5></button>
                        </a>
                    </div>
                ) : (
                    <>
                        <div className='navBar__busca'>
                            <input type='text' id='buscaProdutos' placeholder='Busque os produtos' />
                            <button id='botaoBuscar'><img src='/assets/2135A6-light_busca.svg' /></button>
                        </div>
                        {usuarioLogado ? (
                            <div className='auth-cart'>
                                <ul>
                                    <li><button onClick={logoff}>Sair</button></li>
                                    <li><button>Perfil</button></li>
                                </ul>
                                <CartWidget acumulador={acumuladorCartWidget()} />
                            </div>
                        ) : (
                            <div className='auth-cart'>
                                <ul>
                                    <li><button onClick={abrirFecharModal}>Login | Cadastro</button></li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </nav>
            {modalEstaAberto && (
                <LoginModal
                    abrirFecharModal={abrirFecharModal}
                    modalEstaAberto={modalEstaAberto}
                />
            )}
            <ToastContainer />
        </header>
    );
}

export default NavBar;