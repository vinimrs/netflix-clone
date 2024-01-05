import * as S from './styles';
import React from 'react';
import { IImageData, IProfile } from '@types';
import { convertImage } from '@utils';
import { useAppSelector } from 'src/store/hooks';

const ProfileImages: React.FC<{
	setImageData: React.Dispatch<
		React.SetStateAction<{
			id: string;
			data: string;
		}>
	>;
	images: IImageData[];
}> = ({ setImageData, images }) => {
	const filteredImages = (imgs: IImageData[], profiles: IProfile[]) => {
		return imgs.filter(img => {
			const exists = profiles.find(prof => {
				return prof!.image!._id === img._id;
			});
			return exists ? false : true;
		});
	};

	const { profiles } = useAppSelector(state => state.session);

	return (
		<S.ImageContainer>
			{profiles !== null &&
				images !== undefined &&
				filteredImages(images, profiles === undefined ? [] : profiles).map(
					image => (
						<div
							key={image._id}
							id={image._id}
							onClick={() => {
								setImageData({
									id: image._id,
									data: convertImage(image.data!),
								});
							}}
							role="img"
						>
							<S.CustomImage
								src={`data:image/image/png;base64,${convertImage(image.data!)}`}
							/>
						</div>
					),
				)}
		</S.ImageContainer>
	);
};

export default ProfileImages;

