import './style.css';
import { Link } from 'react-router-dom';

function CategoryCard({ menu }) {
    return (
        <nav className='categoryCard' style={{ display: menu ? 'flex' : 'none'}}>
            <Link to="/produtos">
                <div className='categoryCardTodos'>
                    TODOS OS PRODUTOS
                </div>
            </Link>
            <Link to="/produtos/categoria-a">
                <div className='categoryCardA'>
                    CATEGORIA A
                </div>
            </Link>
            <Link to="/produtos/categoria-b">
                <div className='categoryCardB'>
                    CATEGORIA B
                </div>
            </Link>
            <Link to="/produtos/categoria-c">
                <div className='categoryCardC'>
                    CATEGORIA C
                </div>
            </Link>
            <Link to="/produtos/categoria-d">
                <div className='categoryCardD'>
                    CATEGORIA D
                </div>
            </Link>
        </nav>
    );
}

export default CategoryCard;
