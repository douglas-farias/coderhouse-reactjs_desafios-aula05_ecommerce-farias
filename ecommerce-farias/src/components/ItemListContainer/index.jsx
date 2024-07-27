import './style.css';
import ItemList from '../ItemList';

function ItemListContainer({ greeting, itens, adicionar, subtrair }) {
    return (
            <div className='itemListContainer'>
                <h4>{greeting}</h4>
                <ItemList
                    itens={itens}
                    adicionar={adicionar}
                    subtrair={subtrair}
                />
            </div>
    );
}

export default ItemListContainer;