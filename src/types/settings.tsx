import { ePlatform } from '../data/platforms';

export type SettingSectionId = number;
export type SettingKey = number;
export type SettingValue = string | null;

export interface SettingData {
  key: SettingKey;
  value: SettingValue;
}

export interface SettingSectionsInfo {
  Type: SettingSectionId;
  Label: string;
  ChannelIds?: ePlatform[]//If undefined it accepts all the channels
}

export enum SettingType {
  Number, Boolean, String, List, WordList, BooleanNumber, BooleanString, BooleanNumberNull, BooleanStringNull, SwitchTwoOptions, TwoOptions, Button
}

//When it is something special, like a list with values that come from the API or a different call to store that
export enum SettingExtra {
  TemplateList, PolicyDelivery, BusinessPayment, BusinessShipping, BusinessReturn, RefreshPolicies, NoApiName
}

export interface Ancestor {
  Field?: SettingKey;
  Value: string;
  Superior?: SettingKey;//Used in sourceSettings to reffer the channelSetting to check the value of Superior instead of Field
}

export interface SettingInfo {
  Labels: string[];
  Description: string[];
  Type: SettingType;
  Section: SettingSectionId;
  Fields: SettingKey[];
  Values: (string | null)[];
  ChannelIds?: ePlatform[];//If undefined it accepts all the channels
  Ancestors?: Ancestor[];
  AncestorsHide?: boolean;
  Extra?: SettingExtra[];
  PlaceHolder?: string;

  Sources?: number[];//Used in sourceSettings to show settings only under some sourceIds. If undefined it accepts all the sourceIds
}


export enum ChannelSettingKey {
  None = 0,

  PaypalEmail = 3,
  ListingDuration = 4,
  LocationPostcode = 5,
  LocationCity = 6,
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
  GSP = 32,
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

export enum SourceSettingKey {
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

export const SourceSettingSuperior = new Map<SourceSettingKey, ChannelSettingKey>([
  [SourceSettingKey.Markup, ChannelSettingKey.Markup],
  [SourceSettingKey.DispatchDays, ChannelSettingKey.DispatchDays],
  [SourceSettingKey.MonitorStock, ChannelSettingKey.MonitorStock],
  [SourceSettingKey.MonitorPrice, ChannelSettingKey.MonitorPrice],
  [SourceSettingKey.MonitorPriceDecrease, ChannelSettingKey.MonitorPriceDecrease],
  [SourceSettingKey.MonitorPriceDecreasePercentage, ChannelSettingKey.MonitorPriceDecreasePercentage],
  [SourceSettingKey.TemplateId, ChannelSettingKey.TemplateId],
  [SourceSettingKey.DefaultShipping, ChannelSettingKey.DefaultShipping],
  [SourceSettingKey.ReturnsPolicy, ChannelSettingKey.ReturnsPolicy],
  [SourceSettingKey.GSP, ChannelSettingKey.GSP],
  [SourceSettingKey.ShippingProfileId, ChannelSettingKey.ShippingProfileId],
  [SourceSettingKey.ReturnProfileId, ChannelSettingKey.ReturnProfileId],
  [SourceSettingKey.PaymentProfileId, ChannelSettingKey.PaymentProfileId],
  [SourceSettingKey.LocationCity, ChannelSettingKey.LocationCity],
  [SourceSettingKey.LocationPostcode, ChannelSettingKey.LocationPostcode],
  [SourceSettingKey.LocationCountry, ChannelSettingKey.LocationCountry],
  [SourceSettingKey.MinQuantity, ChannelSettingKey.MinQuantity],
]
);
