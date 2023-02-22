import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// отправь запрос и верни ответ
export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzaStatus",
	async (params) => {
		const { category, sortBy, order, search, currentPage } = params;
		const { data } = await axios.get(
			`https://62d467c6cd960e45d457c0a7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

const initialState = {
	items: [],
	status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	// в exttraReducers передается какая-то логика, которая относится не к нашим обычным методам а какие-то асинхронные экшены какие-то специфичные ключи
	extraReducers: {
		// отправка запроса
		[fetchPizzas.pending]: (state) => {
			console.log("Идет отправка");
			state.status = "loading";
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			console.log(state, "ВСЕ ОК");
			state.status = "success";
			state.items = action.payload;
		},
		[fetchPizzas.rejected]: (state) => {
			console.log("Была ошибка");
			state.status = "error";
			state.items = [];
		},
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
