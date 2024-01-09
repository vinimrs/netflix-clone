import { Select, TextField } from '@mui/material';
import styled from 'styled-components';

export const MainWrapper = styled.main`
	position: relative;
	padding: 0 0 0 52px;
	z-index: 10;

	@media (max-width: 768px) {
		margin-top: -70px;
		padding: 0 0 0 0;
	}
`;

export const GradientMainWrapper = styled.div`
	width: 100%;
	height: 60px;
	position: absolute;
	top: 120px;
	left: 0;
	z-index: -1;
	background-image: linear-gradient(0deg, #141414 0%, #14141400 100%);
`;

export const ListsWrapper = styled.div`
	margin-top: -180px;
`;

export const CustomBackground = styled.div<{ src?: string }>`
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;

	background-image: linear-gradient(90deg, #000a 100%, #00000000 100%),
		url(${props => (props.src ? props.src : '')});
	background-size: cover;
	background-position: center;
	color: var(--white);

	h1 {
		margin-bottom: 12px;
	}

	@media (max-width: 768px) {
	}
`;

export const CustomContainer = styled.div<{ larger?: boolean }>`
	background-color: #000000b1;
	width: ${props => (props.larger ? '650px' : '450px')};
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5px;
	padding: 62px 32px;

	@media (max-width: 768px) {
		width: 100vw;
		padding: 24px 8px;
		margin: 0;
		margin-top: 20px;
		overflow-x: hidden;
	}
`;

export const CustomForm = styled.form`
	padding: 12px 24px;
`;

export const CustomTextField = styled(TextField)<{ width?: string }>`
	color: #eee;
	background-color: #333;
	border-radius: 5px;
	width: ${props => props.width};
	margin: 16px 0;
`;

export const CustomSelectField = styled(Select)<{ width?: string }>`
	color: #eee;
	background-color: #333;
	border-radius: 5px;
	width: ${props => props.width};
	margin: 18px 0 16px 0;
`;

export const CustomButton = styled.button<{ width?: string }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;
	user-select: none;
	vertical-align: middle;
	text-transform: uppercase;
	padding: 12px 48px;
	margin: 32px 0 12px 0;
	outline: 0;
	border-radius: 4px;
	border: 0;
	font-size: 0.9rem;
	font-weight: 600;
	line-height: 1.75;
	letter-spacing: 0.02857em;
	min-width: 64px;
	background-color: var(--red-netflix);
	color: var(--white);
	cursor: pointer;
	transition: 0.3s;

	width: ${props => props.width};

	&:hover {
		background-color: #bd0000;
	}

	&:disabled {
		cursor: not-allowed;
		color: #aaa;
		background-color: rgb(102 0 0 / 97%);
	}

	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const CustomText = styled.span`
	color: #8c8c80;
	padding: 12px 0;
	font-size: 16px;
	cursor: pointer;
	transition: 0.5s;
	&:hover {
		color: var(--white);
	}
`;

export const TogglePasswordVisibility = styled.span`
	position: absolute;
	margin-top: 5px;
	cursor: pointer;
	transition: 0.5s;
	transform: translate(-97px, 30px);
	color: var(--white);
`;

export const Shimmer = styled.div<{ duration: string }>`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;

	background: linear-gradient(
		90deg,
		transparent,
		rgba(255, 255, 255, 0.2),
		transparent
	);
	animation: shimmerAnimation ${props => props.duration} infinite;

	@keyframes shimmerAnimation {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
`;
