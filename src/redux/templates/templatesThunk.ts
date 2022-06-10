import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getTemplates = createAsyncThunk('templates/getTemplates', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Templates/GetTemplateList/590881');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
