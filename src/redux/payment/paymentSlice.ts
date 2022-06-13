import { createSlice } from '@reduxjs/toolkit';
import { CreateCheckoutSession } from './paymentThunk';


export interface CreateCheckoutSessionRequest {
  lineItems: LineItem[];
  mode: string; // payment, setup, subscription
  successUrl: string;
  cancelUrl: string;
  upgradingSubscription: boolean;
}

export interface CreateCheckoutSessionResponse {
  checkoutSessionId: string;
  alreadyDone: boolean;
}

export interface LineItem {
  platformProductId: string;
  quantity: number;
}

const initialState = {
  responseObect: <unknown>[],
  loading: false,
  error: '',
};

export const paymentSlice = createSlice({
  name: 'responseObect',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCheckoutSession.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(CreateCheckoutSession.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.responseObect = payload;
    });
    builder.addCase(CreateCheckoutSession.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});


export const { reducer: paymentReducer } = paymentSlice;
