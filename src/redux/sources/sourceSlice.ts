import { createSlice } from '@reduxjs/toolkit';
import { getSources } from './sourcesThunk';


export interface Source {
  id: number;
  baseUrl: string;
  name: string;
  site:  string | number;
  recommended: boolean;
  catalogAllowed: boolean;
  manualAllowed: boolean;
  bulkAllowed: boolean;
  privateSupplier: boolean;
  listingServiceAllowed: number;
  autoOrderingFee:null| number;
  hasAutoOrder:boolean;
}

export interface SourcesState {
  sources: Source[],
  loading: boolean,
  error: string
}

const initialState: SourcesState = {
  sources: [],
  loading: false,
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

export const { reducer: sourcesReducer } = sourceSlice;
