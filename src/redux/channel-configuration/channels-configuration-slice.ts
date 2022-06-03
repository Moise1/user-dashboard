import { createSlice } from '@reduxjs/toolkit';
import { getChannelConfiguration, saveChannelSetting } from './channels-configuration-thunk';

export enum eChannelSettings {
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

  CompareAtPrice = 51
}

export interface SettingKey {
  key: eChannelSettings;
  value: string;
}

export interface SavingSetting {
  loading: boolean;
  success: boolean;
  updatedOn: Date;
  data: SettingKey;
}

export interface ChannelConfigurationState {
  settings: SettingKey[] | null;
  loading: boolean;
  error: string;
  savingSettings: SavingSetting[];
}

const initialState: ChannelConfigurationState = {
  settings: null,
  loading: true,
  error: '',
  savingSettings:[]
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
      state.settings = payload.settings as SettingKey[];
      state.savingSettings = [];
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
        prv.updatedOn = new Date();
        prv.success = false;
      } else {
        state.savingSettings.push({
          loading: true,
          data: meta.arg,
          success: false,
          updatedOn: new Date()
        });
      }
    });
    builder.addCase(saveChannelSetting.fulfilled, (state, { payload, meta }) => {
      const prv = state.savingSettings.find(x => x.data.key == meta.arg.key);
      if (prv) {//this should be always true
        prv.loading = false;
        prv.success = payload?.success;
        prv.updatedOn = new Date();
      }
      if (payload?.success && state.settings) {
        const vk = state.settings.find(x => x.key == meta.arg.key);
        if (vk) {
          vk.value = meta.arg.value;
        } else {
          state.settings.push(meta.arg);
        }
        //toastAlert(t('error.saving.configuration'),'error');
      }
    });
    builder.addCase(saveChannelSetting.rejected, (state, { meta }) => {
      const prv = state.savingSettings.find(x => x.data.key == meta.arg.key);
      if (prv) {//this should be always true
        prv.loading = false;
        prv.success = false;
        prv.updatedOn = new Date();
      }
    });
  }
});

export const { reducer: channelConfigurationReducer } = channelConfigurationSlice;
