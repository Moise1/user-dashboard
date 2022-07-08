import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../client";

export const getManualListings = createAsyncThunk(
  'Listing/ManualListing',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/Listing/ManualListing');
      const data = res?.data?.response_data;
      return data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);