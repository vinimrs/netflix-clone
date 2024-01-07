import styled from 'styled-components';

export const HeaderDiv = styled.div`
	width: 100vw;
	height: 80px;
	padding: 0px 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		padding: 0px 40px;
	}
`;

export const HeaderLoginButton = styled.button`
	width: 80px;
	height: 36px;
	border: none;
	border-radius: 5px;
	background-color: var(--red-netflix);
	color: var(--white);
	font-size: 16px;
	font-weight: 500;
	font-family: var(--font-open-sans);
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		opacity: 0.8;
	}
`;

