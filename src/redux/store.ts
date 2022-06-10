/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore, Reducer, AnyAction, createEntityAdapter } from '@reduxjs/toolkit';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { allReducers } from './reducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

//This RootState is required to use useSelector
export type RootState = ReturnType<typeof store.getState> & ReturnType<typeof allReducers>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/logout') {
    state = {} as RootState;
    createEntityAdapter().removeAll(state);
  }

  return allReducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false})
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
