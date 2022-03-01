import { screen, render, waitFor } from "@testing-library/react";
import { Router, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UsuarioProvider } from "../../common/context/Usuario";
import Browse from ".";
import { FilmsProvider } from "../../common/context/Films";
import avatar5 from "../../assets/avatar-5.png";
import api from "../../api/TheMb";
import userEvent from "@testing-library/user-event";

jest.mock("../../api/TheMb.js");

const resultsMocks = {
    getMovieInfo: {
        adult: false,
        backdrop_path: "/rshlQ6LfPRSWFhpGL4s5ZkIPR51.jpg",
        belongs_to_collection: null,
        budget: 40000000,
        homepage: "https://www.lionsgate.com/movies/hacksaw-ridge",
        id: 324786,
        genres: [{id: 16, name: 'Animação'}],
        imdb_id: "tt2119532",
        original_language: "en",
        original_title: "Hacksaw Ridge",
        overview:
            "Desmond T. Doss, foi o médico do Exército Americano da Segunda Guerra Mundial, que serviu durante a Batalha de Okinawa, se recusando a matar pessoas, tornando-se o primeiro homem da história americana a receber a Medalha de Honra sem disparar um tiro.",
        popularity: 405.637,
        poster_path: "/88sCL8OQMoieKpHClqRCCbcgH6w.jpg",
        release_date: "2016-10-07",
        revenue: 175302354,
        runtime: 140,
        status: "Released",
        tagline:
            "Um dos maiores heróis da história americana nunca disparou uma bala.",
        title: "Até o Último Homem",
        video: false,
        vote_average: 8.2,
        vote_count: 10629,
    },
    getMovieVideo: {
        id: 95963,
        results: [
            {
                id: "545902bbc3a36839a4001fa7",
                iso_639_1: "en",
                iso_3166_1: "US",
                key: "UoISioGH52Y",
                name: "Walking Dead Trailer 1994",
                official: false,
                published_at: "2014-11-04T15:26:07.000Z",
                site: "YouTube",
                size: 480,
                type: "Trailer",
            },
        ],
    },
    getMoviesByCategoryId: {
        results: [
            {
                adult: false,
                backdrop_path: "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                genre_ids: [28, 12, 53, 10752],
                id: 476669,
                original_language: "en",
                original_title: "The King's Man",
                overview:
                    "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                popularity: 2962.384,
                poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                release_date: "2021-12-22",
                title: "King's Man: A Origem",
                video: false,
                vote_average: 7.1,
                vote_count: 1552,
            },
        ],
    },
    getHomeList: [
        {
            slug: "trending",
            title: "Recomendados para Você",
            items: {
                results: [
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                ],
            },
        },
        {
            slug: "top-rated",
            title: "Em alta",
            items: {
                results: [
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                ],
            },
        },
        { 
            slug: "action",
            title: "Ação",
            items: {
                results: [
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                    {
                        adult: false,
                        backdrop_path:
                            "/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg",
                        genre_ids: [28, 12, 53, 10752],
                        id: 476669,
                        original_language: "en",
                        original_title: "The King's Man",
                        overview:
                            "Quando uma série dos piores tiranos e gênios do crime da história se juntam para criar uma guerra que aniquilará milhões, um homem e seu pupilo precisam correr contra o tempo para pará-los.",
                        popularity: 2962.384,
                        poster_path: "/pVL9AyKKLfUwrYD6jhdsI15gBQ7.jpg",
                        release_date: "2021-12-22",
                        title: "King's Man: A Origem",
                        video: false,
                        vote_average: 7.1,
                        vote_count: 1552,
                    },
                ],
            },
        },
    ],
};

class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = String(value);
	}

	removeItem(key) {
		delete this.store[key];
	}
}

global.localStorage = new LocalStorageMock();

const renderizaBrowse = () => {
	const history = createMemoryHistory();
	return (
		<FilmsProvider>
			<UsuarioProvider>
				<Router location={history.location} navigator={history}>
					<Routes>
						<Route path="/" element={<Browse />} />
					</Routes>
				</Router>
			</UsuarioProvider>
		</FilmsProvider>
	);
};

describe("Página de Navegação:", () => {
	describe("Quando o usuário abrir a página:", () => {
		it("mostra filme em destaque", async () => {
			api.getMovieInfo.mockResolvedValue(resultsMocks.getMovieInfo);
			api.getMovieVideo.mockResolvedValue(resultsMocks.getMovieVideo);
			api.getMoviesByCategoryId.mockResolvedValue(resultsMocks.getMoviesByCategoryId);
			api.getHomeList.mockResolvedValue(resultsMocks.getHomeList);
			localStorage.setItem(
				"usuario",
				JSON.stringify({
					slug: "quem-nunca-usa",
					name: "Quem nunca usa",
					image: avatar5,
					preference: "10752",
				})
			);
			render(renderizaBrowse());
			await waitFor(() => {
				expect(
					screen.getByTestId("hero-container")
				).toBeInTheDocument();
			});
		});

		it("mostra pelo menos 3 listas de filmes:", async () => {
			localStorage.setItem(
				"usuario",
				JSON.stringify({
					slug: "quem-nunca-usa",
					name: "Quem nunca usa",
					image: avatar5,
					preference: "10752",
				})
			);
           	api.getMovieInfo.mockResolvedValue(resultsMocks.getMovieInfo);
			api.getMovieVideo.mockResolvedValue(resultsMocks.getMovieVideo);
			api.getMoviesByCategoryId.mockResolvedValue(resultsMocks.getMoviesByCategoryId);
			api.getHomeList.mockResolvedValue(resultsMocks.getHomeList);
			render(renderizaBrowse());

			await waitFor(
				() => {
					expect(screen.getAllByTestId('list-wrapper').length).toBeGreaterThan(2);
				},
				{ interval: 500 }
			);
		});
	});
    describe('Ao clicar em algum filme da lista:', () => {
        it('abre um modal com mais informações', async () => {
            localStorage.setItem(
				"usuario",
				JSON.stringify({
					slug: "quem-nunca-usa",
					name: "Quem nunca usa",
					image: avatar5,
					preference: "10752",
				})
			); 
           	api.getMovieInfo.mockResolvedValue(resultsMocks.getMovieInfo);
			api.getMovieVideo.mockResolvedValue(resultsMocks.getMovieVideo);
			api.getMoviesByCategoryId.mockResolvedValue(resultsMocks.getMoviesByCategoryId);
			api.getHomeList.mockResolvedValue(resultsMocks.getHomeList);
			render(renderizaBrowse());
            await waitFor(
                () => {
                    expect(screen.getAllByTestId('list-wrapper').length).toBeGreaterThan(2);
                }
            );
            userEvent.click(screen.getAllByTestId('film-poster')[0])
            await waitFor(
				() => {
                    expect(screen.getByTestId('modal')).toBeInTheDocument();
				},
				{ interval: 500 }
            );
        })
    })
});
