import React, { useState } from 'react';

import rainbowImg from '../../img/icons/rainbow.svg';
import locationImg from '../../img/icons/location.svg';
import timeImg from '../../img/icons/time.svg';
import emailImg from '../../img/icons/email.svg';
import phoneImg from '../../img/icons/phone-brown.svg';

import './contacts.scss';

const Contacts = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    return (
        <section className='contacts'>
            <div className="container">
                <div className="contacts__content">

                    <div className="contacts__contact">

                        <div className="contacts__contact-title">
                            <img src={rainbowImg} alt="Rainbow" />
                            <span>Контакти</span>
                            <img src={rainbowImg} alt="Rainbow" />
                        </div>

                        <div className="contacts__contact-form">

                            <div className="contacts__contact-form-up">

                                <div className="contacts__form-up-location">
                                    <img src={locationImg} alt="location" />
                                    <p>Україна, Запорізька область, Запоріжжя</p>
                                </div>

                                <div className="contacts__form-up-time">
                                    <img src={timeImg} alt="time" />
                                    <div className="contacts__up-time">
                                        <p><span>Пн-Пт</span></p>
                                        <p>9.00-18.00</p>
                                    </div>
                                </div>

                                <div className="contacts__form-up-email">
                                    <img src={emailImg} alt="email" />
                                    <p>shop@ukrrainbow.com</p>
                                </div>

                            </div>

                            <div className="contacts__contac-form-text">
                                <p>Відділ продажу</p>
                                <p>Якщо Вам потрібна допомога при оформленні замовлення, консультація по використанню товарів, є питання що до Ваших замовлень звертайтеся сюди:</p>
                            </div>

                            <div className="contacts__contact-form-down">

                                <div className="contacts__form-down-time">
                                    <img src={timeImg} alt="time" />
                                    <div className="contacts__down-time">
                                        <p><span>Пн-Нд</span></p>
                                        <p>з 9-00 до 17-00</p>
                                    </div>
                                </div>

                                <div className="contacts__form-down-phone1">
                                    <img src={phoneImg} alt="phone" />
                                    <p>(050) 42-42-820
                                        (050) 42-42-824</p>
                                </div>

                                <div className="contacts__form-down-phone2">
                                    <img src={phoneImg} alt="phone" />
                                    <p>(097) 182-51-41
                                        (098) 123-70-00</p>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="contacts__write-us">

                        <div className="contacts__write-us-title">
                            <img src={rainbowImg} alt="Rainbow" />
                            <span>Напишіть нам</span>
                            <img src={rainbowImg} alt="Rainbow" />
                        </div>

                        <div className="contacts__write-us-question">
                            <p>Введіть ваші контактні дані і текст повідомлення, якщо у вас виникли питання або пропозиції, і ми найближчим часом відповімо вам.</p>
                        </div>

                        <div className="contacts__write-us-form">

                            <div className="contacts__fname-lname">
                                <div className="contacts__input-1">
                                    <div className={`contacts__input-container ${firstName ? 'contacts__filled' : ''}`}>
                                        <input type="text" value={firstName} onChange={handleFirstNameChange} />
                                        <span>Ім’я</span>
                                    </div>
                                </div>
                                <div className="contacts__input-2">
                                    <div className={`contacts__input-container ${lastName ? 'contacts__filled' : ''}`}>
                                        <input type="text" value={lastName} onChange={handleLastNameChange} />
                                        <span>Прізвище</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contacts__phone-email">
                                <div className="contacts__input-3">
                                    <div className={`contacts__input-container ${phone ? 'contacts__filled' : ''}`}>
                                        <input type="tel" value={phone} onChange={handlePhoneChange} />
                                        <span>Телефон</span>
                                    </div>
                                </div>
                                <div className="contacts__input-4">
                                    <div className={`contacts__input-container ${email ? 'contacts__filled' : ''}`}>
                                        <input type="email" value={email} onChange={handleEmailChange} />
                                        <span>E-mail</span>
                                    </div>
                                </div>
                            </div>

                            <div className="contacts__input-5">
                                <div className={`contacts__input-container ${review ? 'contacts__filled' : ''}`}>
                                    <textarea value={review} onChange={handleReviewChange} />
                                    <span>Ваше повідомлення</span>
                                </div>
                            </div>

                            <div className="contacts__feedback-btn">
                                <button>Відправити</button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contacts;