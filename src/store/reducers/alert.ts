import { createSlice } from '@reduxjs/toolkit';
import { IAlert } from '@types';

const initialState: IAlert = {
	message: '',
	severity: 'success',
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		setAlert: (state, action) => {
			return action.payload;
		},
		setSuccess: (state, { payload }) => {
			return { message: payload, severity: 'success' };
		},
		setError: (state, { payload }) => {
			return { message: payload, severity: 'error' };
		},
		resetAlert: () => initialState,
	},
});

export const { setAlert, resetAlert, setError, setSuccess } =
	alertSlice.actions;

export default alertSlice.reducer;

