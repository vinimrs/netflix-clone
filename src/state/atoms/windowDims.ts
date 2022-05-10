import { IWindowDims } from '@types';
import { atom } from 'recoil';

export const windowDimsAtom = atom<IWindowDims>({
	key: 'windowDimsAtom',
	default: { width: 0, height: 0 },
});
