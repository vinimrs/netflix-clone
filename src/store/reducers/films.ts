import { createAction, createSlice } from '@reduxjs/toolkit';
import { IHeroMovieData, IMovieHomeList } from '@types';

const initialState: {
	data: {
		general: IMovieHomeList[];
		specific: IMovieHomeList[];
		hero: IHeroMovieData;
	};
	status: 'idle' | 'loading' | 'failed' | 'success';
} = {
	data: {
		general: [],
		specific: [],
		hero: {} as IHeroMovieData,
	},
	status: 'idle',
};

export const loadFilms = createAction('films/loadGeneralLists');
// export const loadEspecificLists = createAction('films/loadEspecificLists');

const filmsListSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		setFilms: (state, action) => {
			return {
				...state,
				data: action.payload,
			};
		},
		setStatus: (state, action) => {
			return {
				...state,
				status: action.payload,
			};
		},
		resetFilmsList: () => initialState,
		removeSpecificFilms: state => {
			return {
				...state,
				specific: [],
				hero: {} as IHeroMovieData,
			};
		},
	},
});

export const { resetFilmsList, removeSpecificFilms, setFilms, setStatus } =
	filmsListSlice.actions;

export default filmsListSlice.reducer;

