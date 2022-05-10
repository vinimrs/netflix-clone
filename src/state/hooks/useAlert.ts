import { IAlert } from '@types';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { alertAtom } from '../atoms/alert';

export const useAlert = () => {
	const setAlert = useSetRecoilState<IAlert>(alertAtom);
	const resetAlert = useResetRecoilState(alertAtom);

	return {
		success: (message: string) => setAlert({ message, severity: 'success' }),
		error: (message: string) => setAlert({ message, severity: 'error' }),
		clear: resetAlert,
	};
};
