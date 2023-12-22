import { IImageData, ISession } from '@types';
import { selector } from 'recoil';
import { HttpClient } from 'src/infra/HttpClient/HttpClient';
import { authService } from '../../services/auth/authService';

export const sessionSelector = selector<ISession>({
	key: 'sessionSelector',
	get: async () => {
		const res = await authService.getSession();
		return res;
	},
});

export const imagesSelector = selector<IImageData[]>({
	key: 'imagesSelector',
	get: async () => {
		const res = await HttpClient(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/image`,
			{
				method: 'GET',
			},
		);
		return res.body;
	},
});
