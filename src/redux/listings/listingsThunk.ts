/* eslint-disable no-var */
/* eslint-disable indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import unmap, { ActiveListing, compArray } from '../../redux/unmap';

export const getListings = createAsyncThunk(
  'listings/getListings',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      console.log('calling listing api');
      const res = await client.get('/SearchProduct/GetActiveListings');
      const iter = unmap(res.data.response_data?.data as compArray);
      console.log(res.data.response_data);
      // console.log({ iter });
      console.log({ t: res?.data?.response_data });
      const rv: ActiveListing[] = [];
      let status = iter.next();
      while (!status.done) {
        const itm = status.value as ActiveListing;
        // console.log({ itm });
        // itm.variationAtributes = res.data.response_data?.data.variationAtributes[itm.channelListingId];
        rv.push(itm);
        status = iter.next();
      }
      // for (var x in res.data.response_data.sources) {
      //   console.log(res.data.response_data.sources[x].name);
      // }
      const arrayLists = rv.map((item, key) => ({ ...item, key: key }));
      // console.log('this is rowSelection', { rv, arrayLists });
      // console.log('tested', res.data.response_data.sources);
      // return res.data.response_data;
      console.log('Set of Data',{arrayLists});
      return arrayLists;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong!!! ):');
    }
  }
);

export const getListingsSource = createAsyncThunk(
  'sources/getListingsSource',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/SearchProduct/GetActiveListings');
      var array = [];
      for (var x in res.data.response_data.sources) {
        array.push(res.data.response_data.sources[x]);
      }
      return array;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getPendingListing = createAsyncThunk('listings/getPendingListing', async (_, { rejectWithValue }) => {
  try {
    const res = await client.get('/SearchProduct/getPendingListings');
    var data = res?.data?.response_data;
    return data;
  } catch (error) {
    return rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const getTerminateListings = createAsyncThunk(
  'listings/getTerminatedListings',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/SearchProduct/getTerminatedListings');
      var data = res?.data?.response_data;
      return data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

// export const getsListings = createAsyncThunk(
//   'listings/getListings',
//   async (batchId: string, { rejectWithValue } /* destructured thunkAPI's prop */) => {
//     try {
//       console.log('calling listings api');
//       const res = await client.post('/Listing/Bulk/GetListingStatus', batchId);
//       console.log(res.data.response_data);
//       return res.data.response_data;
//     } catch (error) {
//       return rejectWithValue('Sorry! Something went wrong ): ');
//     }
//   }
// );
