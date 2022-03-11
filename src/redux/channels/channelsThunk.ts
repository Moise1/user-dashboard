import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';


export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (_, {rejectWithValue} /* destructured thunkAPI's prop */) => {
  try {
    const res = await client.get('/User/Channels/Get/');
    return res.data.response_data.channels;
  } catch (error) {
    return rejectWithValue('Sorry! Something went wrong ):') ;
  }
});
