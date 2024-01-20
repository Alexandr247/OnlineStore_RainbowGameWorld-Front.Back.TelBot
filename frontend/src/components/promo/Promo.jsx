import React from 'react';

import promoImg from './../../img/images/promo-img.png';
import qrImg from './../../img/socials/qr-kode.jpg';

import './promo.scss';

const Promo = () => {
    return (
        <section className='promo'>
            <div className="promo__content">

                <div className="promo__text">
                    <div className="promo__title">Rainbow game world </div>
                    <div className="promo__desc">магазин дитячих іграшок</div>
                    <div className='promo__btn'>
                        <a href="https://t.me/RainbowGameWorldTelegramBot" target="_blank">переходь у наш телеграм</a>
                    </div>
                    <div className="promo__qr-kode">
                        <a href="https://t.me/RainbowGameWorldTelegramBot" target="_blank">
                            <img src={qrImg} alt="Qr-kode" />
                        </a>
                    </div>
                </div>

                <div className="promo__img">
                    <img src={promoImg} alt="Promo" />
                </div>
            </div>
        </section>
    );
};

export default Promo;