import { createSlice } from '@reduxjs/toolkit';
import { createNewChannel, getEbayLinkAccount, getShopifyLinkAccount } from './newChannelThunk';

export interface LinkAccount {
  shop: number;
  site: number;
}

const initialState = {
  url: '',
  getLinkLoading: false,
  newChannelLoading: false,
  success: false,
  error: ''
};

export const newChannelSlice = createSlice({
  name: 'new-channel',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get the eBay link account
    builder.addCase(getEbayLinkAccount.pending, (state) => {
      state.getLinkLoading = true;
      state.error = '';
    });
    builder.addCase(getEbayLinkAccount.fulfilled, (state, { payload }) => {
      state.getLinkLoading = false;
      state.url = payload;
    });
    builder.addCase(getEbayLinkAccount.rejected, (state, { payload }) => {
      state.getLinkLoading = false;
      state.error = String(payload);
    });

    // Get the Shopify link account
    builder.addCase(getShopifyLinkAccount.pending, (state) => {
      state.getLinkLoading = true;
      state.error = '';
    });
    builder.addCase(getShopifyLinkAccount.fulfilled, (state, { payload }) => {
      state.getLinkLoading = false;
      state.url = payload;
    });
    builder.addCase(getShopifyLinkAccount.rejected, (state, { payload }) => {
      state.getLinkLoading = false;
      state.error = String(payload);
    });

    // Create new channel 
    builder.addCase(createNewChannel.pending, (state) => {
      state.newChannelLoading = true;
      state.error = '';
    });
    builder.addCase(createNewChannel.fulfilled, (state, { payload }) => {
      state.newChannelLoading = false;
      state.success = payload?.success;
    });
    builder.addCase(createNewChannel.rejected, (state, { payload }) => {
      state.newChannelLoading = false;
      state.success = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: newChannelReducer } = newChannelSlice;
