import './style.css'
import { Link } from 'react-router-dom';

function CartWidget({ acumulador }) {
    return (
        <div className='CartWidget'>
            <Link to={'/carrinho'}>
                <img className="icone" src="/2135A6-bold_carrinho.png" alt="Ìcone carrinho" />
                <h3>{acumulador}</h3>
            </Link>
        </div>
    );
}

export default CartWidget;