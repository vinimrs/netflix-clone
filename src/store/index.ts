import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './reducers/profile';
import filmsSlice from './reducers/films';
import sessionSlice from './reducers/session';
import alertSlice from './reducers/alert';
import createSagaMiddleware from 'redux-saga';
import { filmsSaga } from './sagas/films';
import { all } from 'redux-saga/effects';
import { profileListener } from './middlewares/profile';
import { sessionListener } from './middlewares/session';
import { alertListener } from './middlewares/alert';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		profile: profileSlice,
		films: filmsSlice,
		session: sessionSlice,
		alert: alertSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().prepend(
			sagaMiddleware,
			profileListener.middleware,
			sessionListener.middleware,
			alertListener.middleware,
		),
});

function* rootSaga() {
	yield all([filmsSaga()]);
}

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

