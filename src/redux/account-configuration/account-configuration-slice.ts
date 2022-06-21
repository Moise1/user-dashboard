import { createSlice } from '@reduxjs/toolkit';
import { getAccountConfiguration, saveAccountSetting } from './account-configuration-thunk';

export interface Account {
  country: string;
  businessType: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  rn: string;
  vat: string;
  roi: boolean;
  needInformation: boolean; 
  iAmBusiness: boolean;
}

export enum eAccountSettings {
  None = 0,
  NeedInformation = 1,
  IAmBusiness = 2,
  Country = 3,
  BusinessType = 4,
  Name = 5,
  Address1 = 6,
  Address2 = 7,
  City = 8,
  Postcode = 9,
  Rn = 10,
  Vat = 11,
  Roi = 12
}

export type SettingsValue = string | null;
export interface SettingKey {
  key: eAccountSettings;
  value: SettingsValue;
}

export interface SavingSetting {
  loading: boolean;
  success: boolean;
  data: SettingKey;
}

export interface AccountConfigurationState {
  settings: SettingKey[] | null;
  loading: boolean;
  error: string;
  savingSettings: SavingSetting[];
}

const initialState: AccountConfigurationState = {
  settings: null,
  loading: true,
  error: '',
  savingSettings: []
};

export const AccountConfigurationSlice = createSlice({
  name: 'accountConfiguration',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder.addCase(getAccountConfiguration.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getAccountConfiguration.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.settings = payload.result;
      state.savingSettings = [];
    });
    builder.addCase(getAccountConfiguration.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    //SAVE
    builder.addCase(saveAccountSetting.pending, (state, { meta }) => {
      if (!state.savingSettings) state.savingSettings = [];
      const prv = state.savingSettings.find((x) => x.data.key == meta.arg.key);
      if (prv) {
        prv.loading = true;
        prv.data = meta.arg;
        prv.success = false;
      } else {
        state.savingSettings.push({
          loading: true,
          data: meta.arg,
          success: false
        });
      }
    });
    builder.addCase(saveAccountSetting.fulfilled, (state, { payload, meta }) => {
      const prv = state.savingSettings.find((x) => x.data.key == meta.arg.key);
      if (prv) {
        //this should be always true
        prv.loading = false;
        prv.success = payload?.success;
      }
      if (payload?.success && state.settings) {
        const vk = state.settings.find((x) => x.key == meta.arg.key);
        if (vk) {
          vk.value = meta.arg.value;
        } else {
          state.settings.push(meta.arg);
        }
        //toastAlert(t('error.saving.configuration'),'error');
      }
    });
    builder.addCase(saveAccountSetting.rejected, (state, { meta }) => {
      const prv = state.savingSettings.find((x) => x.data.key == meta.arg.key);
      if (prv) {
        //this should be always true
        prv.loading = false;
        prv.success = false;
      }
    });
  }
});

export const { reducer: accountConfigurationReducer } = AccountConfigurationSlice;
