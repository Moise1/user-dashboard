import { createSlice } from "@reduxjs/toolkit";
import { getAutolist, saveAutolist } from "./autoListThunk";
import { BulkListingLog, ListingsSummary } from "./listingsSlice";

export type Autolist = {
  logs: BulkListingLog[];
  listFrequencyMinutes: null;
  request: string;
  createdBy: null;
  ignoreVero: null;
  ignoreOOS: null;
  reviewBeforePublishing: null;
  channelOAuthId: null;
  maxQuantityLimit: null;
  rawUrls: null;
  channelId: null;
  Sources: null;
  summary: ListingsSummary;
  dontListUntil: null;
}

export type AutoListState = {
  autoList: Autolist[],
  loading: boolean;
  error: string
}

const initialState: AutoListState = {
  autoList: [],
  loading: false,
  error: ''
};


export const autoListSlice = createSlice({
  name: 'autoList',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutolist.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getAutolist.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.autoList = payload;
    });
    builder.addCase(getAutolist.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
    builder.addCase(saveAutolist.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(saveAutolist.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.autoList = payload;
    });
    builder.addCase(saveAutolist.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});
