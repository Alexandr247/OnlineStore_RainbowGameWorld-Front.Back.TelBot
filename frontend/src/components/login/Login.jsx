import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import rainbowImg from '../../img/icons/rainbow.svg';

import './login.scss';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [inputs, setInputs] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4444/auth/login', formData);
            console.log(response.data);
            setIsLoggedIn(true);
            navigate('/');

        } catch (error) {
            console.error('Ошибка при входе:', error);
            setInputs('Пароль должен содержать минимум 5 символов');
            navigate('/register');
        };
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="login">
            <div className="container">
                <div className="login__content">
                    <div className="inputs__message">{inputs}</div>
                    <div className="login__title">
                        <img src={rainbowImg} alt="Rainbow" />
                        <span>Вхід</span>
                        <img src={rainbowImg} alt="Rainbow" />
                    </div>
                    <div className="login__form-btn">
                        <div className="login__form">

                            <form onSubmit={handleSubmit}>
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

                                <div className="login__btn">
                                    <button type="submit">Увійти</button>
                                </div>

                                {isLoggedIn ? (
                                    <div className="login__successful-entry">
                                        <p type="submit">Ви успішно увійшли в акаунт</p>
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

export default Login;