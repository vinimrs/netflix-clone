import { IAlert } from '@types';
import { atom } from 'recoil';

export const alertAtom = atom<IAlert>({
	key: 'alertAtom',
	default: { message: '', severity: 'success' },
});
