import { createSlice } from '@reduxjs/toolkit';
import { getAccountConfiguration, saveAccountSetting } from './account-configuration-thunk';

export interface Account {
  country: string | undefined | null;
  businessType: string | undefined | null;
  name: string | undefined | null;
  address1: string | undefined | null;
  address2: string | undefined | null;
  city: string | undefined | null;
  postcode: string | undefined | null;
  rn: string | undefined | null;
  vat: string | undefined | null;
  roi: boolean | undefined | null;
  needInformation: boolean | undefined | null;
  iAmBusiness: boolean  | undefined | null;
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
  success: boolean;
  error: string;
  savingSettings: SavingSetting[];
}

const initialState: AccountConfigurationState = {
  settings: null,
  loading: true,
  error: '',
  savingSettings: [],
  success: true
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
      state.settings = payload;
      state.savingSettings = [];
    });
    builder.addCase(getAccountConfiguration.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });

    //SAVE
    builder.addCase(saveAccountSetting.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(saveAccountSetting.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload?.success;
    });
    builder.addCase(saveAccountSetting.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: accountConfigurationReducer } = AccountConfigurationSlice;
