import { createSlice } from '@reduxjs/toolkit';
import { getPriceWarrior } from './PriceWarriorThunk';

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
  PriceWarrior: PriceWar[];
  loading: boolean;
  error: string;
}

const initialState: PriceWarriorState = {
  PriceWarrior: [],
  loading: false,
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
      state.PriceWarrior = payload;
    });
    builder.addCase(getPriceWarrior.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: PriceWarriorReducer } = PriceWarriorSlice;
