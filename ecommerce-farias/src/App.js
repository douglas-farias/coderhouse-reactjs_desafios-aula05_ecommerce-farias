import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div>
      <NavBar/>
      <main className='conteudo'>
        <figure className='logoCentral'>
          <img src='/transparente_logo.png' alt='Logo Ecommerce' />
        </figure>
        <h3 style={{ color: '#000000', fontSize: '24px' }}>PÁGINA EM CONSTRUÇÃO</h3>
        <ItemListContainer greeting="Em breve uma variada lista de produtos!" />
      </main>
    </div>
  );
}

export default App;