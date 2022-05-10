import { IImageData } from '@types';
import { useRecoilState, useRecoilStateLoadable } from 'recoil';
import { profileImagesAtom } from '../atoms';

export const useProfileImages = () => {
	const [images, setImages] =
		useRecoilStateLoadable<IImageData[]>(profileImagesAtom);

	return { images, setImages };
};
