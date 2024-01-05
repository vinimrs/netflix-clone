import { HttpClient } from '../infra/HttpClient/HttpClient';
import { tokenService } from './auth/tokenService';

export const userService = {
	async registerUser(email: string, name: string, password: string) {
		return await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
			method: 'POST',
			body: {
				email,
				name,
				password,
			},
		});
	},
	async deleteUser(userId: string) {
		const { accessToken } = await tokenService.getTokens();

		return await HttpClient(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				refresh: true,
			},
		);
	},

	async createNewProfile(
		slug: string,
		name: string,
		preference: string[],
		image_id: string,
		user_id: string,
	) {
		const { accessToken } = await tokenService.getTokens();

		try {
			const response = await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-profile/${user_id}`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					body: {
						slug,
						name,
						image_id,
						preference,
					},
					refresh: true,
				},
			);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	async deleteUserProfile(slug: string, userId: string) {
		const { accessToken } = await tokenService.getTokens();

		try {
			const response = await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-profile/${userId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					body: {
						slug,
					},
					refresh: true,
				},
			);
			return response;
		} catch (error) {
			console.log(error.message);
		}
	},
	async updateUserProfile(
		slug: string,
		name: string,
		preference: string[],
		image: string,
		userId: string,
		index: string,
	) {
		const { accessToken } = await tokenService.getTokens();

		try {
			const response = await HttpClient(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-profile/${userId}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					body: {
						slug,
						name,
						preference,
						image,
						index,
					},
					refresh: true,
				},
			);
			return response;
		} catch (error) {
			console.log(error.message);
		}
	},
};
