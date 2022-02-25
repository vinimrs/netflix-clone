import React, {  useEffect, useState } from "react";
import * as S from "./style.js";
import YouTube from "react-youtube";
import { gsap, Power3 } from "gsap/all";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Play } from "../../assets/play.svg";

function Hero({ data, videoData }) {
	const [video, setVideo] = useState(false);

	const opt = {
		height: window.innerHeight,
		width: window.innerWidth - 17,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 0,
			cc_load_policy: 1,
			rel: 0,
			origin: "",
		},
	};

	const getTextLimit = () => {
		let windowWidth = window.innerWidth;
		return windowWidth > 768 ? 400 : 200;
	};

	function toHoursAndMinutes(totalMinutes) {
		const minutes = totalMinutes % 60;
		const hours = Math.floor(totalMinutes / 60);

		return `${hours < 1 ? "" : `${hours}h`}${
			minutes < 1 ? "" : `${minutes}min`
		}`;
	}

	const handleOnEnd = () => {
		handleInInfoAnimation();
		setVideo(false);
	};

	const handleOutInfoAnimation = () => {
		console.log("outanim");

		gsap.to("._filmTitle", {
			ease: Power3.easeInOut,
			fontSize: "58px",
            duration: 1,
			zIndex: -1,
		});
		gsap.to("._detailsDiv",  { 
			ease: Power3.easeInOut,
            display: 'none',
            duration: 1,
			autoAlpha: 0,
		});

		gsap.to("._filmDescription", {
			ease: Power3.easeInOut,
            display: 'none',
            duration: 1,
			autoAlpha: 0,
		});
		gsap.to("._filmGenres", {
			ease: Power3.easeInOut,
            display: 'none',
            duration: 1,
			autoAlpha: 0,
		});
	};

	const handleInInfoAnimation = () => {
		console.log("Inanim");
		gsap.to("._filmTitle", {
			duration: 0.5,
			ease: Power3.easeInOut,
			fontSize: "72px",
			y: "inherit",
		});
		gsap.to("._detailsDiv", {
			ease: Power3.easeInOut,
            display: "inherit",
            duration: .5,
			autoAlpha: 1,
		});
		gsap.to("._filmDescription", {
			duration: .5,
			ease: Power3.easeInOut,
            display: "inherit",
			autoAlpha: 1,
		});
		gsap.to("._filmGenres", {
			duration: .5,
			ease: Power3.easeInOut,
            display: "inherit",
			autoAlpha: 1,
		});
	};


	return (
		<S.HeroWrapper
			$src={
				data.backdrop_path
					? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
					: ""
			}
		>
			{video && (
				<YouTube
					className="video"
					videoId={videoData.key}
					opts={opt}
					allow="autoplay;"
					onEnd={() => handleOnEnd()}
				/>
			)}
			<S.InfoFilm className="_infoFilm">
				<S.FilmTitle className="_filmTitle" >
					{data.title ? data.title : data.name}
				</S.FilmTitle>
				<S.Details className="_detailsDiv" >
					{data.vote_average && (
						<S.DetailsText score>
							{data.vote_average} pontos
						</S.DetailsText>
					)}
					{(data.release_date || data.last_air_date) && (
						<S.DetailsText>
							{data.release_date
								? data.release_date.substring(0, 4)
								: data.last_air_date.substring(0, 4)}
						</S.DetailsText>
					)}
					{(data.runtime || data.last_air_date) && (
						<S.DetailsText>
							{data.runtime
								? toHoursAndMinutes(data.runtime)
								: `${data.number_of_seasons} temporada${
										data.number_of_seasons > 1 ? "s" : ""
								  }`}
						</S.DetailsText>
					)}
				</S.Details>
				<S.FilmText className="_filmDescription" >
					{data.overview.length > getTextLimit()
						? data.overview.substring(0, getTextLimit()) + "..."
						: data.overview}
				</S.FilmText>
				<S.ButtonsWrapper
				>
					<a href={`/watch/${data.id}`}>
						<S.HeroButton variant="primary">
							<Play />
							<S.ButtonText>Assistir</S.ButtonText>
						</S.HeroButton>
					</a>
					<a href={`/list/add/${data.id}`}>
						<S.HeroButton variant="secondary">
							<Plus />
							<S.ButtonText>Minha Lista</S.ButtonText>
						</S.HeroButton>
					</a>
					<S.HeroButton
						className="trailerButton"
						variant={video ? "secondary" : "primary"}
						disableMobile
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
				{data.genres && (
					<S.FilmText  className="_filmGenres">
						|{" "}
						{data.genres.map((genre) => {
							return `${genre.name} | `;
						})}
					</S.FilmText>
				)}
			</S.InfoFilm>
		</S.HeroWrapper>
	);
}

export default Hero;
