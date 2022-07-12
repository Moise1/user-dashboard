import { createAsyncThunk } from '@reduxjs/toolkit';
import { UITablePreference } from './ui-preferences-state-slice';

//SAVE
export const getActiveListingsPreferences = createAsyncThunk('UI/GetActiveListingsVisibleColumns', async (_, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return JSON.parse(localStorage.getItem('UI.VisibleColumns.' + channelId + '.active') ?? '{}') as UITablePreference;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});
export const saveActiveListingsPreferences = createAsyncThunk('UI/SaveActiveListingsVisibleColumns', async (data: UITablePreference, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.VisibleColumns.' + channelId + '.active', JSON.stringify(data));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});

//PENDING
export const getPendingListingsPreferences = createAsyncThunk('UI/GetPendingListingsVisibleColumns', async (_, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return JSON.parse(localStorage.getItem('UI.VisibleColumns.' + channelId + '.pending') ?? '{}') as UITablePreference;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});
export const savePendingListingsPreferences = createAsyncThunk('UI/SavePendingListingsVisibleColumns', async (data: UITablePreference, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.VisibleColumns.' + channelId + '.pending', JSON.stringify(data));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});

//TERMINATED
export const getTerminatedListingsPreferences = createAsyncThunk('UI/GetTerminatedListingsVisibleColumns', async (_, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return JSON.parse(localStorage.getItem('UI.VisibleColumns.' + channelId + '.terminated') ?? '{}') as UITablePreference;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});
export const saveTerminatedListingsPreferences = createAsyncThunk('UI/SaveTerminatedListingsVisibleColumns', async (data: UITablePreference, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.VisibleColumns.' + channelId + '.terminated', JSON.stringify(data));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});