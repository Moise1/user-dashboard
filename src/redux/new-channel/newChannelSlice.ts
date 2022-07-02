import { createSlice } from '@reduxjs/toolkit';
import { createNewChannel, getEbayLinkAccount, getShopifyLinkAccount } from './newChannelThunk';

export interface LinkAccount {
  shop: number;
  site: number;
}

const initialState = {
  ebayUrl: '',
  shopifyUrl: '',
  getLinkLoading: false,
  newChannelLoading: false,
  statusCode: 0,
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
      state.ebayUrl = payload;
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
      state.shopifyUrl = payload;
    });
    builder.addCase(getShopifyLinkAccount.rejected, (state, { payload }) => {
      state.getLinkLoading = false;
      state.error = String(payload);
    });

    // Create new channel 
    builder.addCase(createNewChannel.pending, (state) => {
      state.newChannelLoading = true;
      state.error = '';
      state.statusCode = 0;
    });
    builder.addCase(createNewChannel.fulfilled, (state, { payload }) => {
      state.newChannelLoading = false;
      state.success = payload?.data.response_data;
      state.statusCode = payload.status;

    });
    builder.addCase(createNewChannel.rejected, (state, { payload }) => {
      state.newChannelLoading = false;
      state.success = false;
      state.error = String(payload);
      state.statusCode = 0;
    });
  }
});

export const { reducer: newChannelReducer } = newChannelSlice;
