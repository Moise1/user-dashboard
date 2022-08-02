import { createSlice } from '@reduxjs/toolkit';
import { getAffiliatesStats, getAffiliateDashboard } from './affiliatesStatsThunk';

export interface AffiliatesStats {
  quantity: number;
  id: number;
}

export interface AffiliatesDashboardStats {
  loading: boolean;
  Email: string;
  catalogTokensCommission: number;
  catalogTokensCount: number;
  history: [{ day: Date }, { signups: number }];
  noApiServerCommission: number;
  noApiServerCount: number;
  percentageCatalog: number;
  percentageComission: number;
  percentageConversion: number;
  percentageLinked: number;
  percentageListed: number;
  percentageNoApiServer: number;
  percentageReferral: number;
  percentageWeListForYou: number;
  referralsLinked: number;
  referralsListed: number;
  revenueBySignup: number;
  totalCommission: number;
  totalReferralsCommission: number;
  totalReferralsCount: number;
  totalSignups: number;
  totalSignupsThisMonth: number;
  weListForYouCommission: number;
  weListForYouCount: number;
}

const initialState = {
  affiliatesStats: [] as AffiliatesStats[],
  loading: false,
  error: ''
};

const initialsState = {
  affiliatesDashboard: {} as AffiliatesDashboardStats,
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
