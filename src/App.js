import Header from "./components/Header";
import {  useContext, useEffect, useState } from "react";
import GlobalStyle from "./GlobalStyle";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";
import loading from "./assets/loading1.gif";
import { FilmsContext } from "./common/context/Films";

function App() {
    const { list, heroFilm } = useContext(FilmsContext);
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
