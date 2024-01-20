import React from 'react';

import rainbowImg from '../../img/icons/rainbow.svg';
import crossImg from './../../img/icons/cross.svg';

import './modal.scss';

const Modal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null

    return (
        <section className='modal'>
            <div className="modal__content">

                <img className="modal-close-button" onClick={onClose} src={crossImg} alt="Cross" />

                <div className="modal__title">
                    <img src={rainbowImg} alt="Rainbow" />
                    <span>Кошик</span>
                    <img src={rainbowImg} alt="Rainbow" />
                </div>

                {children}

            </div>
        </section>
    );
};

export default Modal;