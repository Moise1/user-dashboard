import { createSlice } from '@reduxjs/toolkit';
import { getAffiliatesStats, getAffiliateDashboard } from './affiliatesStatsThunk';

export interface AffiliatesStats {
  quantity: number;
  id: number;
}

export interface AffiliatesDashboardStats {
  affiliatesDashboard: AffiliatesDashboardStats[];
  loading: boolean;
  catalogTokensCommission: string;
  catalogTokensCount: string;
  noApiServerCommission: string;
  noApiServerCount: string;
  percentageCatalog: string;
  percentageConversion: string;
  percentageLinked: string;
  percentageListed: string;
  percentageNoApiServer: string;
  percentageReferral: string;
  percentageWeListForYou: string;
  referralsLinked: string;
  referralsListed: string;
  revenueBySignup: string;
  totalCommission: string;
  totalReferralsCommission: string;
  totalReferralsCount: string;
  totalSignups: string;
  totalSignupsThisMonth: string;
  weListForYouCommission: string;
  weListForYouCount: string;
}

const initialState = {
  affiliatesStats: [] as AffiliatesStats[],
  loading: false,
  error: ''
};

const initialsState = {
  affiliatesDashboard: [] as AffiliatesDashboardStats[],
  loading: false,
  error: ''
};

export const affiliatesStatsSlice = createSlice({
  name: 'dashboard-affiliates-stats',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAffiliatesStats.pending, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getAffiliatesStats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.affiliatesStats = payload;
    });
    builder.addCase(getAffiliatesStats.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const affiliatesDashboardSlice = createSlice({
  name: 'dashboard-affiliates-stats',
  initialState: initialsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAffiliateDashboard.pending, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getAffiliateDashboard.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.affiliatesDashboard = payload;
    });
    builder.addCase(getAffiliateDashboard.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: affiliatesStatsReducer } = affiliatesStatsSlice;
export const { reducer: affiliatesDashboardReducer } = affiliatesDashboardSlice;
