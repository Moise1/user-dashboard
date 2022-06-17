import { createSlice } from '@reduxjs/toolkit';
import { getListings, getListingsImages, getListingsSource, getManualListings, getPendingListings, getTerminatedListings } from './listingsThunk';
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
  createdOn: Date;
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

export interface PendingListings {
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
  channelListingId: number;
}

export type TerminatedListings = PendingListings;


export interface ListingsData {
  createdBy: number;
  ignoreVero: boolean | undefined;
  ignoreOOS: boolean | undefined;
  reviewBeforePublishing: boolean | undefined;
  listFrequencyMinutes: number;
  dontListUntil?: Date;
  listings: string[][];
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
  pendingListings: <unknown>[],
  manualListings: <unknown>[],
  terminatedListings: <unknown>[],
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
    });
    builder.addCase(getListings.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const getManualListingsSlice = createSlice({
  name: 'manualListings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManualListings.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getManualListings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.manualListings = payload.responseObject;
    });
    builder.addCase(getManualListings.rejected, (state, { payload }) => {
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
    builder.addCase(getPendingListings.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getPendingListings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.pendingListings = [...payload.listings];
      state.sourceListings = payload.sources;
    });
    builder.addCase(getPendingListings.rejected, (state, { payload }) => {
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
    builder.addCase(getTerminatedListings.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getTerminatedListings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.terminatedListings = [...payload.listings];
    });
    builder.addCase(getTerminatedListings.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const GetListingsImagesSlice = createSlice({
  name: 'activeListingsImages',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListingsImages.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getListingsImages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.terminatedListings = [...payload.listings];
    });
    builder.addCase(getListingsImages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: listingsReducer } = listingsSlice;
export const { reducer: listingsSourceReducer } = getListingsSourceSlice;
export const { reducer: manualListingsReducer } = getManualListingsSlice;
export const { reducer: pendingListingsReducer } = PendingListingsSlice;
export const { reducer: terminatedListingsReducer } = TerminateListingsSlice;
export const { reducer: GetListingsImagesSliceReducer } = GetListingsImagesSlice;
