import React from 'react';

import { Link } from 'react-router-dom';

import rainbowImg from '../../img/icons/rainbow.svg';

import './thankfulness.scss';

const Thankfulness = () => {

    return (
        <section className='thankfulness'>
            <div className="container">
                <div className="thankfulness__content">

                    <div className="thankfulness__title">
                        <img src={rainbowImg} alt="Rainbow" />
                        <span>Дякуємо за заказ</span>
                        <img src={rainbowImg} alt="Rainbow" />
                    </div>

                    <div className="thankfulness__text">
                        <p>Наш менеджер зв’яжеться з вами скоро та відправить вам заказ</p>
                    </div>

                    <div className="thankfulness__btn">
                        <div className="thankfulness__btn-continue">
                            <Link to='/catalog'><button>Продовжити покупки</button></Link>
                        </div>
                        <div className="thankfulness__btn-turn">
                            <Link to='/'><button>Повернутися на головну</button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Thankfulness;