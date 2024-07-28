import './style.css';
import { Link } from 'react-router-dom';

function Main() {

  return (
    <main>
      <div className='conteudo'>
        <Link to='/produtos'>
          <img src='/transparente_logo.png' alt='Logo Ecommerce' />
          <h1>CONFIRA NOSSOS PRODUTOS</h1>
        </Link>
      </div>
    </main>
  );
  
}

export default Main