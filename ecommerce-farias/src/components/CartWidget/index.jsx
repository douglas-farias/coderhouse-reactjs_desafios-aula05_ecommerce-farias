import './style.css'
import { Link } from 'react-router-dom';

function CartWidget({ acumulador }) {
    return (
        <div className='CartWidget'>
            <Link to={'/carrinho'}>
                <img className="icone" src="/assets/black-bold_carrinho.svg" alt="Ìcone carrinho" />
                <h3>{acumulador}</h3>
            </Link>
        </div>
    );
}

export default CartWidget;