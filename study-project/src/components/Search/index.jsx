import React, { useCallback, useContext, useRef, useState } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";

const Search = () => {
	// один стейт - у нас будет локально хранится searchValue
	const [value, setValue] = useState("");

	const { searchValue, setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	// Реакт сохрани ссылку на функцию с помощью useCallback

	const onClickClear = () => {
		setSearchValue("");
		setValue("");
		inputRef.current.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 1000),
		[]
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title />
				<g id="search">
					<path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
				</g>
			</svg>
			{/* useRef 
			наша задача получить DOM-элемент инпута */}
			<input
				ref={inputRef}
				className={styles.input}
				type="text"
				placeholder="Поиск пиццы..."
				onChange={onChangeInput}
				value={value}
			/>
			{value && (
				<svg
					onClick={() => onClickClear()}
					className={styles.clearIcon}
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title />
					<g id="cross">
						<line className="cls-1" x1="7" x2="25" y1="7" y2="25" />
						<line className="cls-1" x1="7" x2="25" y1="25" y2="7" />
					</g>
				</svg>
			)}
		</div>
	);
};

export default Search;
