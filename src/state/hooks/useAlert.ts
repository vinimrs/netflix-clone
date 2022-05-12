import { IAlert } from '@types';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { alertAtom } from '../atoms/alert';

export const useAlert = () => {
	const setAlert = useSetRecoilState<IAlert>(alertAtom);
	const resetAlert = useResetRecoilState(alertAtom);

	return {
		success: (message: string) => {
			setTimeout(() => {
				resetAlert();
			}, 4000);

			setAlert({ message, severity: 'success' });
		},

		error: (message: string) => {
			setTimeout(() => {
				resetAlert();
			}, 4000);
			setAlert({ message, severity: 'error' });
		},
		// clear: resetAlert,
	};
};
