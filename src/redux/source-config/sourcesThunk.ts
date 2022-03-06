import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';
// import {Source} from './sourceSlice';

export const getSources = createAsyncThunk('resources/getSources', async (_, thunkAPI) => {
  try {
    const channels = (await client.get<{ channels: { id: number }[] }>('/User/Channels/Get')).data?.channels;
  
    const res = await client.post('/SourceConfiguration/Save', { headers: { channel: channels[0].id } }); 
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
  }
});
