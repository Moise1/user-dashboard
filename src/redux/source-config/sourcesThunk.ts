import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';
import { SourceConfigSave } from './sourceSlice';

export const getSources = createAsyncThunk('sources/getSources', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/GetCurrent');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const getShippingOption = createAsyncThunk('sources/getSources', async (_, thunkAPI) => {
  try {
    const res = await client.get('/SourceConfiguration/GetCurrent');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});


export const saveSources = createAsyncThunk('sourceConfiguration/save', async (data: SourceConfigSave[], thunkAPI) => {
  try {
    const res = await client.post('SourceConfiguration/Save', data);
    if (res.status === 200) toastAlert('Source updated successfully!', 'success');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
