import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from '../../utils/toastAlert';
import { client } from '../client';
import { ListingService } from './listingServicesSlice';

export const getListingServices = createAsyncThunk(
  'dashboard-listing-services/getListingServices',
  async (_, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get('/Dashboard/GetListingServices');
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const addListingService = createAsyncThunk('Listing/AddListingService', async (data: ListingService, thunkAPI) => {
  try {
    const res = await client.post('Listing/AddListingService', data);
    if (res.status === 200) toastAlert('Source updated successfully!', 'success');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

