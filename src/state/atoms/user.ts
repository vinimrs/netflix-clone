import { IImageData, IProfile, ISession } from '@types';
import { atom } from 'recoil';

const localStorage = typeof window !== 'undefined' ? window.localStorage : null;

const localStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage?.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset
				? localStorage?.removeItem(key)
				: localStorage?.setItem(key, JSON.stringify(newValue));
		});
	};

export const profileAtom = atom<IProfile>({
	key: 'profileAtom',

	default: localStorage ? JSON.parse(localStorage.getItem('usuario')!) : {},
	effects: [localStorageEffect('usuario')],
});

export const sessionAtom = atom<ISession>({
	key: 'sessionAtom',
	default: {} as ISession,
});

export const imagesAtom = atom<IImageData[]>({
	key: 'imagesAtom',
	default: [{}] as IImageData[],
});
