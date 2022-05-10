import styled from 'styled-components';

export const HeroWrapper = styled.div<{ src?: string }>`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: start;
	align-items: center;
	position: relative;

	background-image: linear-gradient(90deg, #000e 37%, #00000000 85.33%),
		url(${props => (props.src ? props.src : '')});
	background-size: cover;
	background-position: center;

	p {
		font-size: 20px;
		line-height: 24px;
		color: var(--white);

		order: 4;
		margin: 8px 0;

		max-width: 35%;
	}

	.video {
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
	}

	.film-details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 70px 0 150px 35px;
		z-index: 10;
		width: 100%;

		h1 {
			font-size: 72px;
			color: var(--white);
			max-width: 45%;
			order: 1;
		}

		h1 + div {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			max-width: 35%;
			order: 2;
			margin-top: 12px;

			span {
				font-weight: 500;
				font-size: 20px;
				line-height: 23px;
				color: #f5f5f5;
				margin-right: 12px;

				&.score {
					color: #46d369;
				}
			}
		}
	}

	.buttons {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;

		order: 6;
		margin: 12px 0px;
		max-width: 45%;
	}

	@media (max-width: 768px) {
		margin: -68px 0 0 0;
		background-image: linear-gradient(0deg, #000e 40%, #00000000 95.33%),
			url(${props => (props.src ? props.src : '')});
		background-position: center;
		align-items: end;

		p {
			font-size: 16px;
			margin: 8px 0;
			max-width: 80%;
		}

		.film-details {
			padding: 100px 0 100px 16px;

			max-width: 80vh;
			justify-content: end;

			h1 {
				font-size: 48px;
				max-width: 90%;
				line-height: 75px;
			}

			h1 + div {
				margin-top: 8px;
				max-width: 80%;

				span {
					font-size: 16px;
					text-align: center;
				}
			}
		}

		.buttons {
			margin: 8px 0px;
			max-width: 100%;
			order: 5;
		}
	}
`;

export const HeroButton = styled.button<{
	variant?: string;
	disableMobile?: boolean;
}>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: 0.5s;
	border-radius: 6px;

	padding: ${props => (!props.variant ? '10px 20px' : '12px 22px')};
	background-color: var(
		${props => {
			switch (props.variant) {
				case 'primary':
					return '--white';
				case 'secondary':
					return '--light-black';
				default:
					return '--transparent';
			}
		}}
	);
	border: ${props => {
		switch (props.variant) {
			case 'primary':
				return 'none';
			case 'secondary':
				return 'none';
			default:
				return 'solid 2px var(--white)';
		}
	}};
	color: var(
		${props => {
			switch (props.variant) {
				case 'primary':
					return '--black';
				case 'secondary':
					return '--white';
				default:
					return '--white';
			}
		}}
	);

	/* Inside auto layout */

	margin: 8px 8px;

	&:hover {
		background: var(
			${props => {
				switch (props.variant) {
					case 'primary':
						return '--white-hover';
					case 'secondary':
						return '--light-black-hover';
					default:
						return '--light-black-hover';
				}
			}}
		);
		border-color: var(--light-black-hover);
	}

	span {
		color: var(
			${props => {
				switch (props.variant) {
					case 'primary':
						return '--black';
					case 'secondary':
						return '--white';
					default:
						return '--black';
				}
			}}
		);
		font-weight: 500;
		font-size: 20px;
		line-height: 24px;
		margin: 0 0 0 8px;
		max-width: 100%;
	}

	@media (max-width: 768px) {
		padding: 12px 24px;
		margin: 8px 4px;
		display: ${props => (props.disableMobile ? 'none' : 'flex')};

		span {
			font-size: 16px;
			max-width: 100%;
		}
	}
`;
