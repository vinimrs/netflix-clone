export * from '../../styles/GlobalComponents';
import styled from 'styled-components';

export const EmailContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;

	h1 {
		color: red;
	}

	h2 {
		max-width: 600px;
	}

	a {
		color: white;
		margin: 30px;
	}

	@media (max-width: 768px) {
		h2 {
			font-size: 20px;
			max-width: 360px;
		}
	}
`;
