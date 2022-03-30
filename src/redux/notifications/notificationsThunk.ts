import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications', 
  async (_, thunkAPI) => {
    try {
      const res = await client.get('/Notifications/Get');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
