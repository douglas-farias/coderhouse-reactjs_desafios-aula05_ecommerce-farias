import './style.css';
import ItemCard from '../ItemCard';

function ItemList({ itens }) {
  return (
    <div>
      <h1 className='itemLista__titulo'>PRODUTOS</h1>
      <div className='itemList'>
        {itens.map(item => (
            <ItemCard
                key={item.id}
                item={item}
            />
        ))}
      </div>
    </div>
  );
}

export default ItemList;