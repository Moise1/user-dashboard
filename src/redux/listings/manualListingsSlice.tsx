import { createSlice } from "@reduxjs/toolkit";
import { getManualListings } from "./manualListingsThunk";

export type ManualListingState = {
  manualListings: any[];//TODO: Type! This is unnaceptable
  loading: boolean;
  error: string;
}

const initialState: ManualListingState = {
  manualListings: [],
  loading: false,
  error: ''
}

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
