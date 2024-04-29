import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import reviewReducer from './reviewsSlice';

export const store = configureStore({
	reducer: {
		products: productsReducer,
		reviews: reviewReducer,
	},
});
