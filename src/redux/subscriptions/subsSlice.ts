import { createSlice } from '@reduxjs/toolkit';
import { getPaymentConfig, getServices, getSubscriptions } from './subsThunk';

export interface Subscription {
  id: number;
  platformId: number;
  billingPeriodId: number;
  currencyId: number;
  price: number;
  platformProductId: string;
  productId: number;
}
export interface Product {
  id: number;
  name: string;
  prices: Subscription[];
  productOrder: number;
  type: number;
}

export interface PayPalConfig {
  userId: string;
}

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
}

export interface SubscriptionConfiguration {
  payPalConfig: PayPalConfig;
  stripeConfig: StripeConfig;
  usedQuota: number;
  limit: number;
  totalQuota: number;
  currentSubscriptionProduct: string;
  upgrade: boolean;
}

const initialStateConfig = {
  loading: false,
  subscriptionConfiguration: [] as SubscriptionConfiguration[],
  error: ''
};


const initialState = {
  products: [] as Product[],
  loading: false,
  error: ''
};

const initialsState = {
  services: [] as Product[],
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
      state.products = payload;
    });
    builder.addCase(getSubscriptions.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const servicesSlice = createSlice({
  name: 'services',
  initialState: initialsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getServices.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.services = payload;
    });
    builder.addCase(getServices.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});


export const getConfigSlice = createSlice({
  name: 'subscriptionConfiguration',
  initialState: initialStateConfig,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentConfig.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getPaymentConfig.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subscriptionConfiguration = payload;
    });
    builder.addCase(getPaymentConfig.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const subscriptionsReducer = subscriptionsSlice.reducer;
export const servicesReducer = servicesSlice.reducer;
export const getConfigReducer = getConfigSlice.reducer;
