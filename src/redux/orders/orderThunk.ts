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

export const getOrders = createAsyncThunk(
  'search/getSearch',
  async ({ channelOAuthIds }: { channelOAuthIds: OrderData['channelOAuthIds'] }, thunkAPI) => {
    try {
      const res = await client.post('/Sales/Search', { channelOAuthIds });
      // console.log('response', res.data.response_data.orders);
      const data = res.data.response_data.orders.map((item: OrderData, key: number): unknown => ({
        ...item,
        date: new Date(item?.date),
        key
      }));
      console.log({ data });
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

export const processOrders = createAsyncThunk(
  'sales/loadProgress',
  async ({ channelOAuthIds }: { channelOAuthIds: OrderData['channelOAuthIds'] }, thunkAPI) => {
    try {
      const res = await client.post('/Sales/LoadProgress', { channelOAuthIds });
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