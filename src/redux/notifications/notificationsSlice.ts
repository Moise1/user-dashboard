import { createSlice } from '@reduxjs/toolkit';
import {getNotifications} from './notificationsThunk';

export interface Notification {
    
    id: number,
    channelId: number,
    isoCountry: 1,
    name: string,
    disabled: number,
    debug: boolean,
    empty: boolean,
    userId: string;
}

const initialState = {
  notifications: [] as Notification[],
  loading: false,
  error: ''
};


export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNotifications.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getNotifications.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.notifications = payload?.noApiDisconnected;
    });
    builder.addCase(getNotifications.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const {reducer: notificationsReducer} = notificationsSlice;

