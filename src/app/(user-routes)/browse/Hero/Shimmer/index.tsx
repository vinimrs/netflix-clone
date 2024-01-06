import { Shimmer } from 'src/styles/GlobalComponents';
import * as S from './style';
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

