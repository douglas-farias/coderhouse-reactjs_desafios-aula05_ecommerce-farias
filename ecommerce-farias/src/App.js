import './App.css';
import { useState } from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {

  const [itens, setItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  function adicionarContador(id) {
    const novosItens = itens.map(item => {
      if (item.id === id && item.contador < item.estoque) {
        return { 
          id: item.id,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          nome: item.nome,
          descricao: item.descricao,
          detalhe1: item.detalhe1,
          detalhe2: item.detalhe2,
          preco: item.preco,
          imagem: item.imagem,
          imagemAlt: item.imagemAlt,
          novidade: item.novidade,
          oferta: item.oferta,
          precoOferta: item.precoOferta,
          estoque: item.estoque,
          contador: item.contador + 1 
        };
      }
      return item;
    });
    setItens(novosItens);
  }

  function subtrairContador(id) {
    const novosItens = itens.map(item => {
      if (item.id === id && item.contador > 0) {
        return { 
          id: item.id,
          categoria: item.categoria,
          subcategoria: item.subcategoria,
          nome: item.nome,
          descricao: item.descricao,
          detalhe1: item.detalhe1,
          detalhe2: item.detalhe2,
          preco: item.preco,
          imagem: item.imagem,
          imagemAlt: item.imagemAlt,
          novidade: item.novidade,
          oferta: item.oferta,
          precoOferta: item.precoOferta,
          estoque: item.estoque,
          contador: item.contador - 1 
        };        
      }
      return item;
    });
    setItens(novosItens);
  }

  return (
    <div>
      <NavBar contador={itens.reduce((acc, item) => acc + item.contador, 0)} />
      <main className='conteudo'>
        {itemSelecionado ? (
          <ItemDetailContainer
            item={itemSelecionado}
            voltar={() => setItemSelecionado(null)}
            adicionar={adicionarContador}
            subtrair={subtrairContador}
          />
        ) : (
          <ItemListContainer
          itens={itens}
          setItens={setItens}
          selecionarItem={setItemSelecionado}
          adicionar={adicionarContador}
          subtrair={subtrairContador}
        />
        )}
      </main>
    </div>
  );
}

export default App;