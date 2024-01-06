import React from 'react';
import * as S from './style';
import { Shimmer } from 'src/styles/GlobalComponents';

const ListShimmer: React.FC = () => {
	const tenItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<S.ShimmerContainer>
			<S.TitleShimmer>
				<Shimmer duration="2s" />
			</S.TitleShimmer>
			<S.OverflowDiv>
				<S.ListDiv>
					{tenItems.map((item, index) => (
						<S.ListShimmerContainer key={index}>
							<Shimmer duration="2.5s" />
						</S.ListShimmerContainer>
					))}
				</S.ListDiv>
			</S.OverflowDiv>
		</S.ShimmerContainer>
	);
};

export default ListShimmer;

