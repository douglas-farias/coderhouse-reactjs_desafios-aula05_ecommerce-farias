import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Main from '../pages/Main';
import ItemListContainer from '../pages/ItemListContainer';
import ItemDetailContainer from '../pages/ItemDetailContainer';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/produtos" element={<ItemListContainer />} />
      <Route path="/produto/:id" element={<ItemDetailContainer />} />
    </Routes>
  );
}

export default Router