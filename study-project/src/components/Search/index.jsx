import React, { useContext, useRef } from "react";
import { SearchContext } from "../../App";

import styles from "./Search.module.scss";

const Search = () => {
	const { searchValue, setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	const onClickClear = () => {
		setSearchValue("");
		inputRef.current.focus();
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
				onChange={(event) => setSearchValue(event.target.value)}
				value={searchValue}
			/>
			{searchValue && (
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
