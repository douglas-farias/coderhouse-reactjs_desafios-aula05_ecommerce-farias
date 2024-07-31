import './App.css';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './context/CartProvider';
import NavBar from './components/NavBar';
import Router from './router';

function App() {

  return (

    <BrowserRouter>

      <CartProvider>

        <NavBar />

        <Router />

      </CartProvider>
      
    </BrowserRouter>
  );
}

export default App;
