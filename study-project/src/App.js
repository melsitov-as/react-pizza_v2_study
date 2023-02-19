import React, { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

export const SearchContext = createContext();

function App() {
	const [searchValue, setSearchValue] = useState("");
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div className="wrapper">
			<button
				aria-label="Increment value"
				onClick={() => dispatch(increment())}
			>
				Increment
			</button>
			<span>{count}</span>
			<button
				aria-label="Decrement value"
				onClick={() => dispatch(decrement())}
			>
				Decrement
			</button>

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
