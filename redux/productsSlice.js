import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_KEY } from '../util/http';

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
	const response = await fetch(`${API_KEY}/api/Products`, {
		method: 'GET',
		headers: {
			accept: 'text/plain',
		},
	});

	return response.json();
});

export const productsSlice = createSlice({
	name: 'products',
	initialState: { isLoading: false, data: null, error: false },
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.error = true;
		});
	},
});

export default productsSlice.reducer;
