import Header from "./components/Header";
import { useEffect, useState } from "react";
import GlobalStyle from "./GlobalStyle";
import requires from "./api/TheMb";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
	const [list, setList] = useState([]);
	const [heroFilm, setHeroFilm] = useState(null);
	const [headerActive, setHeaderActive] = useState(false);

	useEffect(() => {
		const loadAll = async () => {
			const resultList = await requires.getHomeList();
			setList(resultList);
			const warFilms = resultList.filter((i) => i.slug === "war");
			let randomChosen = Math.floor(
				Math.random() * (warFilms[0].items.results.length - 1)
			);
			let chosen = warFilms[0].items.results[randomChosen];

			let chosenInfo;
			// switch(chosen.media_type){
			//     case 'movie':
			//         chosenInfo = await requires.getMovieInfo(chosen.id, 'movie');
			//     break;

			//     case 'tv':
			//         chosenInfo = await requires.getMovieInfo(chosen.id, 'tv');
			//     break;

			//     default:
			//         chosenInfo = chosen;
			//     break;
			// }
			chosenInfo = await requires.getMovieInfo(chosen.id, "movie");
			setHeroFilm(chosenInfo);
		};

		loadAll();
	}, []);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setHeaderActive(true);
			} else {
				setHeaderActive(false);
			}
		};

		window.addEventListener("scroll", scrollListener);
		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header scroll={headerActive} />
			{heroFilm && <Hero data={heroFilm} />}
			<Main list={list} />
			<Footer />
		</>
	);
}

export default App;
