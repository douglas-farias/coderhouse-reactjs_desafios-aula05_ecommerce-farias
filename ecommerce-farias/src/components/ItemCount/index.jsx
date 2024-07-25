import './style.css'

function ItemCount({ contador, adicionar, subtrair, estoque }) {

    return(
        <div className='itemCount'>
            <button onClick={subtrair} disabled={contador === 0}>-</button>
            <p>{ contador }</p>
            <button onClick={adicionar} disabled={contador === estoque}>+</button>
        </div>
    );
}

export default ItemCount;