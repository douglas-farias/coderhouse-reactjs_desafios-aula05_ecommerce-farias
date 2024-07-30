import './style.css'
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget';


function NavBar({ contador }) {
    
    return (
        <header className='navBar'>
            <nav>
                <div>
                    <Link to={'/'}>E_COMMERCE</Link>
                </div>
                <ul>
                    <li><a>Produtos</a></li>
                    <li><a>Novidades</a></li>
                    <li><a>Ofertas</a></li>
                </ul>
                <div className='auth-cart'>
                    <ul>
                        <li><button>Login</button></li>
                        <li><button>Cadastro</button></li>
                    </ul>
                    <CartWidget contador={contador}/>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;