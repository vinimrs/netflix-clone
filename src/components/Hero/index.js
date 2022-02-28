import React, { useState } from "react";
import * as S from "./style.js";
import YouTube from "react-youtube";
import { handleInInfoAnimation, handleOutInfoAnimation } from "./style.js";
import { ReactComponent as Play } from "../../assets/play.svg";
import { useFilms } from "../../common/context/Films.js";
import useWindowDimensions from "../../common/context/WindowDimensions.js";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Hero({ setModal, minutesToHours }) {
	const { heroFilm, filmVideo } = useFilms();
	const { width, height } = useWindowDimensions();
    const [videoIsOpen, setVideoIsOpen] = useState(false);

    const videoOpts = {
		height: height,
		width: width,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 0,
			cc_load_policy: 1,
			rel: 0,
			origin: "https://netflix-clone-vinir07.vercel.app",
			muted: width < 769 ? "1" : "0",
		},
	};

    const getTextLimit = () => {
		let windowWidth = width;
		return windowWidth > 768 ? 400 : 200;
	};



	const handleOnVideoEnd = () => {
		handleInInfoAnimation();
		setVideoIsOpen(false);
	};

    console.log(heroFilm)
	return (
		<S.HeroWrapper
			$src={
				heroFilm.backdrop_path
					? `https://image.tmdb.org/t/p/original${heroFilm.backdrop_path}`
					: ""
			}
		>
			{videoIsOpen && (
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
				<S.FilmTitle className="_filmTitle">
					{heroFilm.title ? heroFilm.title : heroFilm.name}
				</S.FilmTitle>
				<S.Details className="_detailsDiv">
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
								? minutesToHours(heroFilm.runtime)
								: `${heroFilm.number_of_seasons} temporada${
										heroFilm.number_of_seasons > 1
											? "s"
											: ""
								  }`}
						</S.DetailsText>
					)}
				</S.Details>
				{heroFilm.overview && (
					<S.FilmText className="_filmDescription">
						{heroFilm.overview.length > getTextLimit()
							? heroFilm.overview.substring(0, getTextLimit()) +
							  "..."
							: heroFilm.overview}
					</S.FilmText>
				)}
				<S.ButtonsWrapper>
					{filmVideo.key && (
						<S.HeroButton
							variant={videoIsOpen ? "secondary" : "primary"}
							onClick={() => {
								if (!videoIsOpen) handleOutInfoAnimation();
								else handleInInfoAnimation();
								setVideoIsOpen(!videoIsOpen);
							}}
						>
							<Play />
							<S.ButtonText>
								{videoIsOpen ? "Sair" : "Trailer"}
							</S.ButtonText>
						</S.HeroButton>
					)}
						<S.HeroButton onClick={() => {
                                setModal(heroFilm);
                            }} variant="secondary" >
							<InfoOutlinedIcon  style={{fontSize: '30px'}}/>
							<S.ButtonText>Mais Informações</S.ButtonText>
						</S.HeroButton>
				</S.ButtonsWrapper>
				{heroFilm.genres && (
					<S.FilmText className="_filmGenres">
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
