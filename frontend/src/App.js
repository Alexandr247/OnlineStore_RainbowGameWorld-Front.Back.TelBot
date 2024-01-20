import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Preloader from './components/preloader/Preloader';

import Header from "./components/header/Header";


import Promo from "./components/promo/Promo";
import About from "./components/about/About";
import Action from "./components/action/Action";

import Catalog from "./components/catalog/Catalog";

import Product from "./components/product/Product";
import Like from "./components/like/Like";

import Order from './components/order/Order';

import Thankfulness from './components/thankfulness/Thankfulness';

import Contacts from './components/contacts/Contacts';

import AboutMore from './components/aboutMore/AboutMore';

import Login from "./components/login/Login";
import Register from "./components/register/Register";


import Footer from "./components/footer/Footer";

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [cartCount, setCartCount] = useState(0);

	const decreaseCartCount = () => {
		setCartCount(cartCount - 1);
	};

	const [selectedProducts, setSelectedProducts] = useState([]);

	const [totalPrice, setTotalPrice] = useState('0,0');

	return (
		<div className="App">

			<Preloader />

			<Router>

				<Header
					isLoggedIn={isLoggedIn}
					cartCount={cartCount}
					totalPrice={totalPrice}
				/>

				<Routes>
					<Route path="/" element={
						<>
							<Promo />
							<About />
							<Action />
						</>
					} />

					<Route path="/catalog" element={<Catalog />} />

					<Route path="/product/:productId" element={
						<>
							<Product
								cartCount={cartCount}
								setCartCount={setCartCount}
								selectedProducts={selectedProducts}
								setSelectedProducts={setSelectedProducts}
							/>
							<Like />
						</>
					} />

					<Route path="/order" element={
						<Order
							decreaseCartCount={decreaseCartCount}

							selectedProducts={selectedProducts}
							setSelectedProducts={setSelectedProducts}
							setTotalPrice={setTotalPrice}
						/>}
					/>

					<Route path="/thankfulness" element={<Thankfulness />} />
					<Route path="/action" element={<Action />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/aboutmore" element={<AboutMore />} />
					
					<Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
					<Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
				</Routes>

				<Footer />

			</Router>
		</div>
	);
};

export default App;