import { HttpClient } from '../../infra/HttpClient/HttpClient';

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

/*
 - Movie DB genre list
    action 28
    animated 16
    documentary 99
    drama 18
    family 10751
    fantasy 14
    history 36
    comedy 35
    war 10752
    crime 80
    music 10402
    mystery 9648
    romance 10749
    sci fi 878
    horror 27
    TV movie 10770
    thriller 53
    western 37
    adventure 12
*/

export const moviesService = {
    getHomeList: async (): Promise<IMovieHomeList[]> => {
        return [
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
            {
                slug: 'action',
                title: 'Ação',
                items: await HttpClient(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/28`,
                    {
                        method: 'GET',
                    }
                ),
            },
            {
                slug: 'war',
                title: 'Guerra',
                items: await HttpClient(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/10752`,
                    {
                        method: 'GET',
                    }
                ),
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await HttpClient(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/99`,
                    {
                        method: 'GET',
                    }
                ),
            },

            {
                slug: 'comedy',
                title: 'Comédia',
                items: await HttpClient(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/35`,
                    {
                        method: 'GET',
                    }
                ),
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await HttpClient(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/10749`,
                    {
                        method: 'GET',
                    }
                ),
            },
            {
                slug: 'crime',
                title: 'Crimes e Investigação',
                items: await HttpClient(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/80`,
                    {
                        method: 'GET',
                    }
                ),
            },
        ];
    },
    getMovieInfo: async (id: number): Promise<IMovieDataInfo> => {
        return await HttpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`,
            {
                method: 'GET',
            }
        );
    },
    getMovieVideos: async (id: number): Promise<IMovieVideo[]> => {
        return await HttpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/videos/${id}`,
            {
                method: 'GET',
            }
        );
    },
    getMovieListByGenre: async (genre_id: number): Promise<IMovieData[]> => {
        const res = await HttpClient(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/genre/${genre_id}`,
            {
                method: 'GET',
            }
        );
        return await res.body;
    },
};
