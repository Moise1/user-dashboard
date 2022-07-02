import { Ancestor, ChannelSettingKey, SettingExtra, SettingInfo, SettingType, SourceSettingKey } from '../../../types/settings';
import { ePlatform } from '../../../types/ePlatform';


export interface SourceSettingAncestor extends Ancestor {
  Field?: SourceSettingKey;
  Superior?: ChannelSettingKey;
}

export interface SourceSettingInfo extends SettingInfo {
  Fields: SourceSettingKey[];
  Ancestors?: SourceSettingAncestor[];
}

export const AmazonSourceIds = [1, 30, 97, 107, 132, 140, 141];

export const SourceSettingsList: SourceSettingInfo[] = [
  {
    Labels: ['Channel.Setting.Name.Markup'],
    Description: ['Channel.Setting.Description.Markup'],
    Type: SettingType.Number,
    Section: 0,
    Fields: [SourceSettingKey.Markup],
    Values: [null]
  },
  {
    Labels: ['Channel.Setting.Name.DefaultTemplate'],
    Description: ['Channel.Setting.Description.DefaultTemplate'],
    Type: SettingType.List,
    Section: 0,
    Fields: [SourceSettingKey.TemplateId],
    Values: [null],
    Extra: [SettingExtra.TemplateList]
  },
  {
    Labels: ['Channel.Setting.Name.MonitorStock'],
    Description: ['Channel.Setting.Description.MonitorStock'],
    Type: SettingType.Boolean,
    Section: 0,
    Fields: [SourceSettingKey.MonitorStock],
    Values: [null]
  },
  {
    Labels: ['Channel.Setting.Name.MonitorPrice'],
    Description: ['Channel.Setting.Description.MonitorPrice'],
    Type: SettingType.Boolean,
    Section: 0,
    Fields: [SourceSettingKey.MonitorPrice],
    Values: [null]
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
      'Channel.Setting.Description.MonitorPriceDecrease.3',
    ],
    Type: SettingType.SwitchTwoOptions,
    Section: 0,
    Fields: [SourceSettingKey.MonitorPriceDecrease, SourceSettingKey.MonitorPriceDecreasePercentage],
    Values: [null, null, '0', '30']
  },



  {
    Labels: ['Channel.Setting.Name.PolicyReturns'],
    Description: ['Channel.Setting.Description.PolicyReturns'],
    Type: SettingType.List,
    Section: 0,
    Fields: [SourceSettingKey.ReturnsPolicy],
    Values: [
      null,
      'Days_14', '_t:Channel.Setting.Option.Days14',
      'Days_30', '_t:Channel.Setting.Option.Days30',
      'Days_60', '_t:Channel.Setting.Option.Days60',
      'No_Returns', '_t:Channel.Setting.Option.NoReturns'
    ],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.PolicyDelivery'],
    Description: ['Channel.Setting.Description.PolicyDelivery'],
    Type: SettingType.List,
    Section: 0,
    Fields: [SourceSettingKey.DefaultShipping],
    Values: [null],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi],
    Extra: [SettingExtra.PolicyDelivery]
  },
  {
    Labels: ['Channel.Setting.Name.PolicyDispatchDays'],
    Description: ['Channel.Setting.Description.PolicyDispatchDays'],
    Type: SettingType.Number,
    Section: 0,
    Fields: [SourceSettingKey.DispatchDays],
    Values: [null],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.GSP'],
    Description: ['Channel.Setting.Description.GSP'],
    Type: SettingType.Boolean,
    Section: 0,
    Fields: [SourceSettingKey.GSP],
    Values: [null],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessShipping'],
    Description: ['Channel.Setting.Description.BusinessShipping'],
    Type: SettingType.List,
    Section: 0,
    Fields: [SourceSettingKey.ShippingProfileId],
    Values: [null],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '1'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi],
    Extra: [SettingExtra.BusinessShipping]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessReturn'],
    Description: ['Channel.Setting.Description.BusinessReturn'],
    Type: SettingType.List,
    Section: 0,
    Fields: [SourceSettingKey.ReturnProfileId],
    Values: [null],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '1'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi],
    Extra: [SettingExtra.BusinessReturn]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessPayment'],
    Description: ['Channel.Setting.Description.BusinessPayment'],
    Type: SettingType.List,
    Section: 0,
    Fields: [SourceSettingKey.PaymentProfileId],
    Values: [null],
    Ancestors: [{
      Superior: ChannelSettingKey.UseBusinessPolicies,
      Value: '1'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi],
    Extra: [SettingExtra.BusinessPayment]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessPostcode'],
    Description: ['Channel.Setting.Description.BusinessPostcode'],
    Type: SettingType.String,
    Section: 0,
    Fields: [SourceSettingKey.LocationPostcode],
    Values: [null],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessCity'],
    Description: ['Channel.Setting.Description.BusinessCity'],
    Type: SettingType.String,
    Section: 0,
    Fields: [SourceSettingKey.LocationCity],
    Values: [null],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },

  {
    Labels: ['Sources.Setting.Name.MaxDeliveryDays'],
    Description: ['Sources.Setting.Description.MaxDeliveryDays'],
    Type: SettingType.String,
    Section: 0,
    Fields: [SourceSettingKey.MaxDeliveryDays],
    Values: ['10'],
    Sources: AmazonSourceIds
  },
  {
    Labels: ['Sources.Setting.Name.OnlyPrime'],
    Description: ['Sources.Setting.Description.OnlyPrime'],
    Type: SettingType.String,
    Section: 0,
    Fields: [SourceSettingKey.PrimeOnly],
    Values: ['0'],
    Sources: AmazonSourceIds
  },
];
