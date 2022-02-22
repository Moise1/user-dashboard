import {configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {allReducers as rootReducer} from './reducers';

export const store = configureStore({reducer: rootReducer});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();

//This RootState is required to use useSelector
export type RootState = ReturnType<typeof store.getState>
