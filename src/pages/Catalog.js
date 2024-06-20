import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { motion } from 'framer-motion';
import '../styles/Catalog.css';

const Catalog = () => {
  const [mebel, setMebel] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { addToFavorites, addToBask } = useContext(StoreContext);

  useEffect(() => {
    axios.get('http://localhost:3001/mebel')
      .then(response => setMebel(response.data))
      .catch(error => console.error(error));
  }, []);

  const filteredMebel = mebel.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) && 
    (category ? item.category === category : true)
  );

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  return (
    <div>
      <h1 id="catalog">Каталог</h1>
      <p id="num">В нашем каталоге вы сможете найти мебель на любой вкус! Если хотите заказать собственную мебель, непохожую на другую, звоните по номеру 8 800 555-35-35</p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={filterVariants}
      >
        <select id="categories" className='mr-4' onChange={e => setCategory(e.target.value)}>
          <option value="">Категории</option>
          <option value="sofa">Диваны</option>
          <option value="chair">Кресла</option>
          <option value="table">Столы</option>
          <option value="bed">Кровати</option>
          <option value="shelf">Шкафы</option>
          <option value="furniture">Другая мебель</option>
        </select>

        <input 
          id="inp"
          className="mb-4"
          type="text" 
          placeholder="Найти..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </motion.div>
      
      <div className='cards'>
        {filteredMebel.map(item => (
          <motion.div
            key={item.id}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="card">
              <img src={item.src} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 id="name" className="card-title"><b><Link to={`/mebel/${item.id}`}>{item.name}</Link></b></h5>
                <button id="bask" className="btn btn-light" onClick={() => addToBask(item)}>Добавить в корзину</button>
                <button id="fav" className="btn btn-danger" onClick={() => addToFavorites(item)}>❤</button>
              </div>
            </div>  
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
