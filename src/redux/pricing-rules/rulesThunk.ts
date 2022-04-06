import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';
import {Rule} from './rulesSlice';

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


export const createRule = createAsyncThunk(
  'rules/createRule', 
  async (data: Rule, thunkAPI) => {
    try {
      const res = await client.post('/Pricing/Add', data);
      if(res.status === 200) toastAlert('Rule added sucessfully!', 'success');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):') ;
    }
  });
