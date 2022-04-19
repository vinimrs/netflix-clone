import styled from "styled-components";

export const ListWrapper = styled.div`
	margin-bottom: 24px;
	position: relative;
`;

export const ListDiv = styled.div`
	overflow-x: hidden;
	padding-left: 32px;
	transition: all ease 0.5s;
`;

export const FilmsList = styled.div`
	min-width: ${(p) => p.$length * 200}px;
	display: flex;
	align-items: center;
`;

export const FilmImage = styled.img`
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

export const ListTitle = styled.h2`
	font-size: 24px;
	font-weight: 600;
	color: var(--white);
	margin-left: 32px;
`;

export const NavigateDiv = styled.div`
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