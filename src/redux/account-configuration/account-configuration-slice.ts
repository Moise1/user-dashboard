import { createSlice } from '@reduxjs/toolkit';
import { getAccountConfiguration, saveAccountSetting } from './account-configuration-thunk';

export enum eAccountSettings {
  None = 0,

  PaypalEmail = 3,
  ListingDuration = 4,
  ItemLocationPostcode = 5,
  ItemLocationCity = 6,
  LocationCountry = 48,
  TransformPrice = 8,
  MinTitleLength = 9,
  ForbiddenWords = 10,
  OutOfStockAction = 11,
  OutOfStockActionPriceIncreaseAmount = 12,
  DefaultMpn = 13,
  DefaultWeight = 14,
  DefaultEAN = 15,
  OutOfStockEbay = 16,

  TerminateOosDays = 18,
  UseBusinessPolicies = 19,
  FeePercentage = 20,
  DefaultQuantity = 21,
  DefaultSite = 22,
  Site = 23,
  TitleSuggestions = 24,

  MinImages = 26,
  ForbiddenWordsInUrl = 27,

  Markup = 31,
  Gsp = 32,
  DispatchDays = 33,
  ReturnsPolicy = 34,
  MonitorStock = 35,
  MonitorPrice = 36,
  MonitorPriceDecrease = 37,
  MonitorPriceDecreasePercentage = 38,
  DefaultShipping = 39,

  ShippingProfileId = 41,
  ReturnProfileId = 42,
  PaymentProfileId = 43,
  TemplateId = 44,

  MinQuantity = 45,

  EanAction = 46,
  MaxDeliveryDays = 47,
  ActiveTerminateOosDays = 49,

  MaxAvailableStock = 50, //Used by Compelia

  CompareAtPrice = 51,

  NoApiName = 52 //Special setting used to modify the name but it is not a real setting
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
      state.settings = payload.settings as SettingKey[];
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

export const { reducer: channelConfigurationReducer } = AccountConfigurationSlice;
