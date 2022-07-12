import { createAsyncThunk } from '@reduxjs/toolkit';
import { UIIdentifier, UITablePreference } from './ui-preferences-state-slice';

export const getPreferences = createAsyncThunk('UI/GetPreferences', async (uiIdentifier: UIIdentifier, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return JSON.parse(localStorage.getItem('UI.Preferences.' + channelId + '.' + uiIdentifier) ?? '{}') as UITablePreference;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});
export const savePreferences = createAsyncThunk('UI/SavePreferences', async (data: { uiIdentifier: UIIdentifier, data: UITablePreference }, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.Preferences.' + channelId + '.' + data.uiIdentifier, JSON.stringify(data.data));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});