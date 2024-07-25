import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { useState } from 'react';

function App() {

  const [contador, setContador] = useState(0);
  const [estoque, setEstoque] = useState(15);

  function adicionarContador() {
    if (contador < estoque) setContador(contador + 1);
  };

  function subtrairContador() {
    if (contador > 0) setContador(contador - 1);
  };
  
  return (
    <div>
      <NavBar contador={contador}/>

      <main className='conteudo'>
        <ItemListContainer greeting='Em breve uma variada lista de produtos!' estoque={estoque} contador={contador} adicionar={adicionarContador} subtrair={subtrairContador}/>
      </main>
    </div>
  );
}

export default App;