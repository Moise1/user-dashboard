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
      // console.log('response', res.data.response_data.orders);
      console.log('The response from orders slice api', res);
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

export const processOrders = createAsyncThunk('sales/processOrder', async (orderLineId: number, thunkAPI) => {
  try {
    const res = await client.post('Sales/ProcessOrderLine', { orderLineId });
    console.log('The process order api responsed', res);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const manuallyDispatch = createAsyncThunk('sales/manuallyDispatch', async (orderLineId: number, thunkAPI) => {
  try {
    const res = await client.post('/Sales/ManuallyDispatchOrderLine', { orderLineId });
    console.log('The manually dispatch api responsed', res);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const stopOrder = createAsyncThunk('sales/stopOrder', async (orderLineId: number, thunkAPI) => {
  try {
    const res = await client.post('/Sales/StopOrderLine', { orderLineId });
    console.log('The stop order api responsed', res);

    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const loadAddressFromOrderLine = createAsyncThunk(
  'sales/loadAddressFromOrderLine',
  async (orderLineId: orderDataType, thunkAPI) => {
    try {
      console.log('The orderlineid', orderLineId);
      const res = await client.post('Sales/LoadAddressesFromOrderLine', { orderLineId });
      console.log('The load address api response is', res.data.response_data);
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const loadProgressOfOrder = createAsyncThunk('salessss/loadProgressOfTheOrder', async (id: number, thunkAPI) => {
  try {
    const res = await client.post('/Sales/LoadProgress', { id });
    console.log('To see the progress of order', res.data.response_data.orderProgress);

    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
