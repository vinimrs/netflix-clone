import React, { createContext, useEffect, useState } from 'react';
import requires from '../../api/TheMb';

export const FilmsContext = createContext();
FilmsContext.displayName = "Films";

export const FilmsProvider = ({ children }) => {
	const [list, setList] = useState(null);
	const [heroFilm, setHeroFilm] = useState(null);
	const [filmVideo, setFilmVideo] = useState(null);

    
    useEffect(() => {
        const loadAll = async () => {
            const resultList = await requires.getHomeList();
            setList(resultList);
            const warFilms = resultList.filter((i) => i.slug === "war");
            let randomChosen = Math.floor(
                Math.random() * (warFilms[0].items.results.length - 1)
            );
            let chosen = warFilms[0].items.results[randomChosen];
            let chosenInfo = await requires.getMovieInfo(chosen.id, "movie");
    
            const videos = await requires.getMovieVideo(chosen.id);
            console.log(chosenInfo);
            console.log(videos.results[0]);
            setFilmVideo(videos.results[0]);
            setHeroFilm(chosenInfo);
        };
        loadAll();
    }, [])

    return(
        <FilmsContext.Provider value={{list, heroFilm, filmVideo}}>
            {children}
        </FilmsContext.Provider>
    );
};
