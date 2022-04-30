import { HttpClient } from '../infra/HttpClient/HttpClient';
import { IProfile } from './auth/authService';

export interface IMovieData {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface IMovieDataInfo extends IMovieData {
    belong_to_collection?: null | string;
    budget?: number;
    genre?: { id?: number; name?: string }[];
    homepage?: string;
    imdb_id?: string;
    production_companies?: {
        id?: number;
        logo_path?: string;
        name?: string;
        origin_coutry?: string;
    }[];
    production_countries?: { iso_3166_1?: string; name?: string }[];
    revenue?: number;
    runtime?: number;
    last_air_date?: string;
    number_of_seasons?: number;
    spoken_languages?: {
        english_name?: string;
        iso_639_1?: string;
        name?: string;
    }[];
    status?: string;
    tagline?: string;
}

export interface IMovieVideo {
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    key?: string;
    site?: string;
    size?: number;
    type?: string;
    official?: string;
    published_at?: string;
    id?: string;
}

export interface IMovieHomeList {
    slug: string;
    title: string;
    items: IMovieData[];
}

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

export const moviesService = {
    getHomeList: async (profile: IProfile): Promise<any[]> => {
        return await Promise.all(
            profile.preference.map(async prefId => {
                const genre = moviesGenres.find(
                    genre => genre.id === Number(prefId)
                );

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
