import { HttpClient } from '../infra/HttpClient/HttpClient';
import { IProfile } from '@types';
import { IMovieData, IMovieDataInfo, IMovieVideo } from '@types';
import { moviesGenres } from '../common/constants';

export const moviesService = {
	getHomeList: async (profile: IProfile): Promise<any[]> => {
		return await Promise.all(
			profile.preference.map(async prefId => {
				const genre = moviesGenres.find(genre => genre.id === Number(prefId));

				return {
					slug: genre.slug,
					title: genre.title,
					items: await HttpClient(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/${genre.id}`,
						{
							method: 'GET',
						}
					),
				};
			})
		);
	},
	getFixedHomeLists: async (): Promise<any[]> => [
		{
			slug: 'trending',
			title: 'Recomendados para Você',
			items: await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/trending`,
				{
					method: 'GET',
				}
			),
		},
		{
			slug: 'top-rated',
			title: 'Em alta',
			items: await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/top-rated`,
				{
					method: 'GET',
				}
			),
		},
	],
	getMovieInfo: async (id: number): Promise<IMovieDataInfo> => {
		const res = await HttpClient(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`,
			{
				method: 'GET',
			}
		);
		return await res.body;
	},
	getMovieVideos: async (id: number): Promise<IMovieVideo[]> => {
		const res = await HttpClient(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/videos/${id}`,
			{
				method: 'GET',
			}
		);
		return res.body;
	},
	getMovieListByGenre: async (genre_id: string): Promise<IMovieData[]> => {
		const res = await HttpClient(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/${genre_id}`,
			{
				method: 'GET',
			}
		);
		return await res.body;
	},
};
