import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: "популярности",
		sortProperty: "rating",
	});

	useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sortType.sortProperty.replace("-", "");
		const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

		fetch(
			`https://62d467c6cd960e45d457c0a7.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
		)
			.then((res) => {
				return res.json();
			})
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
		// следи за переменной categoryId, если она поменяется в этом случае делай запрос на бекенд
	}, [categoryId, sortType]);

	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(id) => setCategoryId(id)}
				/>
				<Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((item, index) => (
							<Skeleton key={index} />
					  ))
					: items.map((obj, index) => (
							<PizzaBlock key={index} {...obj} />
					  ))}
			</div>
		</>
	);
};

export default Home;
