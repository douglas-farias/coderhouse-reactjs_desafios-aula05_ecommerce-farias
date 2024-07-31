import './style.css';
import { Link } from 'react-router-dom';
import ItemSlider from '../../components/ItemSlider';
import ItemList from '../../components/ItemList';
import CategoryList from '../../components/CategoryList';

function Main() {

  return (
    <main>
      <div className='conteudo'>
        {/* <Link to='/produtos'>
          <img src='/transparente_logo.png' alt='Logo Ecommerce' />
          <h1>CONFIRA NOSSOS PRODUTOS</h1>
        </Link> */}
        <div className='conteudoTopo'>
          <div className='conteudoTopo__sup'>
            <div className='conteudoTopo__imagem'></div>
            <div className='conteudoTopo__texto'>
              <h1>HOME</h1>
              <h2>E_COMMERCE</h2>
              <p>aqui você encontra o que precisa</p>
            </div>
          </div>
          <div className='conteudoTopo__chamado'>
            <p>confira os nossos produtos</p>
            <img src="/Shopicons_Bold_ArrowDown.svg" alt="" />
          </div>
        </div>
        {/* <div className='conteudoBase'>
          <div className='conteudoCategotrias'>
            <CategoryList />
          </div>
          <div className='conteudoSlider'>
            <ItemSlider />
          </div>
          <div className='conteudoVatagens'></div>
          <div className='conteudoSobre'></div>
        </div> */}
      </div>
    </main>
  );
  
}

export default Main