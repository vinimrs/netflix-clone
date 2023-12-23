'use client';
import * as S from './style';
import { useEffect, useState } from 'react';
import React from 'react';
import { moviesService } from '../../services/moviesService';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IMovieDataInfo, IMovieVideo } from '@types';
import { useAlert } from '@hooks';
import { toHoursAndMinutes } from '@utils';
import Image from 'next/image';

interface ModeInfoModalProps {
	id: number;
	setModalInfo: React.Dispatch<
		React.SetStateAction<{
			id: string;
			success: boolean;
		}>
	>;
}

const MoreInfoModal: React.FC<ModeInfoModalProps> = ({ id, setModalInfo }) => {
	const [movie, setMovie] = useState<IMovieDataInfo>({} as IMovieDataInfo);
	const [movieVideo, setMovieVideo] = useState<IMovieVideo>({} as IMovieVideo);
	const [loading, setLoading] = useState(true);

	const alertActions = useAlert();

	const tmdbUrl = 'https://image.tmdb.org/t/p/w1280';

	useEffect(() => {
		const getMovieModal = async (id: number) => {
			const movie = await moviesService.getMovieInfo(id);
			const video = await moviesService.getMovieVideos(id);
			if (!video[0] && !video[1]) {
				setModalInfo({ id: '', success: false });
				alertActions.error(
					'Não conseguimos coletar informações sobre esse filme! Tente novamente mais tarde!',
				);
				setLoading(false);
				return;
			}
			setMovie(movie);
			setMovieVideo(video[1] || video[0]);
			setLoading(false);
		};

		getMovieModal(id);
	}, []);

	return (
		<S.ModalBG data-testid="modal">
			<S.ModalContainer
				animate={{
					opacity: 1,
					visibility: 'inherit',
				}}
				transition={{ duration: 0.5 }}
				style={{ overflowY: loading ? 'hidden' : 'scroll' }}
			>
				{loading ? (
					<div
						style={{
							backgroundColor: 'black',
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Image
							src="/loading1.gif"
							alt="Animação de carregamento"
							width="240"
							height="120"
						/>
					</div>
				) : (
					<>
						<div
							className="close-button"
							onClick={() => setModalInfo({ id: '', success: true })}
						>
							<CloseOutlinedIcon
								sx={{ color: 'var(--white)', fontSize: '40px' }}
							/>
						</div>
						{Object.keys(movie).length > 0 &&
							Object.keys(movieVideo).length > 0 && (
								<>
									<S.ModalBanner src={tmdbUrl + movie.backdrop_path}>
										<iframe
											src={`https://www.youtube.com/embed/${movieVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movieVideo.key}&showinfo=0&rel=0`}
											frameBorder="0"
											allow="autoplay; encrypted-media"
											allowFullScreen
											style={{
												width: '100%',
												height: '100%',
											}}
											title="video"
										/>
									</S.ModalBanner>
									<S.FilmInfosWrapper>
										<div>
											<h1>{movie?.title}</h1>
											{movie.tagline && (
												<span>&quot;{movie.tagline}&quot;</span>
											)}
											<S.MovieDetails>
												{movie.vote_average && (
													<span style={{ color: 'var(--green)' }}>
														{movie.vote_average} pontos
													</span>
												)}
												{(movie.runtime || movie.last_air_date) && (
													<span>
														{movie.runtime
															? toHoursAndMinutes(movie.runtime)
															: `${movie.number_of_seasons} 
                                                temporada${
																									movie.number_of_seasons &&
																									movie.number_of_seasons > 1
																										? 's'
																										: ''
																								}`}
													</span>
												)}
												{(movie.release_date || movie.last_air_date) && (
													<span>
														{movie.release_date
															? movie.release_date.substring(0, 4)
															: movie.last_air_date!.substring(0, 4)}
													</span>
												)}
											</S.MovieDetails>
											<p>{movie?.overview}</p>
											<h2>
												Gênero
												{movie.genres && movie.genres?.length > 1 ? 's' : ''}
											</h2>
											{movie.genres && (
												<div>
													{movie.genres.map(genre => (
														<span key={genre.id}>{genre.name} </span>
													))}
												</div>
											)}
											{movie.production_countries && (
												<>
													<h2>
														País
														{movie.production_countries.length > 1 ? 'es' : ''}
													</h2>
													<div>
														{movie.production_countries.map((country, id) => (
															<span key={id}>{country.name}</span>
														))}
													</div>
												</>
											)}
											{movie.production_companies && (
												<S.MovieProductionCompanies>
													<h2 style={{ color: 'var(--black)' }}>Produção </h2>
													<S.CompaniesWrapper>
														{movie.production_companies.map(company => (
															<S.CompaniesBox key={company.name}>
																{company.logo_path && (
																	<S.CompanyImg
																		src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
																		alt={company.name}
																	/>
																)}
																<span>{company.name}</span>
															</S.CompaniesBox>
														))}
													</S.CompaniesWrapper>
												</S.MovieProductionCompanies>
											)}
										</div>
										<S.PosterContainer>
											{movie.poster_path ? (
												<img
													src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
													// width={'200'}
													// height={'300'}
													alt={movie.title}
													className="poster-img"
												/>
											) : (
												<p>...</p>
											)}
										</S.PosterContainer>
									</S.FilmInfosWrapper>
								</>
							)}
					</>
				)}
			</S.ModalContainer>
		</S.ModalBG>
	);
};

export default MoreInfoModal;
