import * as S from './style';
import React, { useState } from 'react';
import YouTube from 'react-youtube';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMovieDataInfo } from '@types';
import { videoOpts } from '@constants';
import { useHeroData, useWindowDimensions } from '@hooks';
import { toHoursAndMinutes } from '@utils';

interface Hero {
	handleSetModal: (film: IMovieDataInfo) => void;
}

const Hero: React.FC<Hero> = ({ handleSetModal }) => {
	const { heroFilm, video } = useHeroData().getValue();
	const { width, height } = useWindowDimensions();
	const [videoIsOpen, setVideoIsOpen] = useState(false);

	const limitedText = (text: string, type: string) => {
		const limits = {
			title: width < 1440 ? 10 : 40,
			description: width < 1440 ? 100 : 250,
		};
		return text.length > limits[type]
			? text.substring(0, limits[type]) + '...'
			: text;
	};

	const handleOnVideoEnd = () => {
		setVideoIsOpen(false);
	};

	return (
		<S.HeroWrapper
			data-testid="hero-container"
			src={`https://image.tmdb.org/t/p/original${heroFilm.backdrop_path}`}
		>
			{videoIsOpen && (
				<YouTube
					className="video"
					videoId={video.key}
					opts={videoOpts(
						width.toString(),
						height.toString(),
						width < 769 ? 1 : 0
					)}
					onReady={e => e.target.playVideo()}
					onEnd={() => handleOnVideoEnd()}
				/>
			)}
			<div className="film-details">
				<motion.h1
					animate={{
						scale: videoIsOpen ? 0.8 : 1,
						order: videoIsOpen ? 5 : 1,
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
						opacity: videoIsOpen ? 0 : 1,
						visibility: videoIsOpen ? 'hidden' : 'inherit',
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
								: heroFilm.last_air_date.substring(0, 4)}
						</span>
					)}
					{(heroFilm.runtime || heroFilm.last_air_date) && (
						<span>
							{heroFilm.runtime
								? toHoursAndMinutes(heroFilm.runtime)
								: `${heroFilm.number_of_seasons} temporada${
										heroFilm.number_of_seasons > 1 ? 's' : ''
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }`}
						</span>
					)}
				</motion.div>
				<motion.p
					animate={{
						opacity: videoIsOpen ? 0 : 1,
						visibility: videoIsOpen ? 'hidden' : 'inherit',
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
					{video && (
						<S.HeroButton
							variant={videoIsOpen ? 'secondary' : 'primary'}
							onClick={() => {
								setVideoIsOpen(!videoIsOpen);
							}}
						>
							<Image src="/play.svg" width="20px" height="20px" />
							<span>{videoIsOpen ? 'Sair' : 'Trailer'}</span>
						</S.HeroButton>
					)}
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
						opacity: videoIsOpen ? 0 : 1,
						visibility: videoIsOpen ? 'hidden' : 'inherit',
					}}
					transition={{
						ease: 'easeInOut',
						duration: 0.3,
						delay: 0.2,
					}}
				>
					|{' '}
					{heroFilm.genres.map(genre => {
						return `${genre.name} | `;
					})}
				</motion.p>
			</div>
		</S.HeroWrapper>
	);
};

export default Hero;
