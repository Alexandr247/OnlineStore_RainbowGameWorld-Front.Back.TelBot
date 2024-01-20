import React, { useEffect } from 'react';

import rainbowImg from '../../img/icons/rainbow.svg';

import './aboutMore.scss';

const AboutMore = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className='aboutMore'>
            <div className="container">
                <div className="aboutMore__content">


                    <div className="aboutMore__title">
                        <img src={rainbowImg} alt="Rainbow" />
                        <span>Про нас</span>
                        <img src={rainbowImg} alt="Rainbow" />
                    </div>


                    <div className="aboutMore__text">
                        <p><span>Rainbow game world</span> — молодий магазин, який з’явився на у 2023 році. Ми не боїмось труднощів і викликів. Тому навіть складний період, не став на заваді успішному старту.</p>
                        <p>Отже, <span>ми - творчі, ми - веселі</span>, ми - ті, що даруємо радість та розвагу для дітей різного віку.</p>
                        <p><span>Наші цінності:</span> Для нас важлива ваша довіра та задоволення від покупок. Ми завжди готові допомогти вам знайти найкращі іграшки для ваших дітей.</p>
                        <p><span>Наша місія:</span> Ми присвячені тому, щоб ваші діти росли щасливими та розвинутими. Наші товари допомагають підвищувати творчість, логіку та сприяють здоровому способу життя.</p>
                    </div>

                    <div className="aboutMore__list-header">

                        <div className="aboutMore__header">Наш асортимент:</div>

                        <div className="aboutMore__list">
                            <ul>
                                <li className='list-item'>🔧 Конструктори</li>
                                <li className='list-item'>🏰 Ігрові набори</li>
                                <li className='list-item'>📚 Дитячі книги</li>
                                <li className='list-item'>🧸 М'які іграшки</li>
                                <li className='list-item'>🧩 Ігри та головоломки</li>
                                <li className='list-item'>🚴 Активні ігри</li>
                                <li className='list-item'>🧠 Розвиваючі ігри</li>
                                <li className='list-item'>🛍️ Аксесуари та додаткові товари</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutMore;