import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getUserAssistants = createAsyncThunk('userAssistants/getUserAssistants', async (_, thunkAPI) => {
  try {
    const res = await client.post('/User/VirtualAssistant/Get');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
  }
});
