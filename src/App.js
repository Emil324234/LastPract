import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Basket from './pages/Basket';
import Mebels from './pages/Mebels';
import StoreProvider from './context/StoreContext';

class App extends React.Component{
render(){
  return(
    <StoreProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Basket />} />
            <Route path="/mebel/:id" element={<Mebels />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </StoreProvider>
  )
}
}

export default App;
