import './style.css'
import { Link } from 'react-router-dom';

function CartWidget({ contador }) {
    return (
        <div className='CartWidget'>
            <Link to={'/carrinho'}>
                <img className="icone" src="/2135A6-bold_carrinho.png" alt="Ìcone carrinho" />
                <h3>{contador}</h3>
            </Link>
        </div>
    );
}

export default CartWidget