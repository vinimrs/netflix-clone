import * as S from './styles';
import React from 'react';
import { convertImage } from '@utils';
import { useProfileImages, useSession } from '@hooks';
import { IImageData } from '@types';

const ProfileImages: React.FC<{
	setImageData: React.Dispatch<
		React.SetStateAction<{
			id: string;
			data: string;
		}>
	>;
}> = ({ setImageData }) => {
	const loadableImages = useProfileImages();
	const loadableSession = useSession();

	const filteredImages = (imgs: IImageData[]) => {
		return imgs.filter(img => {
			const exists = session?.profiles.find(prof => {
				return prof.image._id === img._id;
			});
			return exists ? false : true;
		});
	};

	if (
		loadableSession.session.state === 'loading' ||
		loadableImages.images.state === 'loading'
	)
		return <div />;

	const session = loadableSession.session.getValue();
	const images = loadableImages.images.getValue();

	return (
		<S.ImageContainer>
			{images &&
				filteredImages(images).map(image => (
					<div
						key={image._id}
						id={image._id}
						onClick={() => {
							setImageData({
								id: image._id,
								data: convertImage(image.data),
							});
						}}
						role="img"
					>
						<S.CustomImage
							src={`data:image/image/png;base64,${convertImage(image.data)}`}
						/>
					</div>
				))}
		</S.ImageContainer>
	);
};

export default ProfileImages;
