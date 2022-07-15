import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { ActiveListing, PendingListing, TerminatedListings } from './listingsSlice';
import unmap, { compArray } from './unmap';

export type ListingImageUrlList = { id: number, url: string }[];

const loadActiveImagesFromCache = () => {
  const imgS = localStorage.getItem('listings.active.images');
  return (imgS ? JSON.parse(imgS) : []) as ListingImageUrlList;
};
export const saveActiveListingsImagesInCache = (data: ListingImageUrlList) => {
  localStorage.setItem('listings.active.images', JSON.stringify(data));
};

export const getActiveListings = createAsyncThunk(
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

      return {
        listings: rv, images: loadActiveImagesFromCache()
      };
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong!!! ):');
    }
  }
);

export const getPendingListings = createAsyncThunk(
  'listings/getPendingListing',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/SearchProduct/getPendingListings');
      const data = res?.data?.response_data?.listings;
      return data as PendingListing[];
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  });

export const getTerminatedListings = createAsyncThunk(
  'listings/getTerminatedListings',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/SearchProduct/getTerminatedListings');
      const data = res?.data?.response_data?.listings;
      return data as TerminatedListings[];
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getActiveListingsImages = createAsyncThunk('SearchProduct/getListingsImages', async (ids: number[], thunkAPI) => {
  try {
    const res = await client.post('SearchProduct/getListingsImages', ids);
    return res.data.response_data as {channelListingMap: {[id: number]: string[]}};
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});