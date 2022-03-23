import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getSources = createAsyncThunk('sources/getSources', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/GetCurrent');
    return res.data.response_data.configuration;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
  }
});
