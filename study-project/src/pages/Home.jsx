import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
	const dispatch = useDispatch();
	const categoryId = useSelector((state) => state.filter.categoryId);
	const sortType = useSelector((state) => state.filter.sort.sortProperty);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sortType.replace("-", "");
		const order = sortType.includes("-") ? "asc" : "desc";
		const search = searchValue ? `&search=${searchValue}` : "";

		fetch(
			`https://62d467c6cd960e45d457c0a7.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
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
	}, [categoryId, sortType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((item, index) => (
		<Skeleton key={index} />
	));

	const pizzas = items.map((obj, index) => (
		<PizzaBlock key={index} {...obj} />
	));

	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(id) => onChangeCategory(id)}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</>
	);
};

export default Home;
