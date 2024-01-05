import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loadSession, setSession } from '../reducers/session';
import { authService } from '@services';

export const sessionListener = createListenerMiddleware<any>();

sessionListener.startListening({
	actionCreator: loadSession,
	effect: async (action, { dispatch, getState }) => {
		if (getState().session?.id) return;

		const session = await authService.getSession();
		console.log('sessionListener -> session', session);
		dispatch(setSession(session));
	},
});

