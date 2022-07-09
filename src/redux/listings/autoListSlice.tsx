import { createSlice } from '@reduxjs/toolkit';
import { getAutolist, saveAutolist } from './autoListThunk';
import { eChannelListingStatus } from './listingsSlice';

export type BulkListingsDataToSave = {
  createdBy: number;
  ignoreVero: boolean | undefined;
  ignoreOOS: boolean | undefined;
  reviewBeforePublishing: boolean | undefined;
  listFrequencyMinutes: number;
  dontListUntil?: Date;
  listings: string[][];
}

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
  autoList: Autolist | null,
  loading: boolean;
  error: string
}

const initialState: AutoListState = {
  autoList: null,
  loading: false,
  error: ''
};

export type BulkListingLog = {
  id: number;
  url: string;
  status: eBulkListingStatus;
  createdOn?: Date;
  errorCode?: BulkListingError;
  channelItem: string;
  channelListingStatus: eChannelListingStatus;
  verifiedOn: Date;
  listedOn: Date;
}

export type ListingsSummary = {
  requestId: string;
  done: number;
  forbiddenWordsUrls: string[];
  duplicatedUrls: string[];
  existingListingUrls: string[];
  invalidSourceUrls: string[];
  noQuota: number;
  notDone: number;
}

export enum eBulkListingStatus {
  UNKNOWN = 0,
  INITIAL = 1,
  PROCESSING = 20,
  DONE = 200,
  ERROR = 400,
  TEMPORAL_ERROR = 401
}

export enum BulkListingError {
  UNKOWN = 0,
  INVALID_ORDER = 1,
  SCRAPING = 2,
  INVALID_TOKEN = 3,
  NO_CATEGORY = 4,
  VERO = 5,
  ZERO_TOKENS = 6,
  OOS = 7
}

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


export const { reducer: autoListReducer } = autoListSlice;