import './style.css'

function ItemListContainer({ greeting }) {
    return(
        <div className='itemListContainer'>
            <h2 style={{ marginTop: '24px', fontSize: '21px' }} >{ greeting }</h2>
        </div>
    );
}

export default ItemListContainer