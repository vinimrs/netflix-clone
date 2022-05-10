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
				src="/netflix-logo.svg"
				width="150px"
				height="100px"
				// style={{ display: 'flex', justifyContent: 'start' }}
			/>
		</HeaderDiv>
	);
};

export default FirstHeader;
