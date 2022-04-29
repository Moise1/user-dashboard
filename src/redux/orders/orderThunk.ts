/* eslint-disable no-var */
/* eslint-disable indent */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { OrderData } from './orderSlice';
// import unmap, { ActiveListing, compArray } from '../../redux/unmap';
// export const getOrders = createAsyncThunk(
//   'orders/getOrders',
//   async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
//     try {
//       // console.log('calling listing api');
//       const res = await client.get('/Sales/Search');
//       const iter = unmap(res.data.response_data?.data as compArray);
//       const rv: ActiveListing[] = [];
//       let status = iter.next();
//       while (!status.done) {
//         const itm = status.value as ActiveListing;
//         // console.log({ itm });
//         // itm.variationAtributes = res.data.response_data?.data.variationAtributes[itm.channelListingId];
//         rv.push(itm);
//         status = iter.next();
//       }
//       // for (var x in res.data.response_data.sources) {
//       //   console.log(res.data.response_data.sources[x].name);
//       // }
//       const arrayLists = rv;
//       // console.log('this is rowSelection', { rv, arrayLists });
//       console.log('order slice', res.data.response_data);
//       // return res.data.response_data;
//       return arrayLists;
//     } catch (error) {
//       return rejectWithValue('Sorry! Something went wrong ):');
//     }
//   }
// );

export type orderDataType = Date | string | number | null | boolean | undefined;

export const getOrders = createAsyncThunk(
  'search/getSearch',
  async ({ channelOAuthIds }: { channelOAuthIds: OrderData['channelOAuthIds'] }, thunkAPI) => {
    try {
      const res = await client.post('/Sales/Search', { channelOAuthIds });
      // console.log('response', res.data.response_data.orders);
      // console.log('The response', res);
      const data = res.data.response_data.orders.map((item: OrderData, key: number): unknown => ({
        ...item,
        date: new Date(item?.date),
        key
      }));
      // console.log('The order api repsonse on wednesday is', res);
      return data;
      // const iter = unmap(res.data.response_data?.orders as compArray);
      // const rv: ActiveListing[] = [];
      // let status = iter.next();
      // while (!status.done) {
      //   const itm = status.value as ActiveListing;
      //   // console.log({ itm });
      //   // itm.variationAtributes = res.data.response_data?.data.variationAtributes[itm.channelListingId];
      //   rv.push(itm);
      //   status = iter.next();
      // }
      // const arrayLists = rv.map((item, key) => ({ ...item, key: key }));
      // return arrayLists;
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
