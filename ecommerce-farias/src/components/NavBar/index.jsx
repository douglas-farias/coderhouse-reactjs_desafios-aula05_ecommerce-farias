import './style.css'
import CartWidget from '../CartWidget';

function NavBar() {
    return (
        <header className='navBar'>
            <nav>
                <div>
                    <a href="../../../public/index.html">E_COMMERCE</a>
                </div>
                <ul>
                    <li><a>Produtos</a></li>
                    <li><a>Novidades</a></li>
                    <li><a>Ofertas</a></li>
                </ul>
                <div className="auth-cart">
                    <ul>
                        <li><button>Login</button></li>
                        <li><button>Cadastro</button></li>
                    </ul>
                    <CartWidget />
                </div>
            </nav>
        </header>
    );
}

export default NavBar;