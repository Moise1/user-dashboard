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
}

export const AccountSettings: AccountSetting[] = [
  {
    Labels: ['Channel.Setting.Name.Markup'],
    Description: ['Channel.Setting.Description.Markup'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.Markup],
    Values: ['30']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorStock'],
    Description: ['Channel.Setting.Description.MonitorStock'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.MonitorStock],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorPrice'],
    Description: ['Channel.Setting.Description.MonitorPrice'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.MonitorPrice],
    Values: ['1'],
    Ancestors: [
      {
        Field: eAccountSettings.MonitorStock,
        Value: '1'
      }
    ]
  },
  {
    Labels: [
      'Channel.Setting.Name.MonitorPriceDecrease',
      'Channel.Setting.Name.MonitorPriceDecrease.NoLimit',
      'Channel.Setting.Name.MonitorPriceDecrease.Limit'
    ],
    Description: [
      'Channel.Setting.Description.MonitorPriceDecrease.1',
      'Channel.Setting.Description.MonitorPriceDecrease.2',
      'Channel.Setting.Description.MonitorPriceDecrease.3'
    ],
    Type: SettingType.SwitchTwoOptions,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.MonitorPriceDecrease, eAccountSettings.MonitorPriceDecreasePercentage],
    Values: ['1', '0', '0', '30'],
    Ancestors: [
      {
        Field: eAccountSettings.MonitorStock,
        Value: '1'
      },
      {
        Field: eAccountSettings.MonitorPrice,
        Value: '1'
      }
    ]
  },
  {
    Labels: ['Channel.Setting.Name.MinQuantity'],
    Description: ['Channel.Setting.Description.MinQuantity'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.MinQuantity],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.Ending99'],
    Description: ['Channel.Setting.Description.Ending99'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.TransformPrice],
    Values: ['0']
  },
  {
    Labels: [
      'Channel.Setting.Name.OutOfStockAction',
      'Channel.Setting.Name.OutOfStockAction.Quantity0',
      'Channel.Setting.Name.OutOfStockAction.Increase'
    ],
    Description: ['Channel.Setting.Description.OutOfStockAction'],
    Type: SettingType.TwoOptions,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.OutOfStockAction, eAccountSettings.OutOfStockActionPriceIncreaseAmount],
    Values: ['1', '100', '1', '2']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorCompareAtPrice'],
    Description: [
      'Channel.Setting.Description.MonitorCompareAtPrice.1',
      'Channel.Setting.Description.MonitorCompareAtPrice.2'
    ],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Monitoring,
    Fields: [eAccountSettings.CompareAtPrice],
    Values: ['0'],
    ChannelIds: [2]
  },

  {
    Labels: ['Channel.Setting.Name.ForbiddenWords'],
    Description: ['Channel.Setting.Description.ForbiddenWords'],
    Type: SettingType.WordList,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.ForbiddenWords],
    Values: ['']
  },
  {
    Labels: ['Channel.Setting.Name.ForbiddenWordsUrl'],
    Description: ['Channel.Setting.Description.ForbiddenWordsUrl'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.ForbiddenWordsInUrl],
    Values: ['0']
  },
  {
    Labels: ['Channel.Setting.Name.ListingsDuration'],
    Description: ['Channel.Setting.Description.ListingsDuration'],
    Type: SettingType.List,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.ListingDuration],
    Values: ['GTC', 'GTC', 'Channel.Setting.Option.GTC', 'Days_30', 'Channel.Setting.Option.Days30'],
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.TerminateOOS'],
    Description: ['Channel.Setting.Description.TerminateOOS.1', 'Channel.Setting.Description.TerminateOOS.2'],
    Type: SettingType.BooleanNumber,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.ActiveTerminateOosDays, eAccountSettings.TerminateOosDays],
    Values: ['0', '60']
  },
  {
    Labels: ['Channel.Setting.Name.MinTitleLength'],
    Description: ['Channel.Setting.Description.MinTitleLength'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.MinTitleLength],
    Values: ['10']
  },
  {
    Labels: ['Channel.Setting.Name.TitleSuggestions'],
    Description: ['Channel.Setting.Description.TitleSuggestions'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.TitleSuggestions],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.DefaultQuantity'],
    Description: ['Channel.Setting.Description.DefaultQuantity'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.DefaultQuantity],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.MinImages'],
    Description: ['Channel.Setting.Description.MinImages'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Listing,
    Fields: [eAccountSettings.MinImages],
    Values: ['1']
  },

  {
    Labels: ['Channel.Setting.Name.UseBusiness'],
    Description: ['Channel.Setting.Description.UseBusiness'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.UseBusinessPolicies],
    Values: ['0'],
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.PolicyReturns'],
    Description: ['Channel.Setting.Description.PolicyReturns'],
    Type: SettingType.List,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.ReturnsPolicy],
    Values: [
      '30 Days',
      'Days_14',
      'Channel.Setting.Option.Days14',
      'Days_30',
      'Channel.Setting.Option.Days30',
      'Days_60',
      'Channel.Setting.Option.Days60',
      'No_Returns',
      'Channel.Setting.Option.NoReturns'
    ],
    Ancestors: [
      {
        Field: eAccountSettings.UseBusinessPolicies,
        Value: '0'
      }
    ],
    AncestorsHide: true,
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.PolicyDispatchDays'],
    Description: ['Channel.Setting.Description.PolicyDispatchDays'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.DispatchDays],
    Values: ['1'],
    Ancestors: [
      {
        Field: eAccountSettings.UseBusinessPolicies,
        Value: '0'
      }
    ],
    AncestorsHide: true,
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.GSP'],
    Description: ['Channel.Setting.Description.GSP'],
    Type: SettingType.Boolean,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.Gsp],
    Values: ['0'],
    Ancestors: [
      {
        Field: eAccountSettings.UseBusinessPolicies,
        Value: '0'
      }
    ],
    AncestorsHide: true,
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessPostcode'],
    Description: ['Channel.Setting.Description.BusinessPostcode'],
    Type: SettingType.String,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.ItemLocationPostcode],
    Values: [''],
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessCity'],
    Description: ['Channel.Setting.Description.BusinessCity'],
    Type: SettingType.String,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.ItemLocationCity],
    Values: [''],
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.PaymentMethod'],
    Description: ['Channel.Setting.Description.PaymentMethod'],
    Type: SettingType.BooleanStringNull,
    Section: AccountSettingSection.Business,
    Fields: [eAccountSettings.PaypalEmail],
    Values: [null, 'example@email.com'],
    ChannelIds: [1, 3]
  },
  {
    Labels: ['Channel.Setting.Name.NoApiName'],
    Description: ['Channel.Setting.Description.NoApiName'],
    Type: SettingType.String,
    Section: AccountSettingSection.Other,
    Fields: [eAccountSettings.NoApiName],
    Values: [''],
    ChannelIds: [3, 4]
  },
  {
    Labels: ['Channel.Setting.Name.FeePercentage'],
    Description: ['Channel.Setting.Description.FeePercentage'],
    Type: SettingType.Number,
    Section: AccountSettingSection.Other,
    Fields: [eAccountSettings.FeePercentage],
    Values: ['13']
  }
];
