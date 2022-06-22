import { createSlice } from '@reduxjs/toolkit';
import { eCountry } from '../../utils/eCountry';
import { ePlatform } from '../../utils/ePlatform';
import { getChannels, deleteChannel } from './channelsThunk';

export interface Channel {
  id: number;
  channelId: ePlatform;
  debug: boolean;
  disabled: boolean;
  empty: boolean;
  isoCountry: eCountry;
  name: string;
  userId: string;
}

export interface ChannelsState {
  channels: Channel[];
  channelDeleted: boolean;
  loading: boolean;
  error: string;
}

const initialState: ChannelsState = {
  channels: [] as Channel[],
  channelDeleted: false,
  loading: false,
  error: ''
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannels.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getChannels.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.channels = payload;
    });
    builder.addCase(getChannels.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    builder.addCase(deleteChannel.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteChannel.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.channelDeleted = payload.ok;
    });
    builder.addCase(deleteChannel.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: channelsReducer } = channelsSlice;
