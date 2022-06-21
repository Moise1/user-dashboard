import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getSourceConfiguration = createAsyncThunk('SourceConfiguration/Get', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/Get');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});