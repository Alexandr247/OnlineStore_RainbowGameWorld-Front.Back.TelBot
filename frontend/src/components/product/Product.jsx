import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import SliderPhotos3 from '../sliders/slider-photos-3/SliderPhotos3';
import Modal from '../modal/Modal';
import productJson from '../../data/products.json'

import visaImg from './../../img/credit-card/visa.svg';
import mastercardImg from './../../img/credit-card/mastercard.svg';
import cashImg from './../../img/credit-card/cash.svg';

// Constructors
import legoClassicImg1 from '../../img/product/constructors/LEGO-LEGOClassicLargeCreativeBrickBox.jpg';
import legoClassicImg2 from '../../img/product/constructors/LEGO-LEGOClassicLargeCreativeBrickBox2.jpg';
import playmobilCityImg1 from '../../img/product/constructors/Playmobil-PlaymobilCityLifeModernHouse.jpg';
import playmobilCityImg2 from '../../img/product/constructors/Playmobil-PlaymobilCityLifeModernHouse2.jpg';
import megaBloksFirstImg1 from '../../img/product/constructors/MegaBloks-MegaBloksFirstBuildersBigBuildingBag.jpg';
import megaBloksFirstImg2 from '../../img/product/constructors/MegaBloks-MegaBloksFirstBuildersBigBuildingBag2.jpg';
import knexThrillImg1 from '../../img/product/constructors/KNEX-KNEXThrillRidesBionicBlastRollerCoasterBuildingSet.jpg';
import knexThrillImg2 from '../../img/product/constructors/KNEX-KNEXThrillRidesBionicBlastRollerCoasterBuildingSet2.jpg';
import magformersRainbowImg1 from '../../img/product/constructors/Magformers-MagformersRainbowMagneticBuildingBlocks.jpg';
import magformersRainbowImg2 from '../../img/product/constructors/Magformers-MagformersRainbowMagneticBuildingBlocks2.jpg';

// Play Sets
import step2KidsImg1 from '../../img/product/playSets/Step2-KidsPlayKitchenSet.jpg';
import step2KidsImg2 from '../../img/product/playSets/Step2-KidsPlayKitchenSet2.jpg';
import melissaDougDoctorImg1 from '../../img/product/playSets/Melissa&Doug-DoctorPretendPlaySet.jpg';
import melissaDougDoctorImg2 from '../../img/product/playSets/Melissa&Doug-DoctorPretendPlaySet2.jpg';
import littleTikesToyImg1 from '../../img/product/playSets/LittleTikes-ToyGroceryStoreSet.jpg';
import littleTikesToyImg2 from '../../img/product/playSets/LittleTikes-ToyGroceryStoreSet2.jpg';
import legoConstructionImg1 from '../../img/product/playSets/LEGO-ConstructionToySet.jpg';
import legoConstructionImg2 from '../../img/product/playSets/LEGO-ConstructionToySet2.jpg';
import playmobilPirateImg1 from '../../img/product/playSets/Playmobil-PirateAdventurePlayset.jpg';
import playmobilPirateImg2 from '../../img/product/playSets/Playmobil-PirateAdventurePlayset2.jpg';

// Books
import ababagakamagaHarry from '../../img/product/books/Ababagakamaga-HarryPotterAndThePhilosophersStone.jpg';
import kredoTeremok from '../../img/product/books/Kredo-Teremok.jpg';
import ababagakamagaCharlie from '../../img/product/books/Ababagakamaga-CharlieAndTheChocolateFactory.jpg';
import ranokPinocchios from '../../img/product/books/Ranok-PinocchiosAdventures.jpg';
import folioLittle from '../../img/product/books/Folio-TheLittlePrince.png';

// Soft Toys
import auroraTeddy from '../../img/product/softToys/AURORA-TeddyBear.jpg';
import helloKittyPlush from '../../img/product/softToys/HelloKitty-HelloKittyPlushToy.jpg';
import disneyMickey from '../../img/product/softToys/Disney-DisneysMickeyMousePlush.jpg';
import tyPaw from '../../img/product/softToys/TY-PawPatrolPlushToy.jpg';
import disneyElsa from '../../img/product/softToys/Disney-ElsaPlushDoll.jpg';

