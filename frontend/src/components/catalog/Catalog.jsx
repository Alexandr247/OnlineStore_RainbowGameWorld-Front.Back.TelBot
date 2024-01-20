import React, { useEffect } from 'react';

import SliderVertical from './../sliders/slider-vertical-2/SliderVertical2';

import productJson from '../../data/products.json';

import rainbowImg from '../../img/icons/rainbow.svg';

// Constructors
import legoClassicImg from '../../img/product/constructors/LEGO-LEGOClassicLargeCreativeBrickBox2.jpg';
import playmobilCityImg from '../../img/product/constructors/Playmobil-PlaymobilCityLifeModernHouse2.jpg';
import megaBloksFirstImg from '../../img/product/constructors/MegaBloks-MegaBloksFirstBuildersBigBuildingBag2.jpg';
import knexThrillImg from '../../img/product/constructors/KNEX-KNEXThrillRidesBionicBlastRollerCoasterBuildingSet2.jpg';
import magformersRainbowImg from '../../img/product/constructors/Magformers-MagformersRainbowMagneticBuildingBlocks2.jpg';

// Play Sets
import step2KidsImg from '../../img/product/playSets/Step2-KidsPlayKitchenSet2.jpg';
import melissaDougDoctorImg from '../../img/product/playSets/Melissa&Doug-DoctorPretendPlaySet2.jpg';
import littleTikesToyImg from '../../img/product/playSets/LittleTikes-ToyGroceryStoreSet2.jpg';
import legoConstructionImg from '../../img/product/playSets/LEGO-ConstructionToySet2.jpg';
import playmobilPirateImg from '../../img/product/playSets/Playmobil-PirateAdventurePlayset2.jpg';

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
import mattelUNO from '../../img/product/gamesAndPuzzles/Mattel-UNO2.jpg';
import rubiksRubiks from '../../img/product/gamesAndPuzzles/Rubiks-RubiksCube3x32.jpg';
import daysOfWonderTicket from '../../img/product/gamesAndPuzzles/DaysOfWonder-TicketToRideFirstJourney2.jpg';
import hasbroMonopoly from '../../img/product/gamesAndPuzzles/Hasbro-MonopolyJunior2.jpg';
import legoFriends from '../../img/product/gamesAndPuzzles/LEGO-LEGOFriendsCafeHeartlakeCity2.jpg';

// Active Games
import striderBicycle from '../../img/product/activeGames/Strider-Bicycle.jpg';
import razorScooter from '../../img/product/activeGames/Razor-Scooter.jpeg';
import rollerbladeRollers from '../../img/product/activeGames/Rollerblade-Rollers.jpg';
import adidasBall from '../../img/product/activeGames/Adidas-Ball.jpg';
import sportBabySports from '../../img/product/activeGames/SportBaby-SportsComplex.jpg';

// Developmental Games
import legoGroupDevelopment from '../../img/product/developmentalGames/LEGOGroup-DevelopmentConstructorLEGODuplo2.jpg';
import ravensburgerEarning from '../../img/product/developmentalGames/Ravensburger-EarningGameLogicCube2.jpg';
import hasbroPlay from '../../img/product/developmentalGames/Hasbro-PlayDohCreationKit2.jpg';
import melissaDougLearning from '../../img/product/developmentalGames/Melissa&Doug-LearningGameLettersAndNumbers2.jpg';
import discoveryKidsNature from '../../img/product/developmentalGames/DiscoveryKids-DiscoveryKidsNatureStudyKit2.jpg';

// Accessories additional Pproducts
import skipHopPuzzl from '../../img/product/accessoriesAdditionalPproducts/SkipHop-PuzzleMat.jpg';
import step2Table from '../../img/product/accessoriesAdditionalPproducts/Step2-TableChair.jpg';
import cloudBStarry from '../../img/product/accessoriesAdditionalPproducts/CloudB-StarrySkyNightLamp.jpg';
import decowallWall from '../../img/product/accessoriesAdditionalPproducts/Decowall-WallDecorationFairyTaleForest.jpg';
import ikeaToy from '../../img/product/accessoriesAdditionalPproducts/IKEA-ToyBasket.jpg';

import './catalog.scss';

const Catalog = () => {

    //* Слайдер
    const constructorImages = [legoClassicImg, playmobilCityImg, megaBloksFirstImg, knexThrillImg, magformersRainbowImg];
    const playSetsImages = [step2KidsImg, melissaDougDoctorImg, littleTikesToyImg, legoConstructionImg, playmobilPirateImg];
    const booksImages = [ababagakamagaHarry, kredoTeremok, ababagakamagaCharlie, ranokPinocchios, folioLittle];
    const softToysImages = [auroraTeddy, helloKittyPlush, disneyMickey, tyPaw, disneyElsa];
    const gamesAndPuzzlesImages = [mattelUNO, rubiksRubiks, daysOfWonderTicket, hasbroMonopoly, legoFriends];
    const activeGamesImages = [striderBicycle, razorScooter, rollerbladeRollers, adidasBall, sportBabySports];
    const developmentalgamesImages = [legoGroupDevelopment, ravensburgerEarning, hasbroPlay, melissaDougLearning, discoveryKidsNature];
    const accessoriesAdditionalPproductsImages = [skipHopPuzzl, step2Table, cloudBStarry, decowallWall, ikeaToy];

    //* Constructors
    // Создание массивов данных для каждой категории
    const constructorsData = productJson.constructors.map((item, index) => ({
        img: constructorImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Play Sets
    const playSetsData = productJson.playSets.map((item, index) => ({
        img: playSetsImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Books
    const booksData = productJson.books.map((item, index) => ({
        img: booksImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Soft Toys
    const softToysData = productJson.softToys.map((item, index) => ({
        img: softToysImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Games and Puzzles
    const gamesAndPuzzlesData = productJson.gamesAndPuzzles.map((item, index) => ({
        img: gamesAndPuzzlesImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Active Games
    const activeGamesData = productJson.activeGames.map((item, index) => ({
        img: activeGamesImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Developmental Games
    const developmentalgamesData = productJson.developmentalGames.map((item, index) => ({
        img: developmentalgamesImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    //* Accessories additional Pproducts
    const accessoriesAdditionalPproductsData = productJson.accessoriesAdditionalPproducts.map((item, index) => ({
        img: accessoriesAdditionalPproductsImages[index],
        title: item.nameUa,
        availability: item.availability ? 'В наявності' : 'Немає в наявності',
        price: `${item.price} грн`,
        quantity: `${item.pieceCount} шт`,
    }));

    const data = [
        ...constructorsData, ...playSetsData, ...booksData, ...softToysData, ...gamesAndPuzzlesData,
        ...activeGamesData, ...developmentalgamesData, ...accessoriesAdditionalPproductsData,
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className='catalog'>
            <div className="container">
                <div className="catalog__container">

                    <div className="catalog__content">

                        <div className="catalog__title">
                            <img src={rainbowImg} alt="Rainbow" />
                            <span>Каталог</span>
                            <img src={rainbowImg} alt="Rainbow" />
                        </div>

                        <div className="catalog__filter-products">
                            <div className="catalog__filter-products-content">

                                <div className="catalog__products">
                                    <div>
                                        <SliderVertical data={data} />
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

export default Catalog;