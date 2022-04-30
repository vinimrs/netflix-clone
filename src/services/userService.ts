import { NextPageContext } from 'next';
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
    async deleteUser(userId: string, ctx: NextPageContext = null) {
        const token = tokenService.get(ctx);

        return await HttpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                refresh: true,
            }
        );
    },

    async createNewProfile(
        slug: string,
        name: string,
        preference: string[],
        image_id: string,
        user_id: string,
        ctx: NextPageContext = null
    ) {
        const token = tokenService.get(ctx);

        try {
            const response = await HttpClient(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-profile/${user_id}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        slug,
                        name,
                        image_id,
                        preference,
                    },
                    refresh: true,
                }
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteUserProfile(
        slug: string,
        userId: string,
        ctx: NextPageContext = null
    ) {
        const token = tokenService.get(ctx);

        try {
            const response = await HttpClient(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-profile/${userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        slug,
                    },
                    refresh: true,
                }
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
        ctx: NextPageContext = null
    ) {
        const token = tokenService.get(ctx);
        try {
            const response = await HttpClient(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-profile/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        slug,
                        name,
                        preference,
                        image,
                        index,
                    },
                    refresh: true,
                }
            );
            return response;
        } catch (error) {
            console.log(error.message);
        }
    },
};
