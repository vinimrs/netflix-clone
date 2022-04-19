import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import requires from "../../api/TheMb";
import { useUsuario } from "./Usuario";

export const FilmsContext = createContext();
FilmsContext.displayName = "Films";

export const FilmsProvider = ({ children }) => {
  const [list, setList] = useState(null);
  const [heroFilm, setHeroFilm] = useState(null);
  const [filmVideo, setFilmVideo] = useState(null);

  return (
    <FilmsContext.Provider
      value={{
        list,
        setFilmVideo,
        setHeroFilm,
        setList,
        heroFilm,
        filmVideo,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};

export const useFilms = () => {
  const { list, heroFilm, filmVideo, setHeroFilm, setFilmVideo, setList } =
    useContext(FilmsContext);
  const { profile } = useUsuario();

	const loadHeroFilmWithId = useCallback(
		async (id = 10725) => {
			const resp = await requires.getMoviesByCategoryId(id);
			let randomChosen = Math.floor(
				Math.random() * (resp.results.length - 1)
			);
			let chosen = resp.results[randomChosen];
			let chosenInfo = await requires.getMovieInfo(chosen.id, "movie");
			const videos = await requires.getMovieVideo(chosen.id);

      setFilmVideo(videos.results[0]);
      setHeroFilm(chosenInfo);
    },
    [setFilmVideo, setHeroFilm]
  );

	const loadHomeLists = useCallback(async () => {
		const resultList = await requires.getHomeList();
		setList(resultList);
	}, [setList]);

	useEffect(() => {
		const loadAll = async () => {
			loadHomeLists();
			loadHeroFilmWithId(profile.preference);
		};
		loadAll();
	}, [loadHeroFilmWithId, loadHomeLists, profile]);

  return {
    list,
    heroFilm,
    filmVideo,
    setHeroFilm,
    setFilmVideo,
    setList,
    loadHeroFilmWithId,
    loadHomeLists,
  };
};
