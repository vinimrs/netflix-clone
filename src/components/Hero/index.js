import React, {  useContext, useState } from "react";
import * as S from "./style.js";
import YouTube from "react-youtube";
import { gsap, Power3 } from "gsap/all";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Play } from "../../assets/play.svg";
import { FilmsContext } from "../../common/context/Films.js";

function Hero() {
    const { heroFilm, filmVideo } = useContext(FilmsContext);
	const [video, setVideo] = useState(false);

	const videoOpts = {
		height: window.innerHeight,
		width: window.innerWidth,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 0,
			cc_load_policy: 1,
			rel: 0,
			origin: "https://netflix-clone-vinir07.vercel.app",
            muted: window.innerWidth < 769 ? "1" : "0",
		},
	};

	const getTextLimit = () => {
		let windowWidth = window.innerWidth;
		return windowWidth > 768 ? 400 : 200;
	};

	const toHoursAndMinutes = (totalMinutes) => {
		const minutes = totalMinutes % 60;
		const hours = Math.floor(totalMinutes / 60);

		return `${hours < 1 ? "" : `${hours}h`}${
			minutes < 1 ? "" : `${minutes}min`
		}`;
	};

	const handleOnVideoEnd = () => {
		handleInInfoAnimation();
		setVideo(false);
	};

	const handleOutInfoAnimation = () => {
		gsap.to("._filmTitle", {
			ease: Power3.easeInOut,
			fontSize: "52px",
            duration: 1,
			zIndex: -1,
		});
		gsap.to("._detailsDiv, ._filmDescription, ._filmGenres",  { 
			ease: Power3.easeInOut,
            display: 'none',
            duration: 1,
			autoAlpha: 0,
		});
	};

	const handleInInfoAnimation = () => {
		gsap.to("._filmTitle", {
			duration: 0.5,
			ease: Power3.easeInOut,
			fontSize: "72px",
			y: "inherit",
		});
		gsap.to("._detailsDiv, ._filmDescription, ._filmGenres", {
			ease: Power3.easeInOut,
            display: "inherit",
            duration: .5,
			autoAlpha: 1,
		});
	};


	return (
		<S.HeroWrapper
			$src={
				heroFilm.backdrop_path
					? `https://image.tmdb.org/t/p/original${heroFilm.backdrop_path}`
					: ""
			}
		>
			{video && (
                    <YouTube
                        className="video"
                        videoId={filmVideo.key}
                        opts={videoOpts}
                        allow="autoplay;"
                        onReady={(e) => e.target.playVideo()}
                        onEnd={() => handleOnVideoEnd()}
                    />
			)}
			<S.InfoFilm className="_infoFilm">
				<S.FilmTitle className="_filmTitle" >
					{heroFilm.title ? heroFilm.title : heroFilm.name}
				</S.FilmTitle>
				<S.Details className="_detailsDiv" >
					{heroFilm.vote_average && (
						<S.DetailsText score>
							{heroFilm.vote_average} pontos
						</S.DetailsText>
					)}
					{(heroFilm.release_date || heroFilm.last_air_date) && (
						<S.DetailsText>
							{heroFilm.release_date
								? heroFilm.release_date.substring(0, 4)
								: heroFilm.last_air_date.substring(0, 4)}
						</S.DetailsText>
					)}
					{(heroFilm.runtime || heroFilm.last_air_date) && (
						<S.DetailsText>
							{heroFilm.runtime
								? toHoursAndMinutes(heroFilm.runtime)
								: `${heroFilm.number_of_seasons} temporada${
										heroFilm.number_of_seasons > 1 ? "s" : ""
								  }`}
						</S.DetailsText>
					)}
				</S.Details>
				<S.FilmText className="_filmDescription" >
					{heroFilm.overview.length > getTextLimit()
						? heroFilm.overview.substring(0, getTextLimit()) + "..."
						: heroFilm.overview}
				</S.FilmText>
				<S.ButtonsWrapper
				>
					<a href={`/watch/${heroFilm.id}`}>
						<S.HeroButton variant="primary">
							<Play />
							<S.ButtonText>Assistir</S.ButtonText>
						</S.HeroButton>
					</a>
					<a href={`/list/add/${heroFilm.id}`}>
						<S.HeroButton variant="secondary">
							<Plus />
							<S.ButtonText>Minha Lista</S.ButtonText>
						</S.HeroButton>
					</a>
					<S.HeroButton
						variant={video ? "secondary" : "primary"}
						// disableMobile
                        onClick={() => {
							if (!video) handleOutInfoAnimation();
							else handleInInfoAnimation();
							setVideo(!video);
						}}
					>
						<Play />
						<S.ButtonText>
							{video ? "Sair" : "Trailer"}
						</S.ButtonText>
					</S.HeroButton>
				</S.ButtonsWrapper>
				{heroFilm.genres && (
					<S.FilmText  className="_filmGenres">
						|{" "}
						{heroFilm.genres.map((genre) => {
							return `${genre.name} | `;
						})}
					</S.FilmText>
				)}
			</S.InfoFilm>
		</S.HeroWrapper>
	);
}

export default Hero;