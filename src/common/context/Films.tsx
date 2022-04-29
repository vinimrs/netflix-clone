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
    IMovieHomeList,
    moviesService,
} from '../../services/auth/moviesService';
import { IMovieVideo } from '../../services/auth/moviesService';
import { useUsuario } from './Usuario';

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
    const { profile, getStorageProfile, setProfile } = useUsuario();
    profile;

    const loadHeroFilmWithId = async (id = '10752') => {
        const resp = await moviesService.getMovieListByGenre(id);
        resp;
        if (resp.length > 0) {
            let randomChosen = Math.floor(Math.random() * (resp.length - 1));
            let chosen = resp[randomChosen];
            let chosenInfo = await moviesService.getMovieInfo(chosen.id);
            const videos = await moviesService.getMovieVideos(chosen.id);

            setFilmVideo(videos[0]);
            setHeroFilm(chosenInfo);
        }
    };

    // const loadHeroFilmWithId = useCallback(
    //     async (id = 10752) => {
    //         const resp = await moviesService.getMovieListByGenre(id);
    //         resp;
    //         if (resp.length > 0) {
    //             let randomChosen = Math.floor(
    //                 Math.random() * (resp.length - 1)
    //             );
    //             let chosen = resp[randomChosen];
    //             let chosenInfo = await moviesService.getMovieInfo(chosen.id);
    //             const videos = await moviesService.getMovieVideos(chosen.id);

    //             setFilmVideo(videos[0]);
    //             setHeroFilm(chosenInfo);
    //         }
    //     },
    //     [setFilmVideo, setHeroFilm]
    // );

    const shuffle = (array: any[]) => {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    const loadHomeLists = async () => {
        if (profile !== null) {
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
        }
    };

    useEffect(() => {
        if (profile === null || profile === undefined) {
            setProfile(getStorageProfile());
        }
        const loadAll = async () => {
            loadHomeLists();
            loadHeroFilmWithId(
                profile?.preference[
                    Math.floor(Math.random() * profile?.preference.length)
                ]
            );
        };

        loadAll();
    }, [profile, setList]);

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
