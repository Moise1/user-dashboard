import { createSlice } from '@reduxjs/toolkit';
import { getChannelConfiguration, loadBusinessPolicies, loadShipping, refreshBusinessPolicies, saveChannelSetting } from './channels-configuration-thunk';

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

  CompareAtPrice = 51,

  NoApiName = 52//Special setting used to modify the name but it is not a real setting
}

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

export type SettingsValue = string | null;
export interface SettingKey {
  key: eChannelSettings;
  value: SettingsValue;
}

export interface SavingSetting {
  loading: boolean;
  success: boolean;
  data: SettingKey;
}

export interface ChannelConfigurationState {
  settings: SettingKey[] | null;
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
      state.settings = payload.settings as SettingKey[];
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
        //toastAlert(t('error.saving.configuration'),'error');
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
