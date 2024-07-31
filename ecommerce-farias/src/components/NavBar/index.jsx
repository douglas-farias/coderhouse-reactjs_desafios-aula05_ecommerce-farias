import './style.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import CartWidget from '../CartWidget';

function NavBar() {
    
    const { acumuladorCartWidget } = useCart();
    
    return (
        <header className='navBar'>
            <nav>
                <div>
                    <Link to={'/'}>E_COMMERCE</Link>
                </div>
                <ul>
                    <li>
                        <Link to='/produtos'>
                            Produtos
                        </Link>
                    </li>
                    <li><a>Novidades</a></li>
                    <li><a>Ofertas</a></li>
                </ul>
                <div className='auth-cart'>
                    <ul>
                        <li><button>Login</button></li>
                        <li><button>Cadastro</button></li>
                    </ul>
                    <CartWidget acumulador={acumuladorCartWidget()} />
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
