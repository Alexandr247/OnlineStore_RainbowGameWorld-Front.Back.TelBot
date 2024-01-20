import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./sliderPhotos3.scss";

const Arrow = ({ className, style, onClick }) => (
    <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
    />
);

const SliderPhotos3 = ({ img1, img2, customPaging  }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        customPaging: customPaging,
        responsive: [
            {
                breakpoint: 1470,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
        ],
    };
   
    return (
        <div className="photos3-slider">
            <div className="container">
                <div className='sliders__content'>
                    <Slider {...settings}>
                        <div>
                            <img src={img1} />
                        </div>
                        <div>
                            <img src={img2} />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default SliderPhotos3;