// Games and Puzzles
import mattelUNO1 from '../../img/product/gamesAndPuzzles/Mattel-UNO.jpg';
import mattelUNO2 from '../../img/product/gamesAndPuzzles/Mattel-UNO2.jpg';
import rubiksRubiks1 from '../../img/product/gamesAndPuzzles/Rubiks-RubiksCube3x3.jpg';
import rubiksRubiks2 from '../../img/product/gamesAndPuzzles/Rubiks-RubiksCube3x32.jpg';
import daysOfWonderTicket1 from '../../img/product/gamesAndPuzzles/DaysOfWonder-TicketToRideFirstJourney.jpg';
import daysOfWonderTicket2 from '../../img/product/gamesAndPuzzles/DaysOfWonder-TicketToRideFirstJourney2.jpg';
import hasbroMonopoly1 from '../../img/product/gamesAndPuzzles/Hasbro-MonopolyJunior.jpg';
import hasbroMonopoly2 from '../../img/product/gamesAndPuzzles/Hasbro-MonopolyJunior2.jpg';
import legoFriends1 from '../../img/product/gamesAndPuzzles/LEGO-LEGOFriendsCafeHeartlakeCity.jpg';
import legoFriends2 from '../../img/product/gamesAndPuzzles/LEGO-LEGOFriendsCafeHeartlakeCity2.jpg';

// Active Games
import striderBicycle from '../../img/product/activeGames/Strider-Bicycle.jpg';
import razorScooter from '../../img/product/activeGames/Razor-Scooter.jpeg';
import rollerbladeRollers from '../../img/product/activeGames/Rollerblade-Rollers.jpg';
import adidasBall from '../../img/product/activeGames/Adidas-Ball.jpg';
import sportBabySports from '../../img/product/activeGames/SportBaby-SportsComplex.jpg';

// Developmental Games
import legoGroupDevelopment1 from '../../img/product/developmentalGames/LEGOGroup-DevelopmentConstructorLEGODuplo.jpg';
import legoGroupDevelopment2 from '../../img/product/developmentalGames/LEGOGroup-DevelopmentConstructorLEGODuplo2.jpg';
import ravensburgerEarning1 from '../../img/product/developmentalGames/Ravensburger-EarningGameLogicCube.jpg';
import ravensburgerEarning2 from '../../img/product/developmentalGames/Ravensburger-EarningGameLogicCube2.jpg';
import hasbroPlay1 from '../../img/product/developmentalGames/Hasbro-PlayDohCreationKit.jpg';
import hasbroPlay2 from '../../img/product/developmentalGames/Hasbro-PlayDohCreationKit2.jpg';
import melissaDougLearning1 from '../../img/product/developmentalGames/Melissa&Doug-LearningGameLettersAndNumbers.jpg';
import melissaDougLearning2 from '../../img/product/developmentalGames/Melissa&Doug-LearningGameLettersAndNumbers2.jpg';
import discoveryKidsNature1 from '../../img/product/developmentalGames/DiscoveryKids-DiscoveryKidsNatureStudyKit.jpg';
import discoveryKidsNature2 from '../../img/product/developmentalGames/DiscoveryKids-DiscoveryKidsNatureStudyKit2.jpg';

// Accessories additional Pproducts
import skipHopPuzzl from '../../img/product/accessoriesAdditionalPproducts/SkipHop-PuzzleMat.jpg';
import step2Table from '../../img/product/accessoriesAdditionalPproducts/Step2-TableChair.jpg';
import cloudBStarry from '../../img/product/accessoriesAdditionalPproducts/CloudB-StarrySkyNightLamp.jpg';
import decowallWall from '../../img/product/accessoriesAdditionalPproducts/Decowall-WallDecorationFairyTaleForest.jpg';
import ikeaToy from '../../img/product/accessoriesAdditionalPproducts/IKEA-ToyBasket.jpg';


import './product.scss';

