import { IAlert } from '@types';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { alertAtom } from '../atoms/alert';

const clearAllTimeouts = () => {
	let id = window.setTimeout(function () {
		return;
	}, 0);

	while (id--) {
		window.clearTimeout(id); // will do nothing if no timeout with id is present
	}
};

export const useAlert = () => {
	const setAlert = useSetRecoilState<IAlert>(alertAtom);
	const resetAlert = useResetRecoilState(alertAtom);

	return {
		success: (message: string) => {
			clearAllTimeouts();
			window.setTimeout(() => {
				resetAlert();
			}, 4000);
			setAlert({ message, severity: 'success' });
		},

		error: (message: string) => {
			clearAllTimeouts();
			window.setTimeout(() => {
				resetAlert();
			}, 4000);
			setAlert({ message, severity: 'error' });
		},
		// clear: resetAlert,
	};
};
