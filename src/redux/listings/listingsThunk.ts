import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import unmap, { ActiveListing, compArray } from '../../redux/unmap';

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

export const getPendingListing = createAsyncThunk(
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

export const getTerminateListings = createAsyncThunk(
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
