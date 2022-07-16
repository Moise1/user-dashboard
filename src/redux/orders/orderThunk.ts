/* eslint-disable no-var */
/* eslint-disable indent */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { OrderData } from './orderSlice';

export type orderDataType = Date | string | number | null | boolean | undefined;

export const getOrders = createAsyncThunk(
  'search/getSearch',
  async ({ channelOAuthIds }: { channelOAuthIds: OrderData['channelOAuthIds'] }, thunkAPI) => {
    try {
      const res = await client.post('/Sales/Search', { channelOAuthIds });
      const data = res.data.response_data.orders.map((item: OrderData, key: number): unknown => ({
        ...item,
        date: new Date(item?.date),
        key
      }));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const processOrders = createAsyncThunk(
  'sales/processOrder',
  async (orderLineIds: OrderData | number[], thunkAPI) => {
    try {
      const res = await client.post('/Sales/ProcessOrderLine', { orderLineIds });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const manuallyDispatch = createAsyncThunk(
  'sales/manuallyDispatch',
  async (orderLineIds: OrderData | number[], thunkAPI) => {
    try {
      const res = await client.post('/Sales/ManuallyDispatchOrderLine', { orderLineIds });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const stopOrder = createAsyncThunk('sales/stopOrder', async (orderLineIds: OrderData | number[], thunkAPI) => {
  try {
    const res = await client.post('/Sales/StopOrderLine', { orderLineIds });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const loadAddressFromOrderLine = createAsyncThunk(
  'sales/loadAddressFromOrderLine',
  async (orderLineId: orderDataType, thunkAPI) => {
    try {
      const res = await client.post('/Sales/LoadAddressesFromOrderLine', { orderLineId });
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const loadProgressOfOrder = createAsyncThunk(
  'salessss/loadProgressOfTheOrder',
  async (id: OrderData | number, thunkAPI) => {
    try {
      const res = await client.post('/Sales/LoadProgress', { id });
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
