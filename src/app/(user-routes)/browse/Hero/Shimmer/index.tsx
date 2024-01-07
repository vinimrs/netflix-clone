import { Shimmer } from 'src/styles/GlobalComponents';
import * as S from './styles';
import React from 'react';

const HeroShimmer: React.FC = () => {
	return (
		<S.Container>
			<S.ShimmerContainer>
				<Shimmer duration="3s" />
			</S.ShimmerContainer>
		</S.Container>
	);
};

export default HeroShimmer;

