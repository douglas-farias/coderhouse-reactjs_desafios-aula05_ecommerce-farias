import './style.css'
import ItemCount from '../ItemCount';

function ItemListContainer({ greeting, estoque, contador, adicionar, subtrair }) {
    return(
        <>
            <div className='itemListContainer'>
                <h2>{ greeting }</h2>
            </div>
            <div className='produtoContainer'>
                <figure>
                    <img src="/produto01-1.png" alt="Imagem do produto" />
                </figure>
                <h2>PRODUTO</h2>
                <span>R$ 9,90</span>
                <ItemCount estoque={estoque} contador={contador} adicionar={adicionar} subtrair={subtrair} />
            </div>
        </>
    );
}

export default ItemListContainer;