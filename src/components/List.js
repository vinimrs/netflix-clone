import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ChevronLeft } from "../assets/chevron.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";

const ListWrapper = styled.div`
	margin-bottom: 24px;
	position: relative;
`;

const ListDiv = styled.div`
	overflow-x: hidden;
	padding-left: 32px;
	transition: all ease 0.5s;
`;

const FilmsList = styled.div`
	min-width: ${(p) => p.$length * 200}px;
	display: flex;
	align-items: center;
`;

const FilmImage = styled.img`
	width: 200px;
	height: 300px;
	transition: all ease 0.3s;
	display: inline-block;
	cursor: pointer;
	transform: scale(0.9);
	border-radius: 5px;

	&:hover {
		transform: scale(1);
	}
`;

const ListTitle = styled.h2`
	font-size: 24px;
	font-weight: 600;
	color: var(--white);
	margin-left: 32px;
`;

const NavigateDiv = styled.div`
    position: absolute;
    z-index: 1000;
    width: 40px;
    height: 250px;
    display: flex;
    margin-top: 55px;
    justify-content: center;
    cursor: pointer;
    transition: all ease .5s;
    
    opacity: ${(props) => (props.$active ? "1;" : "0;")}
    align-items: center;
    ${(props) => (props.$left ? "left: 0;" : "right: 0;")}
    background-color: rgba(0, 0,0, 0.6);
`;

function List({ list }) {
	const [activeList, setActiveList] = useState(false);
	const [scrollx, setScrollx] = useState(0);
	const listTitle = useRef(null);
	const listDiv = useRef(null);

	const handleLeftArrow = () => {
		let x = scrollx + Math.round(window.innerWidth / 3);
		if (x > 0) {
			x = 0;
		}
		setScrollx(x);
	};

	const handleRightArrow = () => {
		let x = scrollx - Math.round(window.innerWidth / 3);
		const listWidth = list.items.results.length * 200;
		if (window.innerWidth - listWidth > x) {
			x = window.innerWidth - listWidth - 64;
		}
		setScrollx(x);
	};

	return (
		<ListWrapper>
			<NavigateDiv
				onMouseEnter={() => {
					setActiveList(true);
				}}
				$left
				$active={activeList}
				onMouseLeave={() => {
					setActiveList(false);
				}}
				onClick={handleLeftArrow}
			>
				<ChevronLeft />
			</NavigateDiv>
			<NavigateDiv
				onMouseEnter={() => {
					setActiveList(true);
				}}
				$active={activeList}
				onMouseLeave={() => {
					setActiveList(false);
				}}
				onClick={handleRightArrow}
			>
				<ChevronRight />
			</NavigateDiv>

			<ListTitle ref={listTitle}>{list.title}</ListTitle>
			<ListDiv
				ref={listDiv}
				onMouseEnter={() => {
					setActiveList(true);
				}}
				onMouseLeave={() => {
					setActiveList(false);
				}}
				style={{ marginLeft: scrollx }}
			>
				<FilmsList $length={list.items.results.length}>
					{list.items.results.length > 0 &&
						list.items.results.map((film, key) => {
							return (
								<FilmImage
									src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
									alt={film.original_title}
									key={key}
								/>
							);
						})}
				</FilmsList>
			</ListDiv>
		</ListWrapper>
	);
}

export default List;
