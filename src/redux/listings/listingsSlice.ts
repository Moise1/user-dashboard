import { createSlice } from '@reduxjs/toolkit';
import { getListings, getListingsSource, getPendingListing, getTerminateListings } from './listingsThunk';
export interface ListingData {
  imageUrl: string;
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
  isLowestPrice: null;
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

export interface pending_listings {
  categoryId: number;
  channelOAuthId: number;
  createdById: number;
  createdByName: string;
  createdOn: Date;
  id: number;
  imageUrl: string;
  path: string;
  sourceId: number;
  status: number;
  title: string;
  pending: boolean;
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
  pending_listings: <unknown>[],
  terminate_listings: <unknown>[],
  loading: false,
  error: '',
  sourceListings: <unknown>{}
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
      // console.log('listing', { payload });
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

export const PendingListingsSlice = createSlice({
  name: 'pendingListings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPendingListing.pending, (state) => {
      // console.log('in pending', { state });
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getPendingListing.fulfilled, (state, { payload }) => {
      // console.log('pending', { pending_listings: payload.listings });
      state.loading = false;
      state.pending_listings = [...payload.listings];
      state.sourceListings = payload.sources;
      // console.log({ state });
    });
    builder.addCase(getPendingListing.rejected, (state, { payload }) => {
      // console.log('rejected');
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const TerminateListingsSlice = createSlice({
  name: 'terminateListings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTerminateListings.pending, (state) => {
      // console.log('in pending', { state });
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getTerminateListings.fulfilled, (state, { payload }) => {
      // console.log('terminated', { terminate_listings: payload.listings });
      state.loading = false;
      state.terminate_listings = [...payload.listings];
      // console.log({ state });
    });
    builder.addCase(getTerminateListings.rejected, (state, { payload }) => {
      // console.log('reject');
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: listingsReducer } = listingsSlice;
export const { reducer: listingsSourceReducer } = getListingsSourceSlice;
export const { reducer: pendingListingsReducer } = PendingListingsSlice;
export const { reducer: terminateListingsReducer } = TerminateListingsSlice;
