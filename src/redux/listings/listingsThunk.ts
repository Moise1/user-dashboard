import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import unmap, { ActiveListing, compArray } from '../../redux/unmap';
import { toastAlert } from '../../utils/toastAlert';
import { ListingsData } from './listingsSlice';

export const getListings = createAsyncThunk(
  'listings/getListings',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/SearchProduct/GetActiveListings');
      const iter = unmap(res.data.response_data?.data as compArray);

      const rv: ActiveListing[] = [];
      let status = iter.next();
      while (!status.done) {
        const itm = status.value as ActiveListing;
        rv.push(itm);
        status = iter.next();
      }
      const arrayLists = rv.map((item, key) => {
        return { ...item, key };
      });
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
      const array = [];
      for (const x in res.data.response_data.sources) {
        array.push(res.data.response_data.sources[x]);
      }
      return array;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getPendingListings = createAsyncThunk(
  'listings/getPendingListing', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/SearchProduct/getPendingListings');
      const data = res?.data?.response_data;
      return data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  });

export const getTerminatedListings = createAsyncThunk(
  'listings/getTerminatedListings',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/SearchProduct/getTerminatedListings');
      const data = res?.data?.response_data;
      return data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getManualListings = createAsyncThunk(
  'Listing/ManualListing',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/Listing/ManualListing');
      const data = res?.data?.response_data;
      return data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);


export const SaveAutolist = createAsyncThunk('Listing/SaveAutolist', async (data: ListingsData, thunkAPI) => {
  try {
    const res = await client.post('Listing/SaveAutolist', data);
    if (res.status === 200) toastAlert('Source updated successfully!', 'success');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
