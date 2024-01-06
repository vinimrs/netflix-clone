import { createListenerMiddleware } from '@reduxjs/toolkit';
import { loadSession, setSession } from '../reducers/session';
import { authService } from '@services';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sessionListener = createListenerMiddleware<any>();

sessionListener.startListening({
	actionCreator: loadSession,
	effect: async (action, { dispatch, getState }) => {
		if (getState().session?.id) return;

		const session = await authService.getSession();
		dispatch(setSession(session));
	},
});

