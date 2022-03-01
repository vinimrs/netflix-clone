import React, { useRef, useState } from "react";
import { ReactComponent as ChevronLeft } from "../../assets/chevron.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { useSwipeable } from "react-swipeable";
import useWindowDimensions from "../../common/context/WindowDimensions";
import * as S from "./style";

function List({ list, setModal }) {
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
    const listWidth = list.items.results.length * 200;
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
    <S.ListWrapper {...handlers}>
      <S.NavigateDiv
        onMouseEnter={() => {
          setActiveList(true);
        }}
        $left
        $active={activeList}
        onMouseLeave={() => {
          setActiveList(false);
        }}
        onClick={() => handleLeftArrow()}
      >
        <ChevronLeft />
      </S.NavigateDiv>
      <S.NavigateDiv
        onMouseEnter={() => {
          setActiveList(true);
        }}
        $active={activeList}
        onMouseLeave={() => {
          setActiveList(false);
        }}
        onClick={() => handleRightArrow()}
      >
        <ChevronRight />
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
        <S.FilmsList $length={list.items.results.length}>
          {list.items.results.length > 0 &&
            list.items.results.map((film, key) => {
              return (
                <S.FilmImage
                  src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                  alt={film.original_title}
                  key={key}
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
}

export default List;
