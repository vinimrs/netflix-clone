import { IImageData } from '@types';
import { useRecoilStateLoadable } from 'recoil';
import { profileImagesAtom } from '../atoms';

export const useProfileImages = () => {
	const [images, setImages] =
		useRecoilStateLoadable<IImageData[]>(profileImagesAtom);

	return { images, setImages };
};
