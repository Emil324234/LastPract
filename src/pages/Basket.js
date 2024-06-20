import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Basket.css';

const Basket = () => {
  const { bask, clearBask } = useContext(StoreContext);
  const totalPrice = bask.reduce((total, item) => total + item.price, 0);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  const handlePurchase = () => {
    if (bask.length === 0) {
      alert("Ваша корзина пуста. Добавьте товары для покупки.");
      return;
    }

    alert(`Покупка завершена на сумму ${totalPrice} руб.`);
    clearBask();
  };

  return (
    <div>
      <h1 id="korz">Корзина</h1>
      <div className="cards-container">
        {bask.map(mebel => (
          <motion.div
            key={mebel.id}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="card">
              <img src={mebel.src} className="card-img-top" alt={mebel.name || 'Mebel'} />
              <div className="card-body">
                <h5 className="card-title">
                  <b><Link to={`/mebel/${mebel.id}`}>{mebel.name} - {mebel.price} руб.</Link></b>
                </h5>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <h2 className="total-price">Итоговая стоимость: {totalPrice} руб.</h2>
      <button id="btnoform" className="btn btn-light" onClick={handlePurchase}>Оформить покупку</button>
    </div>
  );
};

export default Basket;
