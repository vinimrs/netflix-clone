import { NextPageContext } from 'next';
import { FetchEventResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';
import { HttpClient } from '../../infra/HttpClient/HttpClient';
import { tokenService } from './tokenService';

interface IUser {
    username?: string;
    email?: string;
}

interface IProfile {
    name?: string;
    image_id?: string;
    preference?: string;
}

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

    async createNewProfile(
        slug: string,
        name: string,
        preference: string,
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
        preference: string,
        image: string,
        userId: string,
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
