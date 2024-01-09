import styled from 'styled-components';

export const VideoPlayerWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;

	.video {
		width: 100%;
		height: 100%;
		pointer-events: none;
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
	}
`;

export const ButtonContainer = styled.div`
	position: absolute;
	bottom: 28%;
	right: 7%;
	z-index: 1000;

	@media (max-width: 768px) {
		bottom: 118px;
		right: 42px;
	}
`;

export const VideoButton = styled.button`
	background-color: transparent;
	border-radius: 50%;
	border: 1px solid rgba(255, 255, 255, 0.7);
	width: 46px;
	height: 46px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`;

