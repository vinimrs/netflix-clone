import { useEffect, useState } from "react";
import { gsap, Power3 } from "gsap/all";
import YouTube from "react-youtube";
import * as S from "./style";
import requires from "../../api/TheMb";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useWindowDimensions from "../../common/context/WindowDimensions";
import Loading from "../Loading";

function MoreInfoModal({ id, type, setModalInfo, minutesToHours }) {
  const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const { width } = useWindowDimensions();

  const videoOpts = {
    height: "400px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      loop: 1,
      cc_load_policy: 1,
      rel: 0,
      origin: "https://netflix-clone-vinir07.vercel.app",
      muted: width < 769 ? "1" : "0",
      showinfo: 0,
      playlist: movieVideo?.key,
    },
  };

  const handleOnVideoEnd = (e) => {
    e.target.playVideo();
  };

  useEffect(() => {
    const getMovieModal = async (id, type) => {
      const movie = await requires.getMovieInfo(id, type);
      const video = await requires.getMovieVideo(id);
      setMovie(movie);
      setMovieVideo(video.results[0]);
    };

    getMovieModal(id, type);
    gsap.to("._modalContainer", {
      duration: 0.5,
      ease: Power3.easeInOut,
      autoAlpha: 1,
    });
  }, [type, id]);

  return (
    <S.ModalBG>
      {(!movie || !movieVideo) && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            position: "relative",
          }}
        >
          <Loading />
        </div>
      )}
      <S.ModalContainer className="_modalContainer">
        {movie && movieVideo && (
          <>
            <S.CloseModal onClick={() => setModalInfo({})}>
              <CloseOutlinedIcon
                sx={{ color: "var(--white)", fontSize: "32px" }}
              />
            </S.CloseModal>
            <S.ModalBanner $src={movie.backdrop_path}>
              <YouTube
                videoId={movieVideo.key}
                opts={videoOpts}
                allow="autoplay;"
                onReady={(e) => e.target.playVideo()}
                onEnd={() => handleOnVideoEnd()}
              />
            </S.ModalBanner>
            <S.FilmInfosWrapper>
              <div style={{ paddingLeft: "10px", order: "2" }}>
                <h1>{movie?.title}</h1>
                {movie.tagline && <span>"{movie?.tagline}"</span>}
                <S.MovieDetails>
                  {movie.vote_average && (
                    <span style={{ color: "var(--green)" }}>
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
                                                    ? "s"
                                                    : ""
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
                <h2>Gênero{movie.genres.length > 1 ? "s" : ""}</h2>
                {movie.genres && (
                  <div>
                    {movie.genres.map((genre) => (
                      <span key={genre.id}>{genre.name} </span>
                    ))}
                  </div>
                )}
                <h2>
                  País
                  {movie.production_countries.length > 1 ? "es" : ""}
                </h2>
                {movie.production_countries && (
                  <div>
                    {movie.production_countries.map((country) => (
                      <span>{country.name}</span>
                    ))}
                  </div>
                )}
                {movie.production_companies[0] && (
                  <S.MovieProductionCompanies>
                    <h2>Produção </h2>
                    <S.CompaniesWrapper>
                      {movie.production_companies.map((company) => (
                        <S.CompaniesBox>
                          {company.logo_path && (
                            <img
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
              <div style={{ textAlign: "center" }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "200px", order: "1", marginTop: "20px" }}
                />
              </div>
            </S.FilmInfosWrapper>
          </>
        )}
      </S.ModalContainer>
    </S.ModalBG>
  );
}

export default MoreInfoModal;
