import { createSlice } from '@reduxjs/toolkit';
import { getListings, getListingsSource } from './listingsThunk';
export interface ListingData {
  asin: null;
  buyBoxPrice: null;
  channelItem: string;
  channelListingId: number;
  channelPrice: number;
  channelQuantity: number;
  createdById: number;
  createdByName: string;
  createdOn: string;
  endsOn: null;
  id: number;
  isLowestPrice: null,
  key: number;
  lastTimeInStock: string;
  lastTimeSold: null;
  lowestPrice: null;
  origin: undefined;
  overrides: undefined;
  price: number;
  productNotes: null;
  productSourceId: number;
  quantitySold: number;
  sourceId: number;
  sourcePath: string;
  sourcePrice: number;
  sourceQuantity: number;
  status: number;
  title: string;
  updatedOn: string;
  userProductSourceChannelId: number;
  views: number;
  watches: number;
}

export interface ListingsSource {
  id: number;
  channelOAuthId: number;
  createdOn: Date;
  lastProcessedOn: null;
  productSourceId: null;
  url: null;
  finishedOn: null;
  status: number;
  errorCode: null;
  errorMessage: null;
  title: null;
  listOOS: null;
  optimizeTitle: null;
  ignoreVero: null;
  needsReview: null;
  createdById: null;
  origin: null;
  dontListUntil: null;
  retries: number;
  channelListingId: null;
  batchId: string;
}

const initialState = {
  listings: <unknown>[],
  loading: false,
  error: ''
};

const initialStatee = {
  sourceListings: <unknown>[],
  loading: false,
  error: ''
};

export const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListings.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getListings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listings = payload;
    });
    builder.addCase(getListings.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const getListingsSourceSlice = createSlice({
  name: 'sourceListings',
  initialState: initialStatee,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListingsSource.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getListingsSource.fulfilled, (state, { payload }) => {
      state.loading = false;
      // console.log({ mypayload: payload });
      state.sourceListings = payload;
    });
    builder.addCase(getListingsSource.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: listingsReducer } = listingsSlice;
export const { reducer: listingsSourceReducer } = getListingsSourceSlice;
