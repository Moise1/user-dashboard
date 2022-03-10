import { createSlice } from '@reduxjs/toolkit';
import {getChannels} from './channelsThunk';

export interface Channel {
  id: number;
  channelId: number;
  debug: boolean;
  disabled: boolean;
  empty: boolean;
  isoCountry: number;
  name: string;
  userId: string
}

const initialState = {
  channels: [] as Channel[],
  loading: false,
  error: ''
};


export const channelsSlice = createSlice({
  name: 'channels',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getChannels.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getChannels.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.channels = payload;
    });
    builder.addCase(getChannels.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const channelsReducer = channelsSlice.reducer;

