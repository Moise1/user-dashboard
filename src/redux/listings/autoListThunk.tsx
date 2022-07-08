import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastAlert } from "../../utils/toastAlert";
import { client } from "../client";
import { ListingsData } from "./listingsSlice";


export const getAutolist = createAsyncThunk('Listing/Autolist', async (data: unknown, thunkAPI) => {//TODO: Type! Data unkown? Unnaceptable
  try {
    const res = await client.post('Listing/Autolist', data);
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});

export const saveAutolist = createAsyncThunk('Listing/SaveAutolist', async (data: ListingsData, thunkAPI) => {
  try {
    const res = await client.post('Listing/SaveAutolist', data);
    if (res.status === 200) toastAlert('Source updated successfully!', 'success');
    return res.data.response_data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Sorry! Something went wrong ):');
  }
});