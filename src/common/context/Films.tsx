import React, {
    createContext,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    IMovieData,
    IMovieDataInfo,
    moviesService,
} from '../../services/auth/moviesService';
import { IMovieVideo } from '../../services/auth/moviesService';
import { useUsuario } from './Usuario';

interface IFilmsContext {
    list?: IMovieData[] | null;
    setList?: (value: IMovieData[]) => void; // React.Dispatch<React.SetStateAction<string>>
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
    const { profile } = useUsuario();

    const loadHeroFilmWithId = useCallback(
        async (id = 10725) => {
            const resp = await moviesService.getMovieListByGenre(id);
            let randomChosen = Math.floor(Math.random() * (resp.length - 1));
            let chosen = resp[randomChosen];
            let chosenInfo = await moviesService.getMovieInfo(chosen.id);
            const videos = await moviesService.getMovieVideos(chosen.id);

            setFilmVideo(videos[0]);
            setHeroFilm(chosenInfo);
        },
        [setFilmVideo, setHeroFilm]
    );

    const loadHomeLists = useCallback(async () => {
        const resultList = await moviesService.getHomeList();
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
