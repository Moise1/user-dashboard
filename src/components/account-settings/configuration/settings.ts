import { eAccountSettings } from '../../../redux/account-configuration/account-configuration-slice';
import { AccountSettingSection } from './sections';

export enum SettingType {
  Number,
  Boolean,
  String,
  List,
  WordList,
  BooleanNumber,
  BooleanString,
  BooleanStringNull,
  SwitchTwoOptions,
  TwoOptions,
  Button
}


//When it is something special, like a list with values that come from the API or a different call to store that
export enum AccountSettingExtra {
  CountriesList, BusinessTypeList
}

interface Ancestor {
  Field: eAccountSettings;
  Value: string;
}

export interface AccountSetting {
  Labels: string[];
  Description: string[];
  Type: SettingType;
  Section: AccountSettingSection;
  Fields: eAccountSettings[];
  Values: (string | null)[];
  ChannelIds?: number[]; //If undefined it accepts all the channels
  Ancestors?: Ancestor[];
  AncestorsHide?: boolean;
  PlaceHolder?: string;
  Extra?: AccountSettingExtra[];
}

export const AccountSettings: AccountSetting[] = [
  {
    Labels: ['Account.Setting.Name.BusinessRegisteredCountry'],
    Description: ['Account.Setting.Description.BusinessRegisteredCountry'],
    Type: SettingType.List, 
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.Country],
    Values: ['0'],
    Extra: [AccountSettingExtra.CountriesList]
  },
  {
    Labels: ['Account.Setting.Name.BusinessType'],
    Description: ['Account.Setting.Description.BusinessType'],
    Type: SettingType.List,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.BusinessType],
    Values: ['0'],
    Extra: [AccountSettingExtra.BusinessTypeList]
  },
  {
    Labels: ['Account.Setting.Name.BusinessName'],
    Description: ['Account.Setting.Description.BusinessName'],
    Type: SettingType.String,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.Name],
    Values: [''],
  },
  {
    Labels: ['Account.Setting.Name.Address'],
    Description: ['Account.Setting.Description.Address'],
    Type: SettingType.String,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.Address1],
    Values: [''],
  },
  {
    Labels: ['Account.Setting.Name.City'],
    Description: ['Account.Setting.Description.City'],
    Type: SettingType.String,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.City],
    Values: [''],
  },
  {
    Labels: ['Account.Setting.Name.Postcode'],
    Description: ['Account.Setting.Description.Postcode'],
    Type: SettingType.String,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.Postcode],
    Values: [''],
  },
  {
    Labels: ['Account.Setting.Name.RegistrationNumber'],
    Description: ['Account.Setting.Description.RegistrationNumber'],
    Type: SettingType.String,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.Rn],
    Values: [''],
  },
  {
    Labels: ['Account.Setting.Name.VATNumber'],
    Description: ['Account.Setting.Description.VATNumber'],
    Type: SettingType.String,
    Section: AccountSettingSection.BillingAddress,
    Fields: [eAccountSettings.Vat],
    Values: [''],
  }
  //,
  //{
  //  Labels: ['Account.Setting.Name.SaveAll'],
  //  Description: [''],
  //  Type: SettingType.Button,
  //  Section: AccountSettingSection.BillingAddress,
  //  Fields: [eAccountSettings.None],
  //  Values: [''],
  //}
];
