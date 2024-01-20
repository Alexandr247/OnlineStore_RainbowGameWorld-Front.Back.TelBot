import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

import Modal from '../modal/Modal';

import logoImg from './../../img/icons/logo.jpg';
import cartImg from './../../img/icons/cart.svg';
import loginImg from './../../img/icons/login.svg';

import './header.scss';

const Header = ({ isLoggedIn, cartCount, totalPrice }) => {

    const location = useLocation();

    //* Модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className='header'>
            <div className="container">
                <div className="header_row">

                    <Link to="/">
                        <div className="header__logo">
                            <img src={logoImg} alt="Logo" />
                        </div>
                    </Link>

                    <div className="header__cart-login">

                        <Link to="/order">
                            <div className="header__cart">
                                <button><img src={cartImg} alt="Cart" /></button>
                                <span className="header__cart-price">{totalPrice} грн</span>
                                <span className="header__cart-quantity">{cartCount}</span>
                            </div>
                        </Link>

                        <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>

                        <div className="header__login">
                            {isLoggedIn ? (
                                <>
                                    <img src={loginImg} alt="Login" />
                                    <div className="header__login-register">
                                        <a>Ви увійшли в акаунт</a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img src={loginImg} alt="Login" />
                                    <div className="header__login-register">
                                        <a><Link to="/login">Вхід</Link></a>
                                        <span>|</span>
                                        <a><Link to="/register">Реестрація</Link></a>
                                    </div>
                                </>
                            )}
                        </div>
                        
                    </div>
                </div>

                <nav className='header__nav'>
                    <ul>
                        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>головна</Link></li>
                        <li><Link to="/catalog" className={location.pathname === '/catalog' ? 'active' : ''}>каталог</Link></li>
                        <li><Link to="/action" className={location.pathname === '/action' ? 'active' : ''}>акції</Link></li>
                        <li><Link to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}>контакти</Link></li>
                        <li><Link to="/aboutmore" className={location.pathname === '/aboutmore' ? 'active' : ''}>про нас</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;