import { createSlice } from '@reduxjs/toolkit';
import { getPriceWarrior, UpdateSettings } from './PriceWarriorThunk';

export interface PWSetting {
  id?: number;
  userId?: string;
  markup?: number;
  active: boolean;
  updatedOn?: Date;
  validUntil?: Date;
  transactionId?: string;
  undercutBy?: number;
  threshold?: number;
  repricing: boolean;
}

export interface PWListing {
  id: number;
  title: string;
  ebayItemId: string;
  competitor: string;
  competitorItemId: string;
  price: number;
  sourcePrice: number;
  competitorPrice: number;
  lost: boolean;
  priceWarEnabled: boolean;
  updated?: Date;
  priceLastUpdated?: Date;
  site?: string;
  sold: number;
  ebayUrl: string;
  competitorUrl: string;
  competitorItemUrl: string;
}

export interface PriceWar {
  PriceWarrior: PriceWar[];
  loading: boolean;
  settings: {
    id: number;
    userId: string;
    markup: number;
    active: boolean;
    updatedOn: Date;
    validUntil: Date;
    transactionId: string;
    undercutBy: number;
    threshold: number;
    repricing: boolean;
  };
  listings: string[];
}

export interface PriceWarriorState {
  priceWarrior: PriceWar[];
  loading: boolean;
  responseObect: unknown;
  error: string;
}

const initialState: PriceWarriorState = {
  priceWarrior: [],
  loading: false,
  responseObect: <unknown>[],
  error: ''
};

export const PriceWarriorSlice = createSlice({
  name: 'PriceWarrior',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPriceWarrior.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getPriceWarrior.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.priceWarrior = payload;
    });
    builder.addCase(getPriceWarrior.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
    builder.addCase(UpdateSettings.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(UpdateSettings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.responseObect = payload.data.respose_data;
    });
    builder.addCase(UpdateSettings.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: PriceWarriorReducer } = PriceWarriorSlice;
