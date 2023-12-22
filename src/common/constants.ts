import {
	FormHelperTextProps,
	InputBaseComponentProps,
	InputLabelProps,
} from '@mui/material';
import { Options } from 'react-youtube';

export const moviesGenres = [
	{
		slug: 'acao',
		title: 'Ação',
		id: 28,
	},

	{
		slug: 'animacao',
		title: 'Animação',
		id: 16,
	},

	{
		slug: 'documentario',
		title: 'Documentário',
		id: 99,
	},
	{
		slug: 'drama',
		title: 'Drama',
		id: 18,
	},
	{
		slug: 'familia',
		title: 'Família',
		id: 10751,
	},
	{
		slug: 'historia',
		title: 'História',
		id: 36,
	},
	{
		slug: 'comedia',
		title: 'Comédia',
		id: 35,
	},
	{
		slug: 'guerra',
		title: 'Guerra',
		id: 10752,
	},
	{
		slug: 'crimes',
		title: 'Crime e Investigação',
		id: 80,
	},
	{
		slug: 'musical',
		title: 'Musical',
		id: 10402,
	},
	{
		slug: 'misterio',
		title: 'Mistério',
		id: 9648,
	},
	{
		slug: 'Romance',
		title: 'Romance',
		id: 10749,
	},
	{
		slug: 'terror',
		title: 'Terror',
		id: 27,
	},
	{
		slug: 'aventura',
		title: 'Aventura',
		id: 12,
	},
];

export const regExp = {
	email:
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
	text: /^([ \u00c0-\u01ffa-zA-Z']){3,}$/,
};

export const MuiCustomInputProps: {
	formHelperText: Partial<FormHelperTextProps>;
	input: InputBaseComponentProps;
	inputLabel: Partial<InputLabelProps>;
} = {
	formHelperText: {
		style: {
			color: ' var(--red-netflix)',
			position: 'absolute',
			transform: 'translate(0px, 57px)',
		},
	},
	input: {
		style: {
			color: 'var(--white)',
		},
	},
	inputLabel: { style: { color: '#8c8c80' } },
};

export const videoOpts = (
	width: string,
	height: string,
	mute: 1 | 0,
): Options => ({
	height: height,
	width: width,
	playerVars: {
		// https://developers.google.com/youtube/player_parameters
		autoplay: 1,
		controls: 0,
		cc_load_policy: 1,
		rel: 0,
		origin: process.env.NEXT_PUBLIC_BASE_URL,
		mute: mute,
		// showinfo: 0,
	},
});
