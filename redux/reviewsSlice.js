import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../util/http';

export const fetchReviews = createAsyncThunk(
	'fetchReviews',
	async (phoneNumber) => {
		const response = await fetch(
			`${API_KEY}/api/Reviews/ByPhoneNumber?phoneNumber=${phoneNumber}`,
			{
				method: 'GET',
				headers: {
					accept: 'text/plain',
				},
			}
		);

		return response.json();
	}
);

export const reviewsSlice = createSlice({
	name: 'reviews',
	initialState: { isLoading: false, data: null, error: false },
	extraReducers: (builder) => {
		builder.addCase(fetchReviews.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchReviews.rejected, (state, action) => {
			state.error = true;
		});
	},
});

export default reviewsSlice.reducer;
