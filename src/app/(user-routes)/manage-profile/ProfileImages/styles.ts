import styled from 'styled-components';

export const CustomImage = styled.img`
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

export const ImageContainer = styled.div`
	padding: 12px 0 0 20px;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;
