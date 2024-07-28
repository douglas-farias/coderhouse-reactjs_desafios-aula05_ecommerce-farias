import './style.css';
import Item from '../Item';

function ItemList({ itens, selecionarItem, adicionar, subtrair }) {

    return (
        <div>
            <h1 className='itemLista__titulo'>PRODUTOS</h1>
            <div className='itemList'>
                {itens.map(item => (
                    <Item
                        key={item.id}
                        item={item}
                        selecionarItem={selecionarItem}
                        adicionar={adicionar}
                        subtrair={subtrair}
                    />
                ))}
            </div>
        </div>
    );
}

export default ItemList;