import { createAsyncThunk } from '@reduxjs/toolkit';

export const getActiveListingsVisibleColumns = createAsyncThunk('UI/GetActiveListingsVisibleColumns', async (_, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return (JSON.parse(localStorage.getItem('UI.VisibleColumns.' + channelId + '.active') ?? '{}') as { columns?: number[] })?.columns;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});


export const saveActiveListingsVisibleColumns = createAsyncThunk('UI/SaveActiveListingsVisibleColumns', async (data: number[], rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.VisibleColumns.' + channelId + '.active', JSON.stringify({ columns: data }));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const getPendingListingsVisibleColumns = createAsyncThunk('UI/GetPendingListingsVisibleColumns', async (_, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return (JSON.parse(localStorage.getItem('UI.VisibleColumns.' + channelId + '.pending') ?? '{}') as { columns?: number[] })?.columns;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});


export const savePendingListingsVisibleColumns = createAsyncThunk('UI/SavePendingListingsVisibleColumns', async (data: number[], rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.VisibleColumns.' + channelId + '.pending', JSON.stringify({ columns: data }));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const getTerminatedListingsVisibleColumns = createAsyncThunk('UI/GetTerminatedListingsVisibleColumns', async (_, rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    return (JSON.parse(localStorage.getItem('UI.VisibleColumns.' + channelId + '.terminated') ?? '{}') as { columns?: number[] })?.columns;
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const saveTerminatedListingsVisibleColumns = createAsyncThunk('UI/SaveTerminatedListingsVisibleColumns', async (data: number[], rejectWithValue) => {
  try {
    const channelId = localStorage.getItem('channelId');
    localStorage.setItem('UI.VisibleColumns.' + channelId + '.terminated', JSON.stringify({ columns: data }));
  } catch (error) {
    return rejectWithValue.rejectWithValue('Sorry! Something went wrong ):');
  }
});