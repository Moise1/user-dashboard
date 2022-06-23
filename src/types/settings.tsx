import { ePlatform } from "../utils/ePlatform";

export type SettingSectionId = number;
export type SettingKey = number;
export type SettingValue = string | null;

export interface SettingData {
  Key: SettingKey;
  Value: SettingValue;
}

export interface SettingSectionsInfo {
  Type: SettingSectionId;
  Label: string;
  ChannelIds?: ePlatform[]//If undefined it accepts all the channels
}

export enum SettingType {
  Number, Boolean, String, List, WordList, BooleanNumber, BooleanString, BooleanStringNull, SwitchTwoOptions, TwoOptions, Button
}

//When it is something special, like a list with values that come from the API or a different call to store that
export enum SettingExtra {
  TemplateList, PolicyDelivery, BusinessPayment, BusinessShipping, BusinessReturn, RefreshPolicies, TranslateDefaultValue
}

export interface Ancestor {
  Field: SettingKey;
  Value: string;
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
}

