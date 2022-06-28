import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getPriceWarrior = createAsyncThunk('PriceWarrior/getPriceWarrior', async (_, thunkAPI) => {
  try {
    const res = await client.get('/PriceWarrior/PriceWar');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
