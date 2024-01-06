import styled from 'styled-components';

export const HeroWrapper = styled.div<{ src?: string }>`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: end;
	position: relative;

	background-image: linear-gradient(90deg, #00000eae 10%, #00000000 85.33%),
		url(${props => (props.src ? props.src : '')});
	background-size: cover;
	background-position: center;

	.film-details {
		position: absolute;
		left: 60px;
		bottom: 35%;
		display: flex;
		flex-direction: column;
		justify-content: baseline;
		align-items: flex-start;
		width: fit-content;
		margin-bottom: 20;

		h1 {
			font-size: 8vw;
			color: var(--white);
			margin-left: 8px;
			margin-bottom: 12px;
			max-width: 50%;
			line-height: 4vw;
		}

		p {
			font-size: 20px;
			line-height: 32px;
			color: var(--white);
			order: 2;
			margin: 8px 0;
			max-width: 50%;
			font-weight: 600;
			margin-left: 8px;
			user-select: none;
		}
	}

	.buttons {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;

		order: 6;
		margin: 24px 0 0 0;
	}

	@media (max-width: 768px) {
		margin: -28px 0 0 0;
		background-image: linear-gradient(0deg, #000e 40%, #00000000 95.33%),
			url(${props => (props.src ? props.src : '')});
		background-position: center;
		align-items: flex-end;

		.film-details {
			width: 100%;
			padding: 0 0 100px 16px;
			justify-content: flex-end;

			h1 {
				font-size: 48px;
				max-width: 90%;
				line-height: 75px;
			}

			p {
				font-size: 16px;
				margin: 8px 0;
				max-width: 80%;
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
	z-index: 2;

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
		font-weight: 600;
		font-size: 16px;
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

