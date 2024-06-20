import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Favorites.css';

const Favorites = () => {
  const { favorites } = useContext(StoreContext);

  const productVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <div>
      <h1 id="favi">Избранное</h1>
      <div className="favorites-container">
        {favorites.map(product => (
          <motion.div
            key={product.id}
            initial="hidden"
            animate="visible"
            variants={productVariants}
          >
            <div className="card">
              <img src={product.src} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title"><b><Link to={`/mebel/${product.id}`}>{product.name}</Link></b></h5>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
