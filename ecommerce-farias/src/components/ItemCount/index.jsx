import React, { useState, useEffect } from 'react';

function ItemCount({ estoque, contadorInicial, quantidadeNoCarrinho, atualizacaoContador, contexto }) {
    const [contador, setContador] = useState(contadorInicial);

    useEffect(() => {
        if (typeof atualizacaoContador === 'function') {
            atualizacaoContador(contador);
        } else {
            console.warn('atualizacaoContador não é uma função');
        }
    }, [contador, atualizacaoContador]);

    const adicionar = () => {
        if (contexto === 'carrinho') {
            if (contador < estoque) {
                setContador(contador + 1);
            }
        } else {
            if (contador + quantidadeNoCarrinho < estoque) {
                setContador(contador + 1);
            }
        }
    };

    const subtrair = () => {
        if (contador > 1) {
            setContador(contador - 1);
        }
    };

    return (
        <div className='itemCountContainer'>
            <button onClick={subtrair} disabled={contador === 1}>-</button>
            <span>{contador}</span>
            <button onClick={adicionar} disabled={(contexto === 'carrinho' ? contador >= estoque : contador + quantidadeNoCarrinho >= estoque)}>+</button>
        </div>
    );
}

export default ItemCount;