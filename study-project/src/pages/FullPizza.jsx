import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
	const [pizza, setPizza] = useState();
	const { id } = useParams();
	// вернет функцию, которая будет позволять делать переходы
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://62d467c6cd960e45d457c0a7.mockapi.io/items/` + id
				);
				setPizza(data);
			} catch {
				// сделать переход на главную
				alert("Ошибка при получении пиццы!");
				navigate("/");
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return "Загрузка...";
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
		</div>
	);
};

export default FullPizza;
