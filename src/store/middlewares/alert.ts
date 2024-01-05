import { createListenerMiddleware } from '@reduxjs/toolkit';
import { clearAllTimeouts } from '@utils';
import { resetAlert, setError, setSuccess } from '../reducers/alert';

export const alertListener = createListenerMiddleware();

alertListener.startListening({
	actionCreator: setError,
	effect: (action, { dispatch }) => {
		clearAllTimeouts();
		window.setTimeout(() => {
			dispatch(resetAlert());
		}, 4000);
	},
});

alertListener.startListening({
	actionCreator: setSuccess,
	effect: (action, { dispatch }) => {
		clearAllTimeouts();
		window.setTimeout(() => {
			dispatch(resetAlert());
		}, 4000);
	},
});

