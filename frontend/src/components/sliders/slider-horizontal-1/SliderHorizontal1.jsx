import React from "react";
import Slider from "react-slick";

import Card from "./../../card/Card";

import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./sliderHorizontal1.scss";

const Arrow = ({ className, style, onClick }) => (
    <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
    />
);

const SliderHorizontal1 = ({ startIndex, cards }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        responsive: [
            {
                breakpoint: 1470,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ],
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="horizontal1-slider">
            <div className='sliders__content'>
                <Slider {...settings}>

                    {cards.map((card, index) => (
                        <Link onClick={scrollToTop} key={index} to={`/product/${startIndex + index + 1}`}>
                            <div key={index}>
                                <Card
                                    img={card.img}
                                    title={card.title}
                                    availabilitye={card.availabilitye}
                                    price={card.price}
                                    quanity={card.quanity}
                                />
                            </div>
                        </Link>
                    ))}

                </Slider>
            </div>
        </div>
    );
};

export default SliderHorizontal1;
