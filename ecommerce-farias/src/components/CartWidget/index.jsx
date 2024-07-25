import './style.css'

function CartWidget({ contador }) {
    return (
        <div className='CartWidget'>
            <a href='#'>
                <img className="icone" src="/2135A6-bold_carrinho.png" alt="Ìcone carrinho" />
                <h3>{contador}</h3>
            </a>
        </div>
    );
}

export default CartWidget