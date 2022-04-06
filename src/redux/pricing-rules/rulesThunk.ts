import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getRules = createAsyncThunk(
  'rules/getRules', 
  async (_, thunkAPI) => {
    try {
      const res = await client.get('/Pricing/Get');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
