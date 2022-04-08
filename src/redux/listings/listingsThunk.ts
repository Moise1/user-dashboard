import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
// import unmap, {ActiveListing, compArray} from '../../utils/unmap';


export const getListings = createAsyncThunk(
  'listings/getListings',
  async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
    try {
      console.log('calling listing api');
      const res = await client.get('/SearchProduct/GetActiveListings');
      return res.data.response_data;
      // const arrayLists= res?.data.response_data;
      // return arrayLists;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
