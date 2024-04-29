import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import reviewReducer from './reviewsSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		products: productsReducer,
		reviews: reviewReducer,
		user: userReducer,
	},
});
