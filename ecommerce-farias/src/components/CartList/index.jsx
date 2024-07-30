import './style.css';
import CartItem from '../CartItem';
import { useCart } from '../../context/CartProvider';

function CartList() {

    const { cart } = useCart();
    
    if (cart.length === 0) {
        return (
            <div className='cartList'>
                <div className='cartListVazio'>
                    <h2>ainda não há produtos no seu carrinho.</h2>
                </div>
            </div>
        );
    } else {
        return (
            <div className='cartList'>
                {cart.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        );
    };
}

export default CartList