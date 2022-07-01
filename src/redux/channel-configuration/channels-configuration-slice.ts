import { createSlice } from '@reduxjs/toolkit';
import { ChannelSettingKey, SettingData, SettingValue } from '../../types/settings';
import { getChannelConfiguration, loadBusinessPolicies, loadShipping, refreshBusinessPolicies, saveChannelSetting } from './channels-configuration-thunk';


export enum BusinessPolicyType {
  Shipping = 0,
  Payment = 1,
  Returns= 2
}

export interface BusinessPolicy {
  id: number;
  name: string;
  policyType: BusinessPolicyType;
  details: string;
}

export type ShippingOption = {text:string, value:string};

export interface ChannelSettingData extends SettingData {
  key: ChannelSettingKey;
  value: SettingValue;
}

export interface SavingSetting {
  loading: boolean;
  success: boolean;
  data: ChannelSettingData;
}

export interface ChannelConfigurationState {
  settings: ChannelSettingData[] | null;
  loading: boolean;
  error: string;
  savingSettings: SavingSetting[];

  refreshBusinessInProgress: boolean;
  refreshBusinessLoading: boolean;

  loadingBusiness: boolean;
  businessPolicies: BusinessPolicy[] | undefined;

  loadingShipping: boolean;
  shipping: ShippingOption[] | undefined;
}

const initialState: ChannelConfigurationState = {
  settings: null,
  loading: false,
  error: '',
  savingSettings: [],

  refreshBusinessInProgress: false,
  refreshBusinessLoading: false,

  loadingBusiness: false,
  businessPolicies: undefined,

  loadingShipping: false,
  shipping: undefined
};

export const channelConfigurationSlice = createSlice({
  name: 'channelConfiguration',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder.addCase(getChannelConfiguration.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getChannelConfiguration.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.settings = payload.settings as ChannelSettingData[];
      state.savingSettings = [];
      state.refreshBusinessLoading = false;
      state.refreshBusinessInProgress = false;
    });
    builder.addCase(getChannelConfiguration.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    //SAVE
    builder.addCase(saveChannelSetting.pending, (state, { meta }) => {
      if (!state.savingSettings)
        state.savingSettings = [];
      const prv = state.savingSettings.find(x => x.data.key == meta.arg.key);
      if (prv) {
        prv.loading = true;
        prv.data = meta.arg;
        prv.success = false;
      } else {
        state.savingSettings.push({
          loading: true,
          data: meta.arg,
          success: false,
        });
      }
    });
    builder.addCase(saveChannelSetting.fulfilled, (state, { payload, meta }) => {
      const prv = state.savingSettings.find(x => x.data.key == meta.arg.key);
      if (prv) {//this should be always true
        prv.loading = false;
        prv.success = payload?.success;
      }
      if (payload?.success && state.settings) {
        const vk = state.settings.find(x => x.key == meta.arg.key);
        if (vk) {
          vk.value = meta.arg.value;
        } else {
          state.settings.push(meta.arg);
        }
      }
    });
    builder.addCase(saveChannelSetting.rejected, (state, { meta }) => {
      const prv = state.savingSettings.find(x => x.data.key == meta.arg.key);
      if (prv) {//this should be always true
        prv.loading = false;
        prv.success = false;
      }
    });

    //REFRESH POLICIES
    builder.addCase(refreshBusinessPolicies.pending, (state) => {
      state.refreshBusinessLoading = true;
      state.refreshBusinessInProgress = false;
    });
    builder.addCase(refreshBusinessPolicies.fulfilled, (state, { payload }) => {
      state.refreshBusinessLoading = false;
      state.refreshBusinessInProgress = payload.success ?? true;
    });
    builder.addCase(refreshBusinessPolicies.rejected, (state) => {
      state.refreshBusinessLoading = false;
      state.refreshBusinessInProgress = false;
    });

    //GET BUSINESSS POLICIES
    builder.addCase(loadBusinessPolicies.pending, (state) => {
      state.loadingBusiness = true;
    });
    builder.addCase(loadBusinessPolicies.fulfilled, (state, { payload }) => {
      state.loadingBusiness = false;
      state.businessPolicies = payload?.policies;
    });
    builder.addCase(loadBusinessPolicies.rejected, (state) => {
      state.loadingBusiness = false;
    });

    //GET SHIPPINGS
    builder.addCase(loadShipping.pending, (state) => {
      state.loadingShipping = true;
    });
    builder.addCase(loadShipping.fulfilled, (state, { payload }) => {
      state.loadingShipping = false;
      state.shipping = payload?.options;
    });
    builder.addCase(loadShipping.rejected, (state) => {
      state.loadingShipping = false;
    });
  }
});

export const { reducer: channelConfigurationReducer } = channelConfigurationSlice;
