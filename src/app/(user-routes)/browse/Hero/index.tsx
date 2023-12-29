'use client';
import * as S from './style';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Variants, motion } from 'framer-motion';
import { IMovieDataInfo } from '@types';
import { useHeroData, useWindowDimensions } from '@hooks';
import { limitedText, toHoursAndMinutes } from '@utils';

interface HeroProps {
	handleSetModal: (film: IMovieDataInfo) => void;
}

const Hero: React.FC<HeroProps> = ({ handleSetModal }) => {
	const heroData = useHeroData().getValue();
	const { width } = useWindowDimensions();

	const { heroFilm, video } = heroData;

	const variantsTitle = (titleSize: number): Variants => ({
		initial: {
			fontSize: 8 - titleSize * 0.1 + 'vw',
			lineHeight: 6 + 'vw',
			maxWidth: 50 + '%',
		},
		final: {
			fontSize: 6 - titleSize * 0.1 + 'vw',
			lineHeight: 4 + 'vw',
			maxWidth: 35 + '%',

			transition: {
				ease: 'linear',
				duration: 1,
				delay: 8,
			},
		},
	});

	const variantsDescription = (description: boolean): Variants => ({
		initial: {
			opacity: 1,
			marginBottom: 0,
		},
		final: {
			opacity: 0,
			marginBottom: description ? '-110px' : 0,

			transition: {
				ease: 'linear',
				duration: 0.6,
				delay: 8,
			},
		},
	});

	return (
		<S.HeroWrapper
			data-testid="hero-container"
			src={`https://image.tmdb.org/t/p/original${heroFilm.backdrop_path}`}
		>
			{video && (
				<iframe
					src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.key}&modestbranding=1&showinfo=0&rel=0`}
					frameBorder="0"
					allow="autoplay; encrypted-media"
					allowFullScreen
					style={{
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
					}}
					className="video"
				/>
			)}
			<div className="film-details">
				<motion.h1
					variants={
						video && heroFilm?.title ? variantsTitle(heroFilm.title.length) : {}
					}
					initial={'initial'}
					animate={'final'}
				>
					{heroFilm.title}
				</motion.h1>
				<motion.p
					variants={
						video && heroFilm?.overview
							? variantsDescription(heroFilm.overview.length > 0)
							: {}
					}
					initial={'initial'}
					animate={'final'}
				>
					{limitedText(heroFilm.overview, 'description', width)}
				</motion.p>
				<div className="buttons">
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
			</div>
		</S.HeroWrapper>
	);
};

export default Hero;

