import { SettingData, SettingValue, SourceSettingKey } from "../../types/settings";

export interface SourceSettingData extends SettingData {
  key: SourceSettingKey;
  value: SettingValue;
  sourceId: number;
}

export interface SavingSetting {
  loading: boolean;
  success: boolean;
  data: SourceSettingData;
}

export interface ComputedSettingsData {
  markup: number;
  monitorStock: boolean;
  monitorPrice: boolean;
  monitorPriceDecrease: boolean;
  monitorPriceDecreasePercentage: number;
  ending99: boolean;
  templateId: number;
  minTitleLength: number;
  forbiddenWords: string;
  forbiddenWordsInUrl: string;
  outOfStockAction: number;
  outOfStockActionPriceIncreaseAmount: number;
  terminateOosDays: number;
  defaultEAN: string;
  defaultMPN: string;
  defaultQuantity: string;
  feePercentage: number;
  titleSuggestions: boolean;
  minImages: number;
  defaultWeight: number;
  minQuantity: number;
  maxDeliveryDays: number;
  activeTerminateOosDays: boolean;
  maxAvailableStock: boolean;

  shippingProfileId?: number;
  returnProfileId?: number;
  paymentProfileId?: number;
  defaultShipping?: string;
  returnsPolicy?: string;
  dispatchDays?: number;
  gsp?: boolean;
  locationPostcode?: string;
  locationCity?: string;
  locationCountry?: string;
  useBusinessPolicies: boolean;
  paypalEmail?: string;
  listingsDuration?: string;
  eanAction: number;
  compareAtPrice: boolean;

  primeOnly: boolean;
  ignoreRules: boolean;
  autoOrdering: boolean;
  autoOrderingTrackingNumber: boolean;
  autoOrderingMarkShipped: boolean;
}
