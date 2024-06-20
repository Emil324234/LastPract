import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import mebel from '../data/mebel.json';
import emailjs from 'emailjs-com';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const form = useRef();
  const { favorites } = useContext(StoreContext);
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

  const sendEmail = (data, e) => {
    e.preventDefault();

    emailjs.sendForm('service_9qltc3p', 'template_8a9sfos', form.current, 'HLCGbWVH0X5lbSId8')
      .then(
        () => {
          console.log('Отправлено.');
          reset(); 
        },
        (error) => {
          console.log('Провалено.', error.text);
        },
      );
  };

  const mebelVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeInOut" } }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6, ease: "easeInOut" } }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <section>
          <h2 id="intro">Наш магазин уже более 50 лет специализируется на самой лучшей и мягкой мебели в стране. Полный список наших пушистых товаров находится в каталоге!</h2>
        </section>
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
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
        </motion.section>
        <motion.section
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <h2 id="quest">Появились вопросы? Воспользуйтесь почтой!</h2>
          <form id="forms" className="row gx-3 gy-2 align-items-center" ref={form} onSubmit={handleSubmit(sendEmail)}>
            <div className="col-sm-3">
              <label className="visually-hidden" htmlFor="specificSizeInputName">Сообщение</label>
              <textarea type="text" className="form-control" id="specificSizeInputName" {...register('message')} placeholder="Ваше сообщение" name="message" />
            </div>
            <div className="col-sm-3">
              <label className="visually-hidden" htmlFor="specificSizeInputName">Имя</label>
              <input type="text" className="form-control" id="specificSizeInputName" {...register('name')} placeholder="Ваше имя" name="user_name" />
            </div>
            <div className="col-sm-3">
              <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Почта</label>
                  <input {...register('email')} placeholder="Ваш email" name="user_email" type="text" className="form-control" id="specificSizeInputGroupUsername"/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-secondary">Отправить</button>
            </div>
          </form>
        </motion.section>
      </motion.div>
      <img id="rabbit" src="https://img.goodfon.ru/original/3840x2563/1/14/vzgliad-zaiats-krolik-mordashka-zaichik-visloukhii-seryi-div.jpg"></img>
      <p id="sofas">Наши диваны - лучшие домашние друзья!</p>
    </div>
  );
};

export default Home;
