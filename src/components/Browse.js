import Header from "./Header";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import Main from "./Main";
import Footer from "./Footer";
import loading from "../assets/loading1.gif";
import { useFilms } from "../common/context/Films";

function Browse() {
    const { list, heroFilm } = useFilms();
	const [headerActive, setHeaderActive] = useState(false);

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

export default Browse;
