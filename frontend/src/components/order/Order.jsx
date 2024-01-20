import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import rainbowImg from '../../img/icons/rainbow.svg';
import arrowImg from '../../img/icons/arrow-down-aqua.svg';
import crossImg from '../../img/icons/cross-black.svg';

import './order.scss';

const Order = ({ decreaseCartCount, selectedProducts, setSelectedProducts, setTotalPrice }) => {

    //* Ввод контактов
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');

    const fNameSubmit = firstName.length >= 2;
    const lNameSubmit = lastName.length >= 2;
    const phoneSubmit = phone.length >= 10;
    const emailSubmit = email.length >= 9;

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

    //* Выпадающее меню
    const [selectedSorting, setSortingSelected] = useState('default');

    const handleChange = (event) => {
        setSortingSelected(event.target.value);
    };

    const sortAreaOption = [
        { value: 'default', label: 'Область' },
        { value: 'vinnytsa', label: 'Вінницька' },
        { value: 'lutsk', label: 'Волинська' },
        { value: 'dnipro', label: 'Дніпропетровська' },
        { value: 'donetsk', label: 'Донецька' },
        { value: 'zhytomyr', label: 'Житомирська' },
        { value: 'uzhhorod', label: 'Закарпатська' },
        { value: 'zaporizhzhia', label: 'Запорізька' },
        { value: 'ivano-Frankivsk', label: 'Івано-Франківська' },
        { value: 'kyiv', label: 'Київська' },
        { value: 'kropyvnytskyi', label: 'Кіровоградська' },
        { value: 'luhansk', label: 'Луганська' },
        { value: 'lviv', label: 'Львівська' },
        { value: 'mykolaiv', label: 'Миколаївська' },
        { value: 'odesa', label: 'Одеська' },
        { value: 'poltava', label: 'Полтавська' },
        { value: 'rivne', label: 'Рівненська' },
        { value: 'sums', label: 'Сумська' },
        { value: 'ternopil', label: 'Тернопільська' },
        { value: 'kharkiv', label: 'Харківська' },
        { value: 'kherson', label: 'Херсонська' },
        { value: 'khmelnysk', label: 'Хмельницька' },
        { value: 'cherkasy', label: 'Черкаська' },
        { value: 'chernihiv', label: 'Чернігівська' },
        { value: 'chernivtsi', label: 'Чернівецька' },
        { value: 'simferopol', label: 'Кримська' },
        { value: 'sevastopol', label: 'Севастопольська' },
    ];
    const sortCityOption = [
        { value: 'default', label: 'Місто' },
        { value: 'vinnytsa', label: 'Вінниця' },
        { value: 'lutsk', label: 'Луцьк' },
        { value: 'dnipro', label: 'Дніпро' },
        { value: 'donetsk', label: 'Донецьк' },
        { value: 'zhytomyr', label: 'Житомир' },
        { value: 'uzhhorod', label: 'Ужгород' },
        { value: 'zaporizhzhia', label: 'Запоріжжя' },
        { value: 'ivano-Frankivsk', label: 'Івано-Франківськ' },
        { value: 'kyiv', label: 'Київ' },
        { value: 'kropyvnytskyi', label: 'Кропивницький' },
        { value: 'luhansk', label: 'Луганськ' },
        { value: 'lviv', label: 'Львів' },
        { value: 'mykolaiv', label: 'Миколаїв' },
        { value: 'odesa', label: 'Одеса' },
        { value: 'poltava', label: 'Полтава' },
        { value: 'rivne', label: 'Рівне' },
        { value: 'sums', label: 'Суми' },
        { value: 'ternopil', label: 'Тернопіль' },
        { value: 'kharkiv', label: 'Харків' },
        { value: 'kherson', label: 'Херсон' },
        { value: 'khmelnysk', label: 'Хмельницький' },
        { value: 'cherkasy', label: 'Черкаси' },
        { value: 'chernihiv', label: 'Чернігів' },
        { value: 'chernivtsi', label: 'Чернівці' },
        { value: 'simferopol', label: 'Сімферополь' },
        { value: 'sevastopol', label: 'Севастополь' },
    ];
    const sortDepartmentsOption = [
        { value: 'default', label: 'Відділення' },
        { value: 'vinnytsa', label: '№6' },
        { value: 'lutsk', label: '№45' },
        { value: 'dnipro', label: '№13' },
        { value: 'donetsk', label: '№55' },
        { value: 'zhytomyr', label: '№28' },
        { value: 'uzhhorod', label: '№12' },
        { value: 'zaporizhzhia', label: '№27' },
        { value: 'ivano-Frankivsk', label: '№89' },
        { value: 'kyiv', label: '№11' },
        { value: 'kropyvnytskyi', label: '№68' },
        { value: 'luhansk', label: '№79' },
        { value: 'lviv', label: '№38' },
        { value: 'mykolaiv', label: '№84' },
        { value: 'odesa', label: '№46' },
        { value: 'poltava', label: '№78' },
        { value: 'rivne', label: '№92' },
        { value: 'sums', label: '№91' },
        { value: 'ternopil', label: '№73' },
        { value: 'kharkiv', label: '№23' },
        { value: 'kherson', label: '№83' },
        { value: 'khmelnysk', label: '№45' },
        { value: 'cherkasy', label: '№73' },
        { value: 'chernihiv', label: '№26' },
        { value: 'chernivtsi', label: '№74' },
        { value: 'simferopol', label: '№27' },
        { value: 'sevastopol', label: '№84' },
    ];
    const sortPostalCodeOption = [
        { value: 'default', label: 'Поштовий індекс' },
        { value: 'vinnytsa', label: '21000' },
        { value: 'lutsk', label: '43000' },
        { value: 'dnipro', label: '49000' },
        { value: 'donetsk', label: '83000' },
        { value: 'zhytomyr', label: '10000' },
        { value: 'uzhhorod', label: '89000' },
        { value: 'zaporizhzhia', label: '69000' },
        { value: 'ivano-Frankivsk', label: '76000' },
        { value: 'kyiv', label: '01000' },
        { value: 'kropyvnytskyi', label: '23000' },
        { value: 'luhansk', label: '91000' },
        { value: 'lviv', label: '79000' },
        { value: 'mykolaiv', label: '54000' },
        { value: 'odesa', label: '65000' },
        { value: 'poltava', label: '36000' },
        { value: 'rivne', label: '33000' },
        { value: 'sums', label: '40000' },
        { value: 'ternopil', label: '47000' },
        { value: 'kharkiv', label: '61000' },
        { value: 'kherson', label: '73000' },
        { value: 'khmelnysk', label: '68000' },
        { value: 'cherkasy', label: '71000' },
        { value: 'chernihiv', label: '46000' },
        { value: 'chernivtsi', label: '58000' },
        { value: 'simferopol', label: '97000' },
        { value: 'sevastopol', label: '98000' },
    ];

    //* Checkbox
    const [selectedPayment, setSelectedPayment] = useState('Готівка');

    const paymentOptions = [
        'Готівка',
        'Оплата картою',
        'Оплата картою онлайн',
    ];

    const handlePaymentChange = (payment) => {
        setSelectedPayment(payment);
    };

    //* Удалить товар
    const handleRemoveClick = nameUa => {
        setSelectedProducts(prev => prev.filter(product => product.nameUa !== nameUa))
        decreaseCartCount();
    };

    //* Общая цена
    const totalPrice = selectedProducts.reduce((total, product) => {
        return total + product.price * product.count;
    }, 0);
    setTotalPrice(totalPrice);

    //* Общее количество
    const totalCount = selectedProducts.reduce((total, product) => {
        return total + product.count;
    }, 0);

    return (
        <section className='order'>
            <div className="container">
                <div className="order__content">

                    <div className="order__title">
                        <img src={rainbowImg} alt="Rainbow" />
                        <span>Оформлення заказу</span>
                        <img src={rainbowImg} alt="Rainbow" />
                    </div>

                    <div className="order__content-left-right">

                        <div className="order__content-left">

                            <div className="order_contacts">

                                <div className="order_contacts-title">Ваші контакти</div>

                                <div className="order_contacts-form">

                                    <div className="order__fname-lname">

                                        <div className="order__input-1">
                                            <div className={`order__input-container ${firstName ? 'order__filled' : ''}`}>
                                                <input type="text" value={firstName} onChange={handleFirstNameChange} />
                                                <span>Ім’я</span>
                                            </div>
                                        </div>
                                        <div className="order__input-2">
                                            <div className={`order__input-container ${lastName ? 'order__filled' : ''}`}>
                                                <input type="text" value={lastName} onChange={handleLastNameChange} />
                                                <span>Прізвище</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order__phone-email">
                                        <div className="order__input-3">
                                            <div className={`order__input-container ${phone ? 'order__filled' : ''}`}>
                                                <input type="tel" value={phone} onChange={handlePhoneChange} />
                                                <span>Телефон</span>
                                            </div>
                                        </div>
                                        <div className="order__input-4">
                                            <div className={`order__input-container ${email ? 'order__filled' : ''}`}>
                                                <input type="email" value={email} onChange={handleEmailChange} />
                                                <span>E-mail</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order__input-5">
                                        <div className={`order__input-container ${review ? 'order__filled' : ''}`}>
                                            <textarea value={review} onChange={handleReviewChange} />
                                            <span>Коментарій</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="order_delivery">

                                <div className="order_delivery-title">Доставка</div>

                                <div className="order__sorting-area-city">
                                    <div className="order__sorting">
                                        <select value={selectedSorting} onChange={handleChange}>
                                            {sortAreaOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowImg} alt="Arrow" />
                                    </div>

                                    <div className="order__sorting">
                                        <select value={selectedSorting} onChange={handleChange}>
                                            {sortCityOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowImg} alt="Arrow" />
                                    </div>
                                </div>
                                <div className="order__sorting-depart-postal">
                                    <div className="order__sorting">
                                        <select value={selectedSorting} onChange={handleChange}>
                                            {sortDepartmentsOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowImg} alt="Arrow" />
                                    </div>

                                    <div className="order__sorting">
                                        <select value={selectedSorting} onChange={handleChange}>
                                            {sortPostalCodeOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={arrowImg} alt="Arrow" />
                                    </div>
                                </div>

                            </div>

                            <div className="order_pay">

                                <div className="order_pay-choice">
                                    <div className="order_pay-title">Оплата</div>
                                    <ul>
                                        {paymentOptions.map((paymentOptions) => (
                                            <li key={paymentOptions}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value={paymentOptions}
                                                        checked={selectedPayment === paymentOptions}
                                                        onChange={() => handlePaymentChange(paymentOptions)}
                                                        className="custom-radio"
                                                    />
                                                    {paymentOptions}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                        </div>

                        <div className="order__content-right">
                            <div className="order__content-product">

                                <div className="order__content-title">Товари у кошику</div>

                                <div className="order__content-products-del">
                                    <div className="order__content-products">

                                        {selectedProducts.length > 0 ? (
                                            selectedProducts.map(product => (
                                                <div className="order__content-name-price-count-del" key={product.nameUa}>

                                                    <div className="order__content-name-price-count">
                                                        <p>{product.nameUa}</p>

                                                        <div className="order__content-price-count">
                                                            <p>{product.price} грн</p>
                                                            <p>x{product.count}</p>
                                                        </div>
                                                    </div>

                                                    <div className="order__content-del">
                                                        <button onClick={() => handleRemoveClick(product.nameUa)}><img className="order__content-products-del" src={crossImg} alt="Cross" /></button>

                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="order__content-none">Кошик порожній</p>
                                        )}

                                    </div>
                                </div>

                                <div className="order__content-summation">

                                    <div className="order__summation-products">
                                        <p>Товарів: <span>{totalCount}</span></p>
                                    </div>

                                    <div className="order__summation-price">
                                        <p>На суму: <span>{totalPrice} грн</span></p>
                                    </div>
                                </div>

                                <div className="order__content-btn">
                                    {selectedProducts.length > 0 ? (
                                        <Link to='/thankfulness'>
                                            <button disabled={!fNameSubmit || !lNameSubmit || !phoneSubmit || !emailSubmit}>Підтвердити заказ</button>
                                        </Link>
                                    ) : (
                                        <button>Кошик порожній</button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Order;