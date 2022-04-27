import { createSlice } from '@reduxjs/toolkit';
import { getOrders, processOrders, manuallyDispatch } from './orderThunk';
// export interface OrderData {
//   id: number;
//   channelOAuthId: number;
//   createdOn: Date;
//   lastProcessedOn: null;
//   productSourceId: null;
//   url: null;
//   finishedOn: null;
//   status: number;
//   errorCode: null;
//   errorMessage: null;
//   title: null;
//   listOOS: null;
//   optimizeTitle: null;
//   ignoreVero: null;
//   needsReview: null;
//   createdById: null;
//   origin: null;
//   dontListUntil: null;
//   retries: number;
//   channelListingId: null;
//   batchId: string;
// }

export interface OrderData {
  channelOAuthIds: [number];
  date: Date;
  reference: string;
  title: string;
  imageUrl: string;
  sourceId: number;
  sourceItem: string;
  channelItem: string;
  quantity: number;
  channelPrice: number;
  channelShipping: string;
  channelCurrency: string;
  sourcePrice: null;
  sourceCurrencyId: null;
  status: string;
  shippingAddressId: number;
  billingAddressId: number;
  channelTax: number;
  channelVAT: number;
  channelPaymentTaxes: number;
  sourceVAT: null;
  sourceShipping: null;
  sourcePath: string;
  fees: number;
  storeStatus: number;
  hgrTrackingNumber: null;
  buyReference: string;
  cancelRequested: boolean;
  profit?: number;

  //added on 26april
  orderLineId: number;
  id: number;
}

const initialState = {
  orders: <unknown>[],
  loading: false,
  error: ''
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      console.log({ payload });
      state.loading = false;
      state.orders = payload;
    });
    builder.addCase(getOrders.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const processOrdersSlice = createSlice({
  name: 'processOrders',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(processOrders.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(processOrders.fulfilled, (state, { payload }) => {
      console.log({ payload });
      state.loading = false;
      state.orders = payload;
    });
    builder.addCase(processOrders.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const manuallyDispatchSlice = createSlice({
  name: 'manuallyDispatch',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(manuallyDispatch.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(manuallyDispatch.fulfilled, (state, { payload }) => {
      console.log({ payload });
      state.loading = false;
      state.orders = payload;
    });
    builder.addCase(manuallyDispatch.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: ordersReducer } = orderSlice;
