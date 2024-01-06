'use client';
import * as S from './style';
import React, { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { IMovieDataInfo } from '@types';
import { useWindowDimensions } from '@hooks';
import { limitedText } from '@utils';
import { useAppSelector } from 'src/store/hooks';
import VideoPlayer from 'src/components/VideoPlayer';

interface HeroProps {
	handleSetModal: (film: IMovieDataInfo) => void;
}

const Hero: React.FC<HeroProps> = ({ handleSetModal }) => {
	const [reverse, setReverse] = useState<boolean>(true);
	const heroData = useAppSelector(state => state.films.data.hero);
	const { width } = useWindowDimensions();

	const { heroFilm, video } = heroData;

	const variantsTitle = (titleSize: number): Variants => ({
		initial: (reverse: boolean) => {
			return {
				final: {
					fontSize: 8 - titleSize * 0.1 + 'vw',
					lineHeight: 6 + 'vw',
					maxWidth: 50 + '%',
				},
				initial: {
					fontSize: 6 - titleSize * 0.1 + 'vw',
					lineHeight: 4 + 'vw',
					maxWidth: 35 + '%',
				},
			}[reverse ? 'final' : 'initial'];
		},
		final: (reverse: boolean) => {
			return {
				initial: {
					fontSize: 8 - titleSize * 0.1 + 'vw',
					lineHeight: 6 + 'vw',
					maxWidth: 50 + '%',
				},
				final: {
					fontSize: 6 - titleSize * 0.1 + 'vw',
					lineHeight: 4 + 'vw',
					maxWidth: 35 + '%',
				},
			}[reverse ? 'initial' : 'final'];
		},
	});

	const variantsDescription = (description: boolean): Variants => ({
		initial: (reverse: boolean) => {
			return {
				final: {
					opacity: 1,
					marginBottom: 0,
				},
				initial: {
					opacity: 0,
					marginBottom: description ? '-110px' : 0,
				},
			}[reverse ? 'final' : 'initial'];
		},
		final: (reverse: boolean) => {
			return {
				initial: {
					opacity: 1,
					marginBottom: 0,
				},
				final: {
					opacity: 0,
					marginBottom: description ? '-110px' : 0,
				},
			}[reverse ? 'initial' : 'final'];
		},
	});

	return (
		<S.HeroWrapper
			data-testid="hero-container"
			src={
				heroFilm?.backdrop_path
					? `https://image.tmdb.org/t/p/original${heroFilm.backdrop_path}`
					: 'https://image.tmdb.org/t/p/original/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg'
			}
		>
			{video?.key && (
				<VideoPlayer videoKey={video.key} onChangeState={setReverse} />
			)}
			<div className="film-details">
				<AnimatePresence custom={reverse} initial={true}>
					<motion.h1
						key={heroFilm.id + 'title'}
						variants={
							video && heroFilm?.title
								? variantsTitle(heroFilm.title.length)
								: {}
						}
						custom={reverse}
						initial={'initial'}
						animate={'final'}
						transition={{
							ease: 'linear',
							duration: 0.8,
						}}
					>
						{heroFilm?.title}
					</motion.h1>
					<motion.p
						key={heroFilm.id + 'description'}
						variants={
							video && heroFilm?.overview
								? variantsDescription(heroFilm.overview.length > 0)
								: {}
						}
						initial={'initial'}
						animate={'final'}
						custom={reverse}
						transition={{
							ease: 'linear',
							duration: 0.8,
						}}
					>
						{limitedText(heroFilm?.overview, 'description', width)}
					</motion.p>
				</AnimatePresence>

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

