import { createSlice } from '@reduxjs/toolkit';

const initialState = { phoneNumber: null, isAuthenticated: false };

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setPhoneNumber(state, action) {
			state.phoneNumber = action.payload;
		},
		setIsAuthenticated(state, action) {
			state.isAuthenticated = action.payload;
		},
	},
});

export const { setPhoneNumber, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
