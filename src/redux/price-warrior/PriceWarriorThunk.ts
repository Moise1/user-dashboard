import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { PWSetting } from './priceWarriorSlice';

export const getPriceWarrior = createAsyncThunk('PriceWarrior/getPriceWarrior', async (_, thunkAPI) => {
  try {
    const res = await client.get('/PriceWarrior/PriceWar');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const UpdateSettings = createAsyncThunk('PriceWarrior/UpdateSettings', async (data: PWSetting, thunkAPI) => {
  try {
    const res = await client.post('/PriceWarrior/UpdateSettings', data);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
