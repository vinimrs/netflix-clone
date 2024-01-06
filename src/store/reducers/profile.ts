import { createSlice } from '@reduxjs/toolkit';
import { IImageData, IProfile } from '@types';

const initialState: IProfile = {
	slug: '',
	name: '',
	image: {} as IImageData,
	preference: [],
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile: (state, action) => {
			return action.payload;
		},
		changeProfile: (state, action) => {
			return action.payload;
		},
		resetProfile: () => initialState,
	},
});

export const { setProfile, resetProfile, changeProfile } = profileSlice.actions;

export default profileSlice.reducer;

