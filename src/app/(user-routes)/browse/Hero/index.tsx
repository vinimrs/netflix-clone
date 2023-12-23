'use client';
import * as S from './style';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'framer-motion';
import { IMovieDataInfo } from '@types';
import { useHeroData, useWindowDimensions } from '@hooks';
import { toHoursAndMinutes } from '@utils';

interface Hero {
	handleSetModal: (film: IMovieDataInfo) => void;
}

const Hero: React.FC<Hero> = ({ handleSetModal }) => {
	const heroData = useHeroData().getValue();
	const { width } = useWindowDimensions();

	const limitedText = (text: string, type: string) => {
		const limits = {
			title: width < 1440 ? 10 : 40,
			description: width < 1440 ? 100 : 250,
		};

		if (text === undefined) return '';

		return text.length > limits[type]
			? text.substring(0, limits[type]) + '...'
			: text;
	};

	const { heroFilm, video } = heroData;

	return (
		<S.HeroWrapper
			data-testid="hero-container"
			src={`https://image.tmdb.org/t/p/original${heroFilm.backdrop_path}`}
		>
			<iframe
				src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.key}`}
				frameBorder="0"
				allow="autoplay; encrypted-media"
				allowFullScreen
				style={{
					width: '100%',
					height: '100%',
				}}
				className="video"
			/>
			<div className="film-details">
				<motion.h1
					animate={{
						scale: 1,
						order: 1,
					}}
					transition={{
						ease: 'easeInOut',
						scale: { duration: 0.6 },
						order: { duration: 0.3 },
					}}
				>
					{limitedText(heroFilm.title, 'title')}
				</motion.h1>
				<motion.div
					animate={{
						opacity: 1,
						visibility: 'inherit',
					}}
					transition={{
						ease: 'easeInOut',
						duration: 0.3,
						delay: 0.2,
					}}
				>
					<span className="score">{heroFilm.vote_average} pontos</span>
					{(heroFilm.release_date || heroFilm.last_air_date) && (
						<span>
							{heroFilm.release_date
								? heroFilm.release_date.substring(0, 4)
								: heroFilm.last_air_date!.substring(0, 4)}
						</span>
					)}
					{(heroFilm.runtime || heroFilm.last_air_date) && (
						<span>
							{heroFilm.runtime
								? toHoursAndMinutes(heroFilm.runtime)
								: `${heroFilm.number_of_seasons} temporada${
										heroFilm.number_of_seasons! > 1 ? 's' : ''
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }`}
						</span>
					)}
				</motion.div>
				<motion.p
					animate={{
						opacity: 1,
						visibility: 'inherit',
					}}
					transition={{
						ease: 'easeInOut',
						duration: 0.3,
						delay: 0.2,
					}}
				>
					{limitedText(heroFilm.overview, 'description')}
				</motion.p>
				<div className="buttons">
					{/* {video && (
						<S.HeroButton
							variant={'primary'}
							onClick={() => {
								setVideoIsOpen(!videoIsOpen);
							}}
						>
							<Image
								alt="Ícone de iniciar."
								src="/play.svg"
								width="20"
								height="20"
							/>
							<span>{videoIsOpen ? 'Sair' : 'Trailer'}</span>
						</S.HeroButton>
					)} */}
					<S.HeroButton
						onClick={() => {
							handleSetModal(heroFilm);
						}}
						variant="secondary"
					>
						<InfoOutlinedIcon />
						<span>Mais Informações</span>
					</S.HeroButton>
				</div>
				<motion.p
					animate={{
						opacity: 1,
						visibility: 'inherit',
					}}
					transition={{
						ease: 'easeInOut',
						duration: 0.3,
						delay: 0.2,
					}}
				>
					|{' '}
					{heroFilm.genres &&
						heroFilm.genres!.map(genre => {
							return `${genre.name} | `;
						})}
				</motion.p>
			</div>
		</S.HeroWrapper>
	);
};

export default Hero;
