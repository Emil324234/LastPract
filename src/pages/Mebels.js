import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { motion } from 'framer-motion';

const Mebels = () => {
  const { id } = useParams();
  const [mebel, setMebel] = useState(null);
  const { addToFavorites, addToBask } = useContext(StoreContext);

  useEffect(() => {
    const fetchMebel = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/mebel/${id}`);
        if (response.data) {
          console.log('Информация:', response.data); 
          setMebel(response.data);
        } else {
          console.error('Нет информации');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchMebel();
  }, [id]);

  if (!mebel) return <div>Загрузка...</div>;

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: '0px 0px 8px rgb(0,0,0)', transition: { yoyo: 5 } }
  };

  return (
    <div>
      <div className="card">
        <img id="cardsdet" src={mebel.src} className="card-img-top" alt={mebel.name || 'Mebel'} />
      </div>
      <h1 id="nam">{mebel.name}</h1>
      <p id="op">{mebel.description}</p>
      <motion.button
        id="bt1"
        variants={buttonVariants}
        whileHover="hover"
        className='btn btn-danger'
        onClick={() => addToFavorites(mebel)}
      >
        Добавить в избранное
      </motion.button>
      <motion.button
        id="bt2"
        variants={buttonVariants}
        whileHover="hover"
        className='btn btn-light'
        onClick={() => addToBask(mebel)}
      >
        Добавить в корзину
      </motion.button>
    </div>
  );
};

export default Mebels;
