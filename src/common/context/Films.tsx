import React, { createContext, useContext, useState } from 'react';
import { moviesService } from '../../services/moviesService';

import { IMovieDataInfo, IMovieHomeList, IMovieVideo, IProfile } from '@types';

interface IFilmsContext {
  list?: IMovieHomeList[] | null;
  setList?: (value: IMovieHomeList[]) => void; // React.Dispatch<React.SetStateAction<string>>
  heroFilm?: IMovieDataInfo;
  setHeroFilm?: (value: IMovieDataInfo) => void; // React.Dispatch<React.SetStateAction<string>>
  filmVideo?: IMovieVideo;
  setFilmVideo?: (value: IMovieVideo) => void; // React.Dispatch<React.SetStateAction<string>>
}

export const FilmsContext = createContext<IFilmsContext | null>(null);
FilmsContext.displayName = 'Films';

export const FilmsProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [heroFilm, setHeroFilm] = useState({ title: '' });
  const [filmVideo, setFilmVideo] = useState({});

  return (
    <FilmsContext.Provider
      value={{
        setFilmVideo,
        setHeroFilm,
        setList,
        list,
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

  const loadHeroFilmWithId = async (id = '10752') => {
    const resp = await moviesService.getMovieListByGenre(id);
    if (resp.length > 0) {
      const randomChosen = Math.floor(Math.random() * (resp.length - 1));
      const chosen = resp[randomChosen];
      const chosenInfo = await moviesService.getMovieInfo(chosen.id);
      const videos = await moviesService.getMovieVideos(chosen.id);

      setFilmVideo(videos[0]);
      setHeroFilm(chosenInfo);
    }
  };

  const shuffle = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const loadHomeLists = async (profile: IProfile) => {
    const resultList = await moviesService.getHomeList(profile);
    const fixedLists = await moviesService.getFixedHomeLists();
    const lists = [...resultList, ...fixedLists];
    let res = await Promise.all(
      lists.map(async item => {
        return { ...item, items: item.items.body };
      })
    );
    res = shuffle(res);
    setList(res);
  };

  const loadAll = (profile: IProfile) => {
    loadHomeLists(profile);
    loadHeroFilmWithId(
      profile?.preference[
        Math.floor(Math.random() * profile?.preference.length)
      ]
    );
  };

  return {
    list,
    heroFilm,
    filmVideo,
    setHeroFilm,
    setFilmVideo,
    setList,
    loadHeroFilmWithId,
    loadHomeLists,
    loadAll,
  };
};
