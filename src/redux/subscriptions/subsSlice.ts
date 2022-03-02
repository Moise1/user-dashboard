import { createSlice } from '@reduxjs/toolkit';
import { getSubscriptions } from './subsThunk';

interface Subscription {
    id: number;
    platformId: string;
    billingPeriodId: number;
    currencyId: number;
    price: number;
    platformProductId: string;
    productId: number;
  
  }
export interface Product{
 id: number;
 name: string;
 prices: Subscription[]
 productOrder: number;
 type: number;
}


const initialState = {
  products: [] as Product[],
  loading: false,
  error: ''
};

export const subscriptionsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscriptions.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getSubscriptions.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.products = payload.products;
    });
    builder.addCase(getSubscriptions.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
