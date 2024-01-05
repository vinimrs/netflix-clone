import styled from 'styled-components';

export const ProfileWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.shimmer-container {
		margin: 8px 0;
		position: relative;
		width: 200px;
		height: 200px;
		overflow: hidden;
	}

	.shimmer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.1),
			transparent
		);
		animation: shimmerAnimation 2s infinite;
	}

	@keyframes shimmerAnimation {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	h1 {
		font-size: 52px;
		font-family: var(--font-open-sans);
		color: var(--white);
		margin-bottom: 32px;
	}

	h2 {
		font-size: 24px;
		font-weight: 700;
		color: #8c8c80;
		transition: 0.3s;
	}

	h3 {
		font-size: 22px;
		font-weight: 500;
		transition: 0.3s;
	}

	& > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 90%;
		color: var(--gray);
		margin-top: 35px;

		& > .create-profile__container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			transition: all 0.3s;

			&:hover {
				color: var(--white);

				h2 {
					color: var(--white);
				}
			}

			& > div {
				text-align: center;
				width: fit-content;
				height: fit-content;
				cursor: pointer;
				margin: 8px 0;
				border: 2px solid #8c8c80;
				transition: all 0.3s;

				&:hover {
					border: 2px solid var(--white);
					color: var(--white);
				}
			}
		}

		& > .profile-image__box {
			text-align: center;
			cursor: pointer;
			margin: 8px 0;
			position: relative;

			&:hover {
				h2 {
					color: var(--white);
				}
			}
		}
	}

	@media (max-width: 768px) {
		height: auto;
		margin-top: 140px;
		margin-bottom: 70px;
		h1 {
			font-size: 32px;
			margin-bottom: 12px;
		}
		h2 {
			font-size: 18px;
		}
		h3 {
			font-size: 22px;
		}
		& > div {
			margin-top: 10px;

			& > .create-profile__container {
				width: 150px;
				margin: 8px 0;
			}
			& > .profile-image__box {
				margin: 12px 0;
				border-color: var(--white);

				h2 {
					color: var(--white);
				}
			}
		}
	}
`;

export const CustomImage = styled.img`
	width: 200px;
	margin: 0px 10px 0px 10px;
	transition: 0.3s;
	border: 2px solid transparent;

	&:hover {
		border-color: var(--white);
	}

	@media (max-width: 768px) {
		width: 150px;
	}
`;

