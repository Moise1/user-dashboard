import { createSlice } from '@reduxjs/toolkit';
import { getSourceConfiguration } from './sources.coonfiguration-thunk';

export type SourceSetting = {
  key: number;
  value: string;
  sourceId: number;
};

export enum eChannelOAuthSourceSettings {
  Markup = 1,
  DispatchDays = 2,
  MonitorStock = 3,
  MonitorPrice = 4,
  MonitorPriceDecrease = 5,
  MonitorPriceDecreasePercentage = 6,
  TemplateId = 7,
  DefaultShipping = 8,
  ReturnsPolicy = 9,
  GSP = 10,
  ShippingProfileId = 11,
  ReturnProfileId = 12,
  PaymentProfileId = 13,
  LocationCity = 14,
  LocationPostcode = 15,
  LocationCountry = 16,
  PrimeOnly = 17,
  MinQuantity = 18,
  MaxDeliveryDays = 19,
  AutoOrdering = 20,
  AutoOrderingTrackingNumber = 21,
  AutoOrderingMarkShipped = 22
}

export interface SourceConfigurationState {
  get: {
    loading: boolean;
    settings?: SourceSetting[];
  };
}

const initialState: SourceConfigurationState = {
  get: {
    loading: false
  }
};

export const sourceSlice = createSlice({
  name: 'source-configuration',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSourceConfiguration.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(getSourceConfiguration.fulfilled, (state, { payload }) => {
      state.get.loading = false;
      state.get.settings = payload.settings;
    });
    builder.addCase(getSourceConfiguration.rejected, (state) => {
      state.get.loading = false;
    });
  }
});

export const { reducer: sourcesConfigReducer } = sourceSlice;
