import { createSlice } from '@reduxjs/toolkit';
import {
  getOrders,
  processOrders,
  manuallyDispatch,
  stopOrder,
  loadAddressFromOrderLine,
  loadProgressOfOrder
} from './orderThunk';

export interface OrderData {
  channelOAuthIds: [number];
  date: Date;
  imageUrl: string;
  sourceId: number;
  sourceItem: string;
  channelItem: string;
  channelShipping: string;
  channelCurrency: string;
  sourceCurrencyId: null;
  shippingAddressId: number;
  billingAddressId: number;
  channelTax: number;
  channelVAT: number;
  channelPaymentTaxes: number;
  sourceVAT: null;
  sourceShipping: null;
  sourcePath: string;
  storeStatus: number;
  hgrTrackingNumber: null;
  buyReference: string;
  cancelRequested: boolean;
  orderLineId: number;
  id: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  phone: number;
  city: string;
  zip: string;
  province: string;
  country: string;
  countryCode: string;
  provinceCode: string;
  //Added for advance search
  reference: string;
  quantity: number;
  title: string;
  sold: string;
  cost: string;
  fees: number;
  profit?: number;
  margin?: number;
  status: string;
  sourcePrice: number;
  channelPrice: number;
}

const initialState = {
  orders: <unknown>[],
  loading: false,
  error: ''
};

const initiallState = {
  ordersAddress: <unknown>{},
  loading: false,
  error: ''
};

const initialllState = {
  orderProgress: <unknown>{},
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
      state.loading = false;
      state.orders = payload;
    });
    builder.addCase(manuallyDispatch.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const stopOrderSlice = createSlice({
  name: 'stopOrder',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(stopOrder.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(stopOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
    });
    builder.addCase(stopOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const loadAddressOrderLineSlice = createSlice({
  name: 'loadAddress',
  initialState: initiallState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAddressFromOrderLine.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loadAddressFromOrderLine.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ordersAddress = payload;
    });
    builder.addCase(loadAddressFromOrderLine.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const loadOrderProgressSlice = createSlice({
  name: 'stopOrder',
  initialState: initialllState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProgressOfOrder.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loadProgressOfOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.orderProgress = payload;
    });
    builder.addCase(loadProgressOfOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: ordersReducer } = orderSlice;
export const { reducer: orderAddressReducer } = loadAddressOrderLineSlice;
export const { reducer: orderProgressReducer } = loadOrderProgressSlice;
