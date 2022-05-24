import { createSlice } from '@reduxjs/toolkit';
import { getListingServices } from './listingServicesThunk';

export interface ListingService{ 
    quantity: number;
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

export const {reducer: listingServicesReducer} = listingServicesSlice;