import React from 'react';

import { Link } from 'react-router-dom';

import SliderHorizontal from '../sliders/slider-horizontal-1/SliderHorizontal1';

import productJson from '../../data/products.json';

import step2KidsImg from '../../img/product/playSets/Step2-KidsPlayKitchenSet2.jpg';
import melissaDougDoctorImg from '../../img/product/playSets/Melissa&Doug-DoctorPretendPlaySet2.jpg';
import littleTikesToyImg from '../../img/product/playSets/LittleTikes-ToyGroceryStoreSet2.jpg';
import legoConstructionImg from '../../img/product/playSets/LEGO-ConstructionToySet2.jpg';
import playmobilPirateImg from '../../img/product/playSets/Playmobil-PirateAdventurePlayset2.jpg';

import './like.scss';

const Like = () => {

    const ifAvailable = productJson.playSets.map(item => (item.availability ? 'В наявності' : 'Немає в наявності'));

    const addPrice = productJson.playSets.map(item => `${item.price} грн`);

    const addPieceCounts = productJson.playSets.map(item => `${item.pieceCount} шт`);

    return (
        <section className='like'>
            <div className="container">
                <div className="like__content">

                    <div className="like__title">Вам також сподобаеться</div>

                    <div className="like__slider">
                        <SliderHorizontal startIndex={5} cards={productJson.playSets.map((item, index) => ({
                            img: [step2KidsImg, melissaDougDoctorImg, littleTikesToyImg, legoConstructionImg, playmobilPirateImg][index],
                            title: item.nameUa,
                            availabilitye: ifAvailable[index],
                            price: addPrice[index],
                            quanity: addPieceCounts[index],
                        }))} />

                    </div>

                    <div className="like__btn">
                        <Link to="/catalog"><button>Дивитися усі товари</button></Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Like;