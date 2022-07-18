import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../client';

interface Props {
  period: number;
  from: string;
  to?: string;
  timeDiff: number;
}

interface DashboardProps {
  month: number;
  year: number;
}

export const getAffiliatesStats = createAsyncThunk(
  'dashboard-affiliates/getAffiliatesStats',
  async ({ period, from, to }: Props, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get(`/Dashboard/GetAffiliateStatistics/${period}/${from}/${to}`);
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);

export const getAffiliateDashboard = createAsyncThunk(
  'dashboard-affiliates/getAffiliateDashboard',
  async ({ month, year }: DashboardProps, { rejectWithValue } /* destructured thunkAPI's prop */) => {
    try {
      const res = await client.get(`/Dashboard/AffiliateDashboard?month=${month}&year=${year}`);
      return res.data.response_data;
    } catch (error) {
      return rejectWithValue('Sorry! Something went wrong ):');
    }
  }
);