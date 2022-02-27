import Header from "./components/Header";
import {  useContext, useEffect, useState } from "react";
import GlobalStyle from "./GlobalStyle";
import requires from "./api/TheMb";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";
import loading from "./assets/loading1.gif";
import { FilmsContext } from "./common/context/Films";

function App() {
	// const [list, setList] = useState(null);
	// const [heroFilm, setHeroFilm] = useState(null);
	// const [filmVideo, setFilmVideo] = useState(null);
    const { list, heroFilm } = useContext(FilmsContext);
	const [headerActive, setHeaderActive] = useState(false);

	// useEffect(() => {
    //     const loadAll = async () => {
    //         const resultList = await requires.getHomeList();
    //         setList(resultList);
    //         const warFilms = resultList.filter((i) => i.slug === "war");
    //         let randomChosen = Math.floor(
    //             Math.random() * (warFilms[0].items.results.length - 1)
    //         );
    //         let chosen = warFilms[0].items.results[randomChosen];
    //         let chosenInfo = await requires.getMovieInfo(chosen.id, "movie");
    
    //         const videos = await requires.getMovieVideo(chosen.id);
    //         console.log(chosenInfo);
    //         console.log(videos.results[0]);
    //         setFilmVideo(videos.results[0]);
    //         setHeroFilm(chosenInfo);
    //     };

    //     loadAll();
	// }, []);

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
                {heroFilm && <Hero />}
                {list && <Main />}
			{(!list || !heroFilm) && (
				<div
					style={{
						position: "absolute",
						zIndex: "900",
						top: "0",
						left: "0",
						right: "0",
						bottom: "0",
						display: "flex",
						alignItems: "center",
						backgroundColor: "#000",
					}}
				>
					<img
						style={{
							width: "100vw",
						}}
						src={loading}
						alt="Animação de carregamento"
					/>
				</div>
			)}
			{list && <Footer />}
		</>
	);
}

export default App;
