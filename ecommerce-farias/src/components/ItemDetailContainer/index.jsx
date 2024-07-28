import './style.css';
import ItemDetail from '../ItemDetail';
import { useState, useEffect } from 'react';

function ItemDetailContainer({ item, voltar, adicionar, subtrair }) {
    
    const [carregamento, setCarregamento] = useState(true);
  
    useEffect(() => {
        const obterDetalhes = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(item);
                }, 2000);
            });
        };
    
        obterDetalhes().then(detalhes => {
            setCarregamento(false);
        });
    }, [item]);

    return (
        <div className='itemDetailContainer'>
            {carregamento ? (
                <div className='carregamento'>
                    <figure className='logoCentral'>
                        <img src='/transparente_logo.png' alt='Logo Ecommerce' />
                    </figure>
                    <h2>Carregando produto...</h2>
                </div>
            ) : (
                <ItemDetail
                    voltar={voltar}
                    key={item.id}
                    item={item}
                    adicionar={adicionar}
                    subtrair={subtrair}
                />
            )}          
        </div>
    );
}

export default ItemDetailContainer