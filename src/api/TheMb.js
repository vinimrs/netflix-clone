const API_KEY = 'f78d48e91b04c7c7044167bf39261103';
const BASE_URL = 'https://api.themoviedb.org/3';

/*
- recomendados (trending)
- em alta (top rated)
- ação
- guerra
- documentário
*/  

const basicFetch = async (endpoint) => {
    const resp = await fetch(`${BASE_URL}${endpoint}`);
    const conv = await resp.json();
    return conv;
}

const requires = {
    getHomeList: async () => {
        return [
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'top-rated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=12`)
            },
            {
                slug: 'war',
                title: 'Guerra',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=10752`)

            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=99`)

            },

            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=35`)
            },
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv': 
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);

                break;

                default:
                
                break;
            }
        }

        return info;
    },
    getMovieVideo: async (movieId) => {
        let info = await basicFetch(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
        return info;
    },
    getMoviesByCategoryId: async (id) => {
        let info = await basicFetch(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${id}`);
        return info;
    },
};

export default requires;