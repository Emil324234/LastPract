import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light py-4">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="nav_lc">
                <ul className="navbar-nav my-3 my-lg-0 ms-lg-3 me-auto">
                    <li className="nav-item me-4 mt-2"><a className="nav-link"><Link to="/">Главная</Link></a></li>
                    <li className="nav-item me-4 mt-2"><a className="nav-link"><Link to="/catalog">Каталог</Link></a></li>
                    <li className="nav-item me-4 mt-2"><a className="nav-link"><Link to="/cart">Корзина</Link></a></li>
                    <li className="nav-item me-4 mt-2"><a className="nav-link"><Link to="/favorites">Избранное</Link></a></li>
                </ul>
                <p id="nameMir">Мягкий мир</p>
                <img className="img-fluid" src="https://i.postimg.cc/3NDsLbKB/krol2.png" alt="https://postimg.cc/FkyL11KV" width="55px" height="55px"></img>
                <p id="labelMir">Ваша домашняя мебель</p>
               </div>
        </div>
    </nav>
  </header>
);

export default Header;
