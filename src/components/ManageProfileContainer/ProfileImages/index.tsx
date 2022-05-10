import * as S from './styles';
import React from 'react';
import { convertImage } from '@utils';
import { IImageData, ISession } from '@types';

const ProfileImages: React.FC<{
	setImageData: React.Dispatch<
		React.SetStateAction<{
			id: string;
			data: string;
		}>
	>;
	session: ISession;
	images: IImageData[];
}> = ({ setImageData, session, images }) => {
	const filteredImages = (imgs: IImageData[]) => {
		return imgs.filter(img => {
			const exists = session?.profiles.find(prof => {
				return prof.image._id === img._id;
			});
			return exists ? false : true;
		});
	};

	return (
		<S.ImageContainer>
			{filteredImages(images).map(image => (
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
