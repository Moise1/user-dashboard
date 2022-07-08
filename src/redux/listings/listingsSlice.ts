import { createSlice } from '@reduxjs/toolkit';
import { MiniSettings } from '../../types/mini-settings';
import { getListings, getPendingListings, getTerminatedListings } from './listingsThunk';

export type ActiveListing = {
  id: number;
  userProductSourceChannelId: number;
  channelListingId: number;
  channelOAuthId: number;
  channelItem: string; //Item Id
  channelQuantity: number;
  sourcePrice: number;
  channelPrice: number;
  title: string;
  createdOn: Date;
  status: number;
  productSourceId: number;
  lastTimeInStock: Date;
  sourceQuantity: number;
  views: number;
  watches: number;
  quantitySold: number;
  lastTimeSold: Date;
  productNotes: string;
  overrides: MiniSettings;
  sourceId: number;
  sourcePath: string;
  createdById: number;
  createdByName: string;
  updatedOn: Date;
  price?: number;
  endsOn: Date;
  asin?: string;
  isLowestPrice?: boolean;
  lowestPrice?: number;
  buyBoxPrice?: number;
  origin: eChannelListingOrigin;
  variationAtributes: ChannelListingVariationAttributeOption[];
}
export type ChannelListingVariationAttributeOption = {
  id: number;
  channelListingId: number;
  attribute: string;
  option: string;
}

export enum eChannelListingOrigin {
  Unknown = 0,
  Extension = 1,
  BulkLister = 2,
  CompeliaImporter = 3,
  ExistingChannelListing = 4,
  RelistedDiscoveredBySync = 5,
  SmartLister = 6,
  Migration = 8,
  Relisted = 16,
  ManuallyByAnAdmin = 32,
  Catalog = 64,
  WeListForYou = 128
}

export type PendingListing = {
  id: number;
  categoryId: number;
  channelOAuthId: number;
  createdById: number;
  createdByName: string;
  createdOn: Date;
  imageUrl: string;
  path: string;
  sourceId: number;
  status: number;
  title: string;
  pending: boolean;
  channelListingId: number;
}

export type TerminatedListings = PendingListing;

export enum eChannelListingStatus {
  Unknown = 0x0,
  PreparedForFirstListing = 0x1,
  QueuedForWork = 0x2,
  TemporaryFailure = 0x4,
  PermanentFailure = 0x8,
  Retrying = 0x10,
  InvalidUserCredentials = 0x20,
  ListingCreatedSuccessfully = 0x40,
  RetryingTwice = 0x80,
  RetryingFinal = 0x100,
  ExceptionThrown = 0x200,
  CreatingListing = 0x400,
  Removed = 0x800,
  Terminated = 0x1000,
  PendingForScraping = 0x2000,
  PendingToReview = 0x4000,
  BULK = 0x8000,
  BulkScraping = 0x10000,
  ImportedWaitingForChannelData = 0x20000,
  PendingForRelist = 0x40000,
  Relisted = 0x80000,
  ListingInStore = 0x100000,
  ListingVariation = 0x200000,
  BulkApiCreated = -2147483648
}

export type ListingsSource = {
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

export type ListingsState = {
  activeListings: ActiveListing[] | null;
  loadingActive: boolean;

  pendingListings: PendingListing[] | null;
  loadingPending: boolean;

  terminatedListings: TerminatedListings[] | null;
  loadingTerminated: boolean;

}

const initialState: ListingsState = {
  activeListings: null,
  pendingListings: null,
  terminatedListings: null,
  loadingActive: false,
  loadingTerminated: false,
  loadingPending: false
};


export const listingsSlice = createSlice({
  name: 'listings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //ACTIVE
    builder.addCase(getListings.pending, (state) => {
      state.loadingActive = true;
    });
    builder.addCase(getListings.fulfilled, (state, { payload }) => {
      state.loadingActive = false;
      state.activeListings = payload;
    });
    builder.addCase(getListings.rejected, (state) => {
      state.loadingActive = false;
    });

    //PENDING
    builder.addCase(getPendingListings.pending, (state) => {
      state.loadingPending = true;
    });
    builder.addCase(getPendingListings.fulfilled, (state, { payload }) => {
      state.loadingPending = false;
      state.pendingListings = payload;
    });
    builder.addCase(getPendingListings.rejected, (state) => {
      state.loadingPending = false;
    });

    //TERMINATED
    builder.addCase(getTerminatedListings.pending, (state) => {
      state.loadingTerminated = true;
    });
    builder.addCase(getTerminatedListings.fulfilled, (state, { payload }) => {
      state.loadingTerminated = false;
      state.terminatedListings = payload;
    });
    builder.addCase(getTerminatedListings.rejected, (state) => {
      state.loadingTerminated = false;
    });

    //Load Image
    //builder.addCase(getListingsImages.pending, (state) => {
    //  state.loading = true;
    //  state.error = '';
    //});
    //builder.addCase(getListingsImages.fulfilled, (state, { payload }) => {
    //  state.loading = false;
    //  state.terminatedListings = [...payload.listings];
    //});
    //builder.addCase(getListingsImages.rejected, (state, { payload }) => {
    //  state.loading = false;
    //  state.error = String(payload);
    //});
  }
});

export const { reducer: listingsReducer } = listingsSlice;
