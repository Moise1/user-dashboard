import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastAlert } from 'src/utils/toastAlert';
import { client } from '../client';
import { Rule } from './rulesSlice';

export const getRules = createAsyncThunk('rules/getRules', async (_, thunkAPI) => {
  try {
    const res = await client.get('/Pricing/Get');
    const rulesData = res.data.response_data.rules.map((item: Rule, key: number) => ({
      ...item,
      key
    }));

    return rulesData;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const createRule = createAsyncThunk('rules/createRule', async (data: Rule, thunkAPI) => {
  try {
    const res = await client.post('/Pricing/Add', data);
    if (res.status === 200) toastAlert('Rule added successfully!', 'success');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const updateRule = createAsyncThunk(
  'rules/updateRule',
  async ({ id: ruleId, active }: { id: Rule['id']; active: Rule['active'] }, thunkAPI) => {
    try {
      const res = await client.post('/Pricing/Update', { ruleId, active });
      if (res.status === 200) toastAlert("Rule's status updated successfully!", 'success');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const deleteRule = createAsyncThunk(
  'rules/deleteRule',
  async ({ id: ruleId, active }: { id: Rule['id']; active: Rule['active'] }, thunkAPI) => {
    try {
      const res = await client.delete('/Pricing/Delete', { data: { ruleId, active } });
      if (res.status === 200) toastAlert('Rule successfully deleted!', 'success');
      return res.data.response_data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);
