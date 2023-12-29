import { IImageData, ISession } from '@types';
import { selector } from 'recoil';
import { HttpClient } from 'src/infra/HttpClient/HttpClient';
import { authService } from '../../services/auth/authService';

export const sessionSelector = selector<ISession>({
	key: 'sessionSelector',
	get: async () => {
		try {
			const res = await authService.getSession();
			return res;
		} catch (error) {
			return {} as ISession;
		}
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
