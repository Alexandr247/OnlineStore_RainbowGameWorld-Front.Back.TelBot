import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from './../../img/icons/logo.jpg';

import './footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__content">

                    <Link to="/">
                        <div className="footer__logo">
                            <img src={logoImg} alt="Logo" />
                        </div>
                    </Link>
                    
                    <span className='footer__copyright'>© 2023 Rainbow game world</span>

                </div>
            </div>
        </footer>
    );
};

export default Footer;