import './style.css';
import ItemCard from '../ItemCard';

function ItemList({ itens }) {

  return (
    <div className='itemList'>
      {itens.map(item => (
          <ItemCard
              key={item.id}
              item={item}
          />
      ))}
    </div>
  );
}

export default ItemList;