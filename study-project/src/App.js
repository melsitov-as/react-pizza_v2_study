import React, { createContext, useState } from "react";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

import { Routes, Route, Outlet } from "react-router-dom";

export const SearchContext = createContext();

// function Parent({ children }) {
// 	return (
// 		<div>
// 			<h1>Заголовок</h1>
// 			{/* Это по сути {children} и когда родительский элемент будет рендерить дочерний то дочерний элемент будет рендериться там где <Outlet/>*/}
// 			<Outlet />
// 			<h4>324235</h4>
// 		</div>
// 	);
// }

function App() {
	const [searchValue, setSearchValue] = useState("");

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<div className="container">
						{/* Тут динамично, будет меняться */}
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/cart" element={<Cart />} />
							{/* что после второго / может быть любой id */}
							<Route path="/pizza/:id" element={<FullPizza />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);

	// return (

	// 					{/* Тут динамично, будет меняться */}
	// 					<Routes>
	// 						<Route path="/" element={<MainLayout/>}>
	// 							<Route path="cart" element={<Cart />} />
	// 							{/* что после второго / может быть любой id */}
	// 							<Route path="pizza/:id" element={<FullPizza />} />
	// 							<Route path="*" element={<NotFound />} />
	// 						</Route>
	// 					</Routes>
	// );
}

export default App;
