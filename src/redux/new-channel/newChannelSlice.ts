import { createSlice } from '@reduxjs/toolkit';
import { getLinkAccount } from './newChannelThunk';

export interface LinkAccount {
  shop: number;
  site: number;
}

const initialState = {
  url: '',
  loading: false,
  error: ''
};

export const newChannelSlice = createSlice({
  name: 'new-channel',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  }
});

export const { reducer: newChannelReducer } = newChannelSlice;
