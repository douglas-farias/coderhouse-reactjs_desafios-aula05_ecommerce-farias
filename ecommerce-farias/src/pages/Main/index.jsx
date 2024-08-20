import './style.css';
import { Link } from 'react-router-dom';
import ItemSlider from '../../components/ItemSlider';

function Main() {
  return (
    <main>
      <div className='conteudo'>
        <div className='conteudoTopo'>
          <div className='conteudoTopo__sup'>
            <div className='conteudoTopo__imagem'></div>
            <div className='conteudoTopo__texto'>
              <h1>HOME</h1>
              <h2>E_COMMERCE</h2>
              <p>Aqui você encontra o que precisa</p>
            </div>
          </div>
          <div className='conteudoTopo__chamado'>
            <p>Confira os nossos produtos</p>
            <img src="/Shopicons_Bold_ArrowDown.svg" alt=""/>
          </div>
        </div>
        <div className='conteudoBase'>
          <div className='conteudoCategotrias'>
            <Link to="/produtos">
              <div className='categoryCardTodos'>
                TODOS OS PRODUTOS
              </div>
            </Link>
            <Link to="/produtos/categoria-a">
              <div className='categoryCardA'>
                CATEGORIA A
              </div>
            </Link>
            <Link to="/produtos/categoria-b">
              <div className='categoryCardB'>
                CATEGORIA B
              </div>
            </Link>
            <Link to="/produtos/categoria-c">
              <div className='categoryCardC'>
                CATEGORIA C
              </div>
            </Link>
            <Link to="/produtos/categoria-d">
              <div className='categoryCardD'>
                CATEGORIA D
              </div>
            </Link>
          </div>
          <div className='conteudoSlider'>
            <div className='conteudoSliderNovidades'>
              <h1 className='conteudoSlider__titulo'>NOVIDADES</h1>
              <ItemSlider filtroSlider={'novidades'} />
            </div>
            <div className='conteudoSliderOfertas'>
              <h1 className='conteudoSlider__titulo'>OFERTAS</h1>
              <ItemSlider filtroSlider={'ofertas'} />
            </div>
          </div>
          <div className='conteudoVatagens'></div>
          <div className='conteudoSobre'></div>
        </div>
      </div>
    </main>
  );
}

export default Main;