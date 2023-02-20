import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: "популярности",
		sortProperty: "rating",
	},
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		// сохранять id нашей категории при вызове dispatch получит state и действие action с определенным типом этот тип содержит в себе какую-то команду
		// в стейт мы сохраняем то, что придет в action.payload придет объект, который будет содержать обязательно любой action содержит в себе type - какую-то команду и любую еще другую информацию которая обычно хранится в payload
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
