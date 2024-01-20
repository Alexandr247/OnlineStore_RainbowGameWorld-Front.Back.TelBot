import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import rainbowImg from '../../img/icons/rainbow.svg';

import './register.scss';

const Register = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4444/auth/register', formData);
            console.log(response.data);
            setIsLoggedIn(true);
            navigate('/');

        } catch (error) {
            setError('Пароль должен содержать минимум 5 символов');
            console.error('Ошибка при регистрации:', error);
        };
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="register">
            <div className="container">
                <div className="register__content">
                    <div className="register__title">
                        <img src={rainbowImg} alt="Rainbow" />
                        <span>Реєстрація</span>
                        <img src={rainbowImg} alt="Rainbow" />
                    </div>
                    <div className="register__form-btn">
                        <div className="register__form">

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Повне ім'я"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Пароль"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="register__error-message">{error}</div>

                                <div className="register__btn">
                                    <button type="submit">Зареєструватися</button>
                                </div>

                                {isLoggedIn ? (
                                    <div className="register__successful-entry">
                                        <p type="submit">Ви успішно зареєструвалися</p>
                                    </div>
                                ) : (
                                    <></>
                                )}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;