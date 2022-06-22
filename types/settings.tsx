import { ePlatform } from "../src/utils/ePlatform";

type SettingSectionId = number;
type SettingFieldId = number;

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
  Field: SettingFieldId;
  Value: string;
}

export interface Setting {
  Labels: string[];
  Description: string[];
  Type: SettingType;
  Section: SettingSectionId;
  Fields: SettingFieldId[];
  Values: (string | null)[];
  ChannelIds?: ePlatform[];//If undefined it accepts all the channels
  Ancestors?: Ancestor[];
  AncestorsHide?: boolean;
  Extra?: SettingExtra[];
  PlaceHolder?: string;
}

