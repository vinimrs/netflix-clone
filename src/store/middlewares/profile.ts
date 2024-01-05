import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setProfile } from '../reducers/profile';
import { removeSpecificFilms } from '../reducers/films';

export const profileListener = createListenerMiddleware();

profileListener.startListening({
	actionCreator: setProfile,
	effect: (action, { dispatch, getState }) => {
		dispatch(removeSpecificFilms({}));
		console.log('escutando set profile');
	},
});

