import React from 'react';

function ItemCount({ contador, adicionar, subtrair, estoque }) {
    return (
        <div className='itemCountContainer'>
            <button onClick={subtrair} disabled={contador === 0}>-</button>
            <span>{contador}</span>
            <button onClick={adicionar} disabled={contador === estoque}>+</button>
        </div>
    );
}

export default ItemCount