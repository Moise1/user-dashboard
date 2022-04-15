import { createSlice } from '@reduxjs/toolkit';
import {getChannels, deleteChannel} from './channelsThunk';

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
  channelDeleted: false,
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

    builder.addCase(deleteChannel.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteChannel.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.channelDeleted= payload.ok;
    });
    builder.addCase(deleteChannel.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const {reducer: channelsReducer} = channelsSlice;

