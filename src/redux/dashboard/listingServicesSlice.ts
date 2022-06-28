import { createSlice } from '@reduxjs/toolkit';
import { getListingServices } from './listingServicesThunk';

export interface ListingService {
  id: number;
  channelOAuthId?: number;
  includedSources: string;
  excludedSources: string;
  minSourcePrice?: number;
  maxSourcePrice?: number;
  minProfit?: number;
  maxProfit?: number;
  notes: string;
  userSubscriptionPaymentId: number;
  updatedOn?: string;
  startedOn?: string;
  endedOn?: string;
  userNotes: string;
  listings: number;
  purchasedOn?: Date;
}

export interface ListingPreferences {
  label: string;
  id: number;
}

const initialState = {
  listingServicesResult: [] as ListingService[],
  loading: false,
  error: ''
};

export const listingServicesSlice = createSlice({
  name: 'dashboard-listing-services',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListingServices.pending, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getListingServices.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listingServicesResult = payload;
    });
    builder.addCase(getListingServices.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: listingServicesReducer } = listingServicesSlice;
