import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
	position: fixed;
	top: 0;
	width: 100vw;
	height: 80px;
	padding-right: 80vw;
	padding-left: 50px;

	@media (max-width: 768px) {
		padding-right: 0;
		padding-left: 40px;
	}
`;

const FirstHeader: React.FC = () => {
	return (
		<HeaderDiv>
			<Image
				alt="Logo da Netflix"
				src="/netflix-logo.svg"
				width="150"
				height="100"
				// style={{ display: 'flex', justifyContent: 'start' }}
			/>
		</HeaderDiv>
	);
};

export default FirstHeader;
