import React from "react";
import Slider from "react-slick";

import Card from "./../../card/Card";

import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './sliderVertical2.scss';

const Arrow = ({ className, style, onClick }) => (
    <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
    />
);

const SliderVertical2 = ({ data }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        rows: 5,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    dots: false
                }
            },
        ],
    };

    return (
        <div className="vertical2-slider">
            <div className="container">
                <div className="abc__content">
                    <Slider {...settings}>
                        {data.map((item, index) => (
                            <Link key={index} to={`/product/${index + 1}`}>
                                <div key={index}>
                                    <Card
                                        img={item.img}
                                        title={item.title}
                                        availabilitye={item.availability}
                                        price={item.price}
                                        quanity={item.quantity}
                                    />
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default SliderVertical2;