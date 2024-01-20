import React from 'react';

import { Link } from 'react-router-dom';

import aboutImg from './../../img/images/about-img.png';

import './about.scss';

const About = () => {

    return (
        <section className='about'>
            <div className="container">
                <div className="about__content">

                    <div className="about__img">
                        <img src={aboutImg} alt="About" />
                    </div>

                    <div className="about__text">

                        <div className="about__title">Про нас</div>
                        <div className="about__desc">
                            <p><span>Веселковий світ іграшок -</span> це інтернет-магазин, який спеціалізується на продажу дитячих іграшок. У нас великий вибір іграшок для дітей різного віку, від найменших до підлітків. Ми пропонуємо конструктори, ігрові набори, дитячі книги, м'які іграшки, ігри та головоломки, активні ігри, розвивальні ігри та аксесуари.</p>
                            <p><span>У нас ви можете купити іграшки за вигідними цінами.</span> Ми регулярно проводимо акції та знижки.</p>
                            <p>Ми також пропонуємо можливість <a href="https://t.me/RainbowGameWorldTelegramBot" target="_blank"><span>купити іграшки через наш телеграм-бот.</span></a> Це зручно і швидко.</p>
                            <p><span>Наша команда досвідчених фахівців завжди допоможе</span> вам вибрати відповідні іграшки для вашої дитини. Ми допоможемо вам знайти іграшки, які будуть цікаві та корисні вашій дитині, а також які відповідатимуть її віку та вподобанням.</p>
                            <p><span>Ми впевнені, що ви залишитеся задоволені покупками</span> у нашому інтернет-магазині. Ми дбаємо про наших клієнтів і робимо все можливе, щоб ви отримали найкращий сервіс.</p>
                        </div>

                        <div className="about__btn">
                            <Link to="/aboutmore"><button>Докладніше</button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;