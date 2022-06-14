import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

export const getSubscriptions = createAsyncThunk('subscriptions/getSubscriptions', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Products/Subscriptions/Get');
    return res.data.response_data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});


export const getServices = createAsyncThunk('subscriptions/Services', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Products/Services/Get');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const getPaymentConfig = createAsyncThunk('subscriptions/getPaymentConfig', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Products/Subscriptions/GetPaymentConfig/');
    return res.data.response_data.subscriptionConfiguration;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});
