import { createSlice } from '@reduxjs/toolkit';
import { getSources, getSourcesForListing } from './sourcesThunk';


export interface Source {
  id: number;
  baseUrl: string;
  name: string;
  site: number;
  recommended: boolean;
  catalogAllowed: boolean;
  manualAllowed: boolean;
  bulkAllowed: boolean;
  privateSupplier: boolean;
  listingServiceAllowed: number;
}

export interface SourceState {
  sources: Source[],
  loading: boolean,
  error: string
}

const initialState: SourceState = {
  sources: [],
  loading: false,
  error: ''
};

export interface ListingSource {
  listingSource: Source[],
  sourcesLoading: boolean,
  error: string
}

const initialsState: ListingSource = {
  listingSource: [],
  sourcesLoading: false,
  error: ''
};

export const sourceSlice = createSlice({
  name: 'sources',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSources.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getSources.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.sources = payload?.sources;
    });
    builder.addCase(getSources.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const listingSourceSlice = createSlice({
  name: 'listingSource',
  initialState: initialsState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getSourcesForListing.pending, (state) => {
      state.sourcesLoading = true;
      state.error = '';
    });
    builder.addCase(getSourcesForListing.fulfilled, (state, { payload }) => {
      state.sourcesLoading = false;
      state.listingSource = payload?.sources;
    });
    builder.addCase(getSourcesForListing.rejected, (state, { payload }) => {
      state.sourcesLoading = false;
      state.error = String(payload);
    });
  }
});


export const { reducer: sourcesReducer } = sourceSlice;
export const { reducer: listingSourceReducer } = listingSourceSlice;
