import * as S from './style';
import React, { useRef, useState } from 'react';
import chevronLeft from '../../../public/chevron.svg';
import chevronRight from '../../../public/chevron-right.svg';
import { useSwipeable } from 'react-swipeable';
import useWindowDimensions from '../../common/context/WindowDimensions';
import { IMovieData, IMovieHomeList } from '../../services/moviesService';

interface List {
    setModal?: (film: IMovieData) => void;
    list?: IMovieHomeList;
}

const List: React.FC<List> = ({ list, setModal }) => {
    const [activeList, setActiveList] = useState(false);
    const [scrollx, setScrollx] = useState(0);
    const { width } = useWindowDimensions();

    const listTitle = useRef(null);
    const listDiv = useRef(null);

    const handleLeftArrow = () => {
        let x = scrollx + Math.round(width / (width < 769 ? 1.5 : 3));
        if (x > 0) {
            x = 0;
        }
        setScrollx(x);
    };

    const handleRightArrow = () => {
        let x = scrollx - Math.round(width / (width < 769 ? 1.5 : 3));
        const listWidth = list.items.length * 200;
        if (width - listWidth > x) {
            x = width - listWidth - 64;
        }
        setScrollx(x);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleRightArrow(),
        onSwipedRight: () => handleLeftArrow(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <S.ListWrapper {...handlers} data-testid="list-wrapper">
            <S.NavigateDiv
                onMouseEnter={() => {
                    setActiveList(true);
                }}
                left
                active={activeList}
                onMouseLeave={() => {
                    setActiveList(false);
                }}
                onClick={() => handleLeftArrow()}
            >
                <img src={chevronLeft.src} />
            </S.NavigateDiv>
            <S.NavigateDiv
                onMouseEnter={() => {
                    setActiveList(true);
                }}
                active={activeList}
                onMouseLeave={() => {
                    setActiveList(false);
                }}
                onClick={() => handleRightArrow()}
            >
                <img src={chevronRight.src} />
            </S.NavigateDiv>

            <S.ListTitle ref={listTitle}>{list.title}</S.ListTitle>
            <S.ListDiv
                ref={listDiv}
                onMouseEnter={() => {
                    setActiveList(true);
                }}
                onMouseLeave={() => {
                    setActiveList(false);
                }}
                style={{ marginLeft: scrollx }}
            >
                <S.FilmsList length={list.items.length}>
                    {list.items.length > 0 &&
                        list.items.map((film, key) => {
                            return (
                                <S.FilmImage
                                    src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                                    alt={film.original_title}
                                    key={key}
                                    data-testid="film-poster"
                                    onClick={() => {
                                        setModal(film);
                                    }}
                                />
                            );
                        })}
                </S.FilmsList>
            </S.ListDiv>
        </S.ListWrapper>
    );
};

export default List;