const Product = ({ cartCount, setCartCount, selectedProducts, setSelectedProducts }) => {

    //* Кастомные точки слайдера
    const customPaging = (i) => {
        return (
            <a>
                <img src={images[i]} alt={`Product ${i + 1}`} />
            </a>
        );
    };

    const settings = {
        customPaging: customPaging,
    };

    //* Переход между 'Опис' и 'Вiдгук'
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    //* Ввод комментария
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };


    //* Модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //* Счётчик
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 9999)
            setQuantity(prev => prev + 1);
        else
            setQuantity(quantity);
    };

    const decrement = () => {
        if (quantity > 1)
            setQuantity(prev => prev - 1);
        else
            setQuantity(quantity);
    };

    //* Xарактеристики товара
    const { productId } = useParams();

    let product;
    let images = [];

    const productsData = [
        {
            product: productJson.constructors[0],
            images: [legoClassicImg1, legoClassicImg2],
        },
        {
            product: productJson.constructors[1],
            images: [playmobilCityImg1, playmobilCityImg2],
        },
        {
            product: productJson.constructors[2],
            images: [megaBloksFirstImg1, megaBloksFirstImg2],
        },
        {
            product: productJson.constructors[3],
            images: [knexThrillImg1, knexThrillImg2],
        },
        {
            product: productJson.constructors[4],
            images: [magformersRainbowImg1, magformersRainbowImg2],
        },
        {
            product: productJson.playSets[0],
            images: [step2KidsImg1, step2KidsImg2],
        },
        {
            product: productJson.playSets[1],
            images: [melissaDougDoctorImg1, melissaDougDoctorImg2],
        },
        {
            product: productJson.playSets[2],
            images: [littleTikesToyImg1, littleTikesToyImg2],
        },
        {
            product: productJson.playSets[3],
            images: [legoConstructionImg1, legoConstructionImg2],
        },
        {
            product: productJson.playSets[4],
            images: [playmobilPirateImg1, playmobilPirateImg2],
        },
        {
            product: productJson.books[0],
            images: [ababagakamagaHarry, ababagakamagaHarry],
        },
        {
            product: productJson.books[1],
            images: [kredoTeremok, kredoTeremok],
        },
        {
            product: productJson.books[2],
            images: [ababagakamagaCharlie, ababagakamagaCharlie],
        },
        {
            product: productJson.books[3],
            images: [ranokPinocchios, ranokPinocchios],
        },
        {
            product: productJson.books[4],
            images: [folioLittle, folioLittle],
        },
        {
            product: productJson.softToys[0],
            images: [auroraTeddy, auroraTeddy],
        },
        {
            product: productJson.softToys[1],
            images: [helloKittyPlush, helloKittyPlush],
        },
        {
            product: productJson.softToys[2],
            images: [disneyMickey, disneyMickey],
        },
        {
            product: productJson.softToys[3],
            images: [tyPaw, tyPaw],
        },
        {
            product: productJson.softToys[4],
            images: [disneyElsa, disneyElsa],
        },
        {
            product: productJson.gamesAndPuzzles[0],
            images: [mattelUNO1, mattelUNO2],
        },
        {
            product: productJson.gamesAndPuzzles[1],
            images: [rubiksRubiks1, rubiksRubiks2],
        },
        {
            product: productJson.gamesAndPuzzles[2],
            images: [daysOfWonderTicket1, daysOfWonderTicket2],
        },
        {
            product: productJson.gamesAndPuzzles[3],
            images: [hasbroMonopoly1, hasbroMonopoly2],
        },
        {
            product: productJson.gamesAndPuzzles[4],
            images: [legoFriends1, legoFriends2],
        },
        {
            product: productJson.activeGames[0],
            images: [striderBicycle, striderBicycle],
        },
        {
            product: productJson.activeGames[1],
            images: [razorScooter, razorScooter],
        },
        {
            product: productJson.activeGames[2],
            images: [rollerbladeRollers, rollerbladeRollers],
        },
        {
            product: productJson.activeGames[3],
            images: [adidasBall, adidasBall],
        },
        {
            product: productJson.activeGames[4],
            images: [sportBabySports, sportBabySports],
        },
        {
            product: productJson.developmentalGames[0],
            images: [legoGroupDevelopment1, legoGroupDevelopment2],
        },
        {
            product: productJson.developmentalGames[1],
            images: [ravensburgerEarning1, ravensburgerEarning2],
        },
        {
            product: productJson.developmentalGames[2],
            images: [hasbroPlay1, hasbroPlay2],
        },
        {
            product: productJson.developmentalGames[3],
            images: [melissaDougLearning1, melissaDougLearning2],
        },
        {
            product: productJson.developmentalGames[4],
            images: [discoveryKidsNature1, discoveryKidsNature2],
        },
        {
            product: productJson.accessoriesAdditionalPproducts[0],
            images: [skipHopPuzzl, skipHopPuzzl],
        },
        {
            product: productJson.accessoriesAdditionalPproducts[1],
            images: [step2Table, step2Table],
        },
        {
            product: productJson.accessoriesAdditionalPproducts[2],
            images: [cloudBStarry, cloudBStarry],
        },
        {
            product: productJson.accessoriesAdditionalPproducts[3],
            images: [decowallWall, decowallWall],
        },
        {
            product: productJson.accessoriesAdditionalPproducts[4],
            images: [ikeaToy, ikeaToy],
        },
    ];

    const productData = productsData[productId - 1];
    if (productData) {
        product = productData.product;
        images = productData.images;
    };

    const {
        nameUa,
        availability,
        manufacturer,
        price,
        size,
        weight,
        rating,
        pieceCount,
        description,
        additionalProperties,
        kidsLike,
    } = product;

    function availabilityText(availability) {
        return availability ? 'В наявності' : 'Немає в наявності';
    };

    function ratingText(rating) {
        if (rating === 1) {
            return 'зірка';
        } else if (rating === 2 || rating === 3 || rating === 4) {
            return 'зірки';
        } else {
            return 'зірок';
        };
    };


    //* Передача х-ки продутка в order
    const handleBuyClick = () => {

        const productToAdd = {
            ...product,
            count: quantity,
        };

        const index = selectedProducts.findIndex(p => p.nameUa === product.nameUa);

        if (index !== -1) {
            const updatedProducts = [...selectedProducts];
            updatedProducts[index].count += quantity;
            setSelectedProducts(updatedProducts);

        } else {
            setCartCount(cartCount + 1);
            setSelectedProducts(prev => [...prev, productToAdd]);
        };

        setQuantity(1);

    };

    return (
        <section className='product'>
            <div className="container">
                <div className="product__container">
                    <div className="product__content">
                        <div className="product__basis">

                            <div className="product__basis-slider">
                                <SliderPhotos3
                                    {...settings}
                                    img1={images[0]} img2={images[1]}
                                    customPaging={customPaging}
                                />
                            </div>

                            <div className="product__basis-company">

                                <div className="product__title">{nameUa}</div>

                                <div className="product__stock">{availabilityText(availability)}</div>

                                <div className="product__company-delivery">

                                    <div className="product__company">
                                        <div className="product__company-title">Виробник</div>
                                        <div className="product__company-manufacturer">
                                            <div className="product__company-manufacturer-text">{manufacturer}</div>
                                        </div>
                                        <div className="product__company-pay">Оплата</div>
                                        <img src={visaImg} alt="Visa" />
                                        <img src={mastercardImg} alt="Mastercard" />
                                        <img src={cashImg} alt="Cash" />
                                    </div>

                                    <div className="product__delivery">
                                        <div className="product__company-title">Доставка</div>
                                        <p>Завтра відповідно до тарифів перевізника</p>
                                        <div className="product__phone-btn">
                                            <button>Замовити дзвінок</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="product__price-buy">

                                    <div className="product__price">{price} грн</div>

                                    <div className="product__buy-btn" onClick={openModal}>
                                        <button>Купити</button>
                                    </div>

                                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                                        <div className="modal__content-inside">
                                            <div className="modal__product-name">{nameUa}</div>
                                            <div className="modal__product">
                                                <div className="modal__img-company">
                                                    <div className="modal__img-button">
                                                        <img src={images[1]} alt="Product" />
                                                    </div>
                                                    <div className="modal__company">
                                                        <div className="modal__company-title">Виробник</div>
                                                        <div className="modal__company-manufacturer">
                                                            <div className="modal__company-manufacturer-text">{manufacturer}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal__price-quantity">
                                                    <div className="modal__price">{price} грн</div>
                                                    <div className="modal__quantity">
                                                        <p>Кількість</p>
                                                        <button onClick={decrement}>-</button>
                                                        <span>{quantity}</span>
                                                        <button onClick={increment}>+</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="modal-buttons">
                                                <Link to='/catalog'><button>Продовжити покупки</button></Link>
                                                <Link to="/order"><button onClick={handleBuyClick}>Оформити заказ</button></Link>
                                            </div>
                                        </div>
                                    </Modal>

                                </div>
                            </div>
                        </div>

                        <div className="product__description">

                            <div className="product__description-tabs">
                                <div className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
                                    onClick={() => toggleTab(1)}
                                >Опис</div>
                                <div className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
                                    onClick={() => toggleTab(2)}
                                >Відгуки</div>
                            </div>

                            <div className="product__description-content">

                                <div className={toggleState === 1 ? 'content active-content' : 'content'}>

                                    <h3>{nameUa}</h3>
                                    <p>{description}</p>

                                    <div className="product__span">
                                        {productId >= 11 && productId <= 15 ? null : (
                                            <>
                                                <p><span>Розміри: </span>{size}</p>
                                                <p><span>Вага: </span>{weight}</p>
                                            </>
                                        )}
                                        <p><span>Рейтинг: </span>{rating} {ratingText(rating)}</p>
                                        <p><span>Залишилось в наявності: </span>{pieceCount} штук</p>
                                    </div>

                                    <div className="product__character-recommend">
                                        <h3>Додаткові властивості:</h3>
                                        <p>{additionalProperties}</p>
                                        <h3>Сподобається дітям:</h3>
                                        <p>{kidsLike}</p>
                                    </div>
                                </div>

                                <div className={toggleState === 2 ? 'content active-content' : 'content'}>

                                    <div className="product__name-email">
                                        <div className="product__input-1">
                                            <div className={`input-container ${name ? 'filled' : ''}`}>
                                                <input type="text" value={name} onChange={handleNameChange} />
                                                <span>Ім’я</span>
                                            </div>
                                        </div>

                                        <div className="product__input-2">
                                            <div className={`input-container ${email ? 'filled' : ''}`}>
                                                <input type="email" value={email} onChange={handleEmailChange} />
                                                <span>Пошта</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product__input-3">
                                        <div className={`input-container ${review ? 'filled' : ''}`}>
                                            <textarea value={review} onChange={handleReviewChange} />
                                            <span>Відгук</span>
                                        </div>
                                    </div>

                                    <div className="product__feedback-btn">
                                        <button>Додати відгук</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;