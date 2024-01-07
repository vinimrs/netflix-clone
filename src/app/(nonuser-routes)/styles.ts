import styled from 'styled-components';

export * from '../../styles/GlobalComponents';

export const Container = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const Title = styled.h1`
	text-align: center;
	width: 80%;
	font-size: 42px;
	font-weight: bold;
	color: var(--white);
	margin-bottom: 20px;
`;

export const Subtitle = styled.h2`
	font-size: 22px;
	font-weight: 400;
	color: var(--white);
	margin-bottom: 20px;
`;

export const Text = styled.p`
	font-size: 18px;
	font-weight: 400;
	color: var(--white);
	margin-bottom: 20px;
`;

export const Form = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
`;

export const Input = styled.input`
	width: 100%;
	height: 52px;
	border: 1px solid var(--white);
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0.5);
	color: rgba(255, 255, 255, 0.7);
	font-size: 16px;
	font-weight: 500;
	font-family: var(--font-open-sans);
	padding: 0px 20px;
`;

export const Button = styled.button`
	width: 50%;
	height: 52px;
	border: none;
	border-radius: 5px;
	background-color: var(--red-netflix);
	color: var(--white);
	font-size: 24px;
	font-weight: 500;
	font-family: var(--font-open-sans);
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		opacity: 0.8;
	}
`;

