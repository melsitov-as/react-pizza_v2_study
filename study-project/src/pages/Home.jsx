import React, {
	useState,
	useEffect,
	useContext,
	useCallback,
	useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/Sort";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filter
	);
	const sortType = sort.sortProperty;

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const { searchValue } = useContext(SearchContext);
	const { items, status } = useSelector((state) => state.pizza);
	// const [items, setItems] = useState([]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
	useEffect(() => {
		if (window.location.search) {
			// если есть что-то, то мы будем это парсить из наших параметров и превращать это в объект
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);
			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
	}, []);

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	const getPizzas = async () => {
		// setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const sortBy = sortType.replace("-", "");
		const order = sortType.includes("-") ? "asc" : "desc";
		const search = searchValue ? `&search=${searchValue}` : "";

		// await axios
		// 	.get(
		// 		`https://62d467c6cd960e45d457c0a7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		// 	)
		// 	.then((res) => {
		// 		dispatch(setItems(res.data));
		// 		setIsLoading(false);
		// 	});
		// try {
		// 	const res = await axios.get(
		// 		`https://62d467c6cd960e45d457c0a7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		// 	);
		// 	dispatch(setItems(res.data));
		// } catch (error) {
		// 	console.log("ERROR", error);
		// } finally {
		// 	setIsLoading(false);
		// }
		try {
			dispatch(
				fetchPizzas({
					category,
					sortBy,
					order,
					search,
					currentPage,
				})
			); // одной функцией сделать запрос на бэкенд и сразу же сохранить все пиццы
		} catch (error) {
			console.log("ERROR", error);
		} finally {
			// setIsLoading(false);
		}
	};

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0);
		getPizzas();
		// if (!isSearch.current) {
		// }

		isSearch.current = false;
	}, []);
	// }, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((item, index) => (
		<Skeleton key={index} />
	));

	const pizzas = items.map((obj, index) => (
		<PizzaBlock key={obj.id} {...obj} />
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
			{status === "error" ? (
				<div className="content__error-info">
					<h2>Произошла ошибка! 😕</h2>
					<p>
						К сожалению, не удалось получить питсы. Попробуйте
						повторить попытку позже
					</p>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? skeletons : pizzas}
				</div>
			)}
			{/* <div className="content__items">
				{status === "loading" ? skeletons : pizzas}
			</div> */}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};

export default Home;
