'use client';
import styled from 'styled-components';

export const ManageProfileContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		width: 90%;
		color: var(--gray);
		margin-top: 35px;

		h1 {
			color: var(--white);
		}

		& > form {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 20px;

			.profile-inputs__wrapper {
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: center;

				.profile__edit-session {
					display: flex;
					flex-direction: column;
					width: 100%;
					max-width: 500px;
					& > div {
						text-align: center;
						margin-top: 20px;
						width: 100%;
					}

					& > .inputs-wrapper {
						margin: 0;
						width: 100%;
						padding: 0 30px 0 0;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
				}

				.preview-container {
					text-align: center;

					& > h2 {
						color: var(--white);
						margin-bottom: 12px;
					}

					& > h3 {
						text-transform: uppercase;
						font-weight: 700;
					}
				}
			}

			.profile-buttons__wrapper {
				width: 100%;
				text-align: center;
				margin-top: 30px;
				display: flex;
				flex-direction: column;
				align-items: center;

				& > span {
					color: #8c8c80;
					padding: 12px 0;
					font-size: 16px;
					cursor: pointer;
					transition: 0.5s;
					&:hover {
						color: var(--white);
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		height: 100%;
		padding: 100px 0;

		& > div {
			margin-top: 10px;

			& > form {
				.profile-inputs__wrapper {
					justify-content: space-around;
					flex-direction: column-reverse;
					.profile__edit-session {
						max-width: 768px;

						& > .inputs-wrapper {
							margin: 0 12px;
						}
					}
				}
			}
		}
	}
`;

export const CustomImage = styled.img`
	/* width: 200px; */
	width: 100px;
	margin: 8px 20px 8px 0px;
	padding: 0;
	transition: 0.3s;
	border: 2px solid transparent;
	border-radius: 10px;
	cursor: pointer;

	&:hover {
		border-color: var(--white);
	}

	@media (max-width: 768px) {
		border: 4px solid transparent;
		width: 100px;
		margin: 8px 8px 0 0;
	}
`;
