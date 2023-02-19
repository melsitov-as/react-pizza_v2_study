import React, { createContext, useState } from "react";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

export const SearchContext = createContext();

function App() {
	const [searchValue, setSearchValue] = useState("");

	return (
		<div className="wrapper">
			{/* - Теперь о <SearchContext.Provider> будут знать те, кто в него вложен
			- будем передавать в Provider объект, которые будет содержать значение  и функцию
			- избавляемся от пропс-дриллинга*/}
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<div className="container">
						{/* Тут динамично, будет меняться */}
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
