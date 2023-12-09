import { IImageData } from '@types';
import { useRecoilValueLoadable } from 'recoil';
import { imagesSelector } from '../selectors';

export const useProfileImages = () => {
	return useRecoilValueLoadable<IImageData[]>(imagesSelector);
};

