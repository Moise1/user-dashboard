import { createSlice } from '@reduxjs/toolkit';
import {getListings} from './listingsThunk';

export interface Listing {
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
  listings: {} as Listing,
  loading: false,
  error: ''
};


export const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListings.pending, (state)=>{
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getListings.fulfilled, (state, { payload })=>{
      state.loading = false;
      state.listings = payload;
    });
    builder.addCase(getListings.rejected, (state, { payload })=>{
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const {reducer: listingsReducer} = listingsSlice;
