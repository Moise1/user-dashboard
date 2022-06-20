import { createSlice } from '@reduxjs/toolkit';
import { createNewChannel, getLinkAccount } from './newChannelThunk';

export interface LinkAccount {
  shop: number;
  site: number;
}

const initialState = {
  url: '',
  loading: false,
  alreadyExists: null,
  error: ''
};

export const newChannelSlice = createSlice({
  name: 'new-channel',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get a link account
    builder.addCase(getLinkAccount.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getLinkAccount.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.url = payload;
    });
    builder.addCase(getLinkAccount.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    // Create new channel 
    builder.addCase(createNewChannel.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(createNewChannel.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.alreadyExists = payload;
    });
    builder.addCase(createNewChannel.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: newChannelReducer } = newChannelSlice;
