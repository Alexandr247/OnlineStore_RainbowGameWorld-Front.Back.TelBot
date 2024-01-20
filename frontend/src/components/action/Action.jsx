import React from 'react';

import { Link } from 'react-router-dom';

import SliderHorizontal from '../sliders/slider-horizontal-1/SliderHorizontal1';

import productJson from '../../data/products.json'

import legoClassicImg from '../../img/product/constructors/LEGO-LEGOClassicLargeCreativeBrickBox2.jpg';
import playmobilCityImg from '../../img/product/constructors/Playmobil-PlaymobilCityLifeModernHouse2.jpg';
import megaBloksFirstImg from '../../img/product/constructors/MegaBloks-MegaBloksFirstBuildersBigBuildingBag2.jpg';
import knexThrillImg from '../../img/product/constructors/KNEX-KNEXThrillRidesBionicBlastRollerCoasterBuildingSet2.jpg';
import magformersRainbowImg from '../../img/product/constructors/Magformers-MagformersRainbowMagneticBuildingBlocks2.jpg';

import './action.scss';

const Action = () => {

    const ifAvailable = productJson.constructors.map(item => (item.availability ? 'В наявності' : 'Немає в наявності'))

    const addPrice = productJson.constructors.map(item => `${item.price} грн`)

    const addPieceCounts = productJson.constructors.map(item => `${item.pieceCount} шт`)

    return (
        <section className='action'>
            <div className="container">
                <div className="action__content">

                    <div className="action__title">Акції</div>

                    <div className="action__slider">
                        <SliderHorizontal startIndex={0} cards={productJson.constructors.map((item, index) => ({
                            img: [legoClassicImg, playmobilCityImg, megaBloksFirstImg, knexThrillImg, magformersRainbowImg][index],
                            title: item.nameUa,
                            availabilitye: ifAvailable[index],
                            price: addPrice[index],
                            quanity: addPieceCounts[index],
                        }))} />
                    </div>

                    <div className="action__btn">
                        <Link to="/catalog"><button>Дивитися усі товари</button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Action;