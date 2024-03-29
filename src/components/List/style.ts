import styled from 'styled-components';

export const ListWrapper = styled.div`
	margin-bottom: 76px;
	position: relative;
`;

export const ListDiv = styled.div`
	overflow-x: hidden;
	padding-left: 32px;
	transition: all ease 0.5s;
`;

export const FilmsList = styled.div<{ length?: number }>`
	min-width: ${p => (p.length ? p.length * 200 : 200)}px;
	display: flex;
	align-items: center;
	padding-top: 20px;
`;

export const FilmImage = styled.img`
	width: 200px;
	height: 300px;
	transition: all ease 0.3s;
	display: inline-block;
	cursor: pointer;
	transform: scale(0.98);
	border-radius: 5px;
	margin-right: 8px;

	&:hover {
		transform: scale(1);
	}
`;

export const ListTitle = styled.h2`
	font-size: 26px;
	font-weight: 700;
	color: var(--white);
	margin-left: 32px;
`;

export const NavigateDiv = styled.div<{ active?: boolean; left?: boolean }>`
	position: absolute;
	z-index: 999;
	width: 40px;
	height: 250px;
	display: flex;
	margin-top: 75px;
	justify-content: center;
	cursor: pointer;
	transition: all ease 0.5s;

	opacity: ${props => (props.active ? '1' : '0')};
	align-items: center;
	${props => (props.left ? 'left: 0' : 'right: 0')};
	background-color: rgba(0, 0, 0, 0.6);
`;

