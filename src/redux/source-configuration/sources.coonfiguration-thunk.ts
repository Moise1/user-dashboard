import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
import { SourceSettingData } from './types';

export const getSourceConfiguration = createAsyncThunk('SourceConfiguration/Get', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/Get');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const saveSourceSetting = createAsyncThunk('SourceConfiguration/SaveOne',
  async (data: SourceSettingData) => {
    try {
      const res = await client.post('/SourceConfiguration/SaveOne', data);
      return res.data.response_data;
    } catch (error) {
      return { success: false };
    }
  }
);