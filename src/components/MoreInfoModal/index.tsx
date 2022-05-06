import * as S from './style';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import YouTube from 'react-youtube';
import { moviesService } from '../../services/moviesService';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Loading from '../Loading';
import { WindowDimsContext } from '@contexts';
import { IMovieDataInfo } from '@types';
import { videoOpts } from '@constants';

interface ModeInfoModalProps {
  id: number;
  setModalInfo: React.Dispatch<
    React.SetStateAction<{
      id: string;
      success: boolean;
    }>
  >;
  minutesToHours: (totalMinutes: number) => string;
}

const MoreInfoModal: React.FC<ModeInfoModalProps> = ({
  id,
  setModalInfo,
  minutesToHours,
}) => {
  const [movie, setMovie] = useState<IMovieDataInfo>(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [missingError, setMissingError] = useState(false);
  const { width } = useContext(WindowDimsContext);

  useEffect(() => {
    const getMovieModal = async (id: number) => {
      const movie = await moviesService.getMovieInfo(id);
      const video = await moviesService.getMovieVideos(id);
      if (!video[0]) {
        setModalInfo({ id: '', success: false });
        setMissingError(true);
        return;
      }
      setMovie(movie);
      setMovieVideo(video[0]);
    };

    getMovieModal(id);
  }, []);

  console.log(width);
  return (
    <S.ModalBG data-testid="modal">
      {!isReady && !missingError && (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
          }}
        >
          <Loading />
        </div>
      )}
      <S.ModalContainer
        animate={{
          opacity: 1,
          visibility: 'inherit',
        }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="close-button"
          onClick={() => setModalInfo({ id: '', success: true })}
        >
          <CloseOutlinedIcon sx={{ color: 'var(--white)', fontSize: '40px' }} />
        </div>
        {movie && movieVideo && (
          <>
            <S.ModalBanner src={movie.backdrop_path}>
              <YouTube
                videoId={movieVideo.key}
                opts={videoOpts('100%', '400px', width < 769 ? 1 : 0)}
                onReady={e => {
                  e.target.playVideo();
                  setIsReady(true);
                }}
              />
            </S.ModalBanner>
            <S.FilmInfosWrapper>
              <div style={{ paddingLeft: '10px', order: '2' }}>
                <h1>{movie?.title}</h1>
                {movie.tagline && <span>&quot;{movie.tagline}&quot;</span>}
                <S.MovieDetails>
                  {movie.vote_average && (
                    <span style={{ color: 'var(--green)' }}>
                      {movie.vote_average} pontos
                    </span>
                  )}
                  {(movie.runtime || movie.last_air_date) && (
                    <span>
                      {movie.runtime
                        ? minutesToHours(movie.runtime)
                        : `${movie.number_of_seasons} 
                                                temporada${
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
                        : movie.last_air_date.substring(0, 4)}
                    </span>
                  )}
                </S.MovieDetails>
                <p>{movie?.overview}</p>
                <h2>Gênero{movie.genres.length > 1 ? 's' : ''}</h2>
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
                    <h2>Produção </h2>
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
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <S.PosterImg
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : ''
                  }
                  alt={movie.title}
                />
              </div>
            </S.FilmInfosWrapper>
          </>
        )}
      </S.ModalContainer>
    </S.ModalBG>
  );
};

export default MoreInfoModal;
