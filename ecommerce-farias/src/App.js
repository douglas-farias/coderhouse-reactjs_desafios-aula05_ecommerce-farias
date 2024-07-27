import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { useState, useEffect } from 'react';

function App() {
  const [itens, setItens] = useState([]);
  const [carregamento, setCarregamento] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const produtos = [
        { id: '0001', nome: 'Produto 01', descricao: "Descrição do produto 01.", preco: 9.90, imagem: '/produto01-1.png', imagemAlt: 'Descrição da imagem 1', estoque: 15, contador: 0 },
        { id: '0002', nome: 'Produto 02', descricao: "Descrição do produto 02.", preco: 19.90, imagem: '/produto01-1.png', imagemAlt: 'Descrição da imagem 2', estoque: 20, contador: 0 },
        { id: '0003', nome: 'Produto 03', descricao: "Descrição do produto 03.", preco: 29.90, imagem: '/produto01-1.png', imagemAlt: 'Descrição da imagem 3', estoque: 25, contador: 0 },
        { id: '0004', nome: 'Produto 04', descricao: "Descrição do produto 04.", preco: 39.90, imagem: '/produto01-1.png', imagemAlt: 'Descrição da imagem 4', estoque: 30, contador: 0 }
      ];

      setItens(produtos);
      setCarregamento(false);
    }, 2000);
  }, []);

  function adicionarContador(id) {
    const novosItens = itens.map(item => {
      if (item.id === id && item.contador < item.estoque) {
        return { id: item.id, nome: item.nome, descricao: item.descricao, preco: item.preco, imagem: item.imagem, imagemAlt: item.imagemAlt, estoque: item.estoque, contador: item.contador + 1 };
      }
      return item;
    });
    setItens(novosItens);
  }

  function subtrairContador(id) {
    const novosItens = itens.map(item => {
      if (item.id === id && item.contador > 0) {
        return { id: item.id, nome: item.nome, descricao: item.descricao, preco: item.preco, imagem: item.imagem, imagemAlt: item.imagemAlt, estoque: item.estoque, contador: item.contador - 1 };
      }
      return item;
    });
    setItens(novosItens);
  }

  return (
    <div>
      <NavBar contador={itens.reduce((acc, item) => acc + item.contador, 0)} />
      <main className='conteudo'>
        {carregamento ? (
          <div className='carregamento'>
            <figure className='logoCentral'>
              <img src='/transparente_logo.png' alt='Logo Ecommerce' />
            </figure>
            <h2>Carregando a lista de produtos...</h2>
          </div>
        ) : (
          <ItemListContainer
            greeting='Em breve uma variada lista de produtos!'
            itens={itens}
            adicionar={adicionarContador}
            subtrair={subtrairContador}
          />
        )}
      </main>
    </div>
  );
}

export default App;