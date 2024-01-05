import { createAction, createSlice } from '@reduxjs/toolkit';
import { ISession } from '@types';

const initialState: ISession = {
	id: '',
	profiles: [],
	user: {
		email: '',
		username: '',
	},
	verifiedEmail: false,
};

export const loadSession = createAction('session/loadSession');

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSession: (state, action) => {
			return action.payload;
		},
		updateProfiles: (state, action) => {
			state.profiles = action.payload;
		},
		resetSession: () => initialState,
	},
});

export const { setSession, resetSession, updateProfiles } =
	sessionSlice.actions;

export default sessionSlice.reducer;

