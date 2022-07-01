import { ePlatform } from '../../../types/ePlatform';
import { ChannelSettingKey, SourceSettingKey } from '../../../types/settings';

export type ColumnChannelAncestor = { Field: ChannelSettingKey, Value: string }

export enum ColumnStyle {
  Default,
  Outlined,
  Template,
  PolicyDelivery,
  PolicyReturns,
  BusinessPayment,
  BusinessReturn,
  BusinessShipping
}

export interface Column {
  Title: string;
  Key: SourceSettingKey;
  Channels?: ePlatform[];
  Style?: ColumnStyle;
  ChannelSetting?: ChannelSettingKey;//In case value is undefined, it will use this channelsetting as default value to show it
  ChannelSettingAncestors?: ColumnChannelAncestor[];
}

export const Columns: Column[] = [
  {
    Title: 'Sources.Table.Name.Markup',
    Key: SourceSettingKey.Markup,
    ChannelSetting: ChannelSettingKey.Markup
  },
  {
    Title: 'Sources.Table.Name.MonitorStock',
    Key: SourceSettingKey.MonitorStock,
    Style: ColumnStyle.Outlined,
    ChannelSetting: ChannelSettingKey.MonitorStock
  },
  {
    Title: 'Sources.Table.Name.MonitorPrice',
    Key: SourceSettingKey.MonitorPrice,
    Style: ColumnStyle.Outlined,
    ChannelSetting: ChannelSettingKey.MonitorPrice
  },
  {
    Title: 'Sources.Table.Name.PriceDecrease',
    Key: SourceSettingKey.MonitorPriceDecrease,
    Style: ColumnStyle.Outlined
  },
  {
    Title: 'Sources.Table.Name.DecreaseLimit',
    Key: SourceSettingKey.MonitorPriceDecreasePercentage
  },
  {
    Title: 'Sources.Table.Name.Template',
    Key: SourceSettingKey.TemplateId,
    Style: ColumnStyle.Template
  },
  {
    Title: 'Sources.Table.Name.PolicyDelivery',
    Key: SourceSettingKey.DefaultShipping,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: ChannelSettingKey.UseBusinessPolicies, Value: '0' }],
    Style: ColumnStyle.PolicyDelivery
  },
  {
    Title: 'Sources.Table.Name.PolicyReturns',
    Key: SourceSettingKey.ReturnsPolicy,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: ChannelSettingKey.UseBusinessPolicies, Value: '0' }],
    Style: ColumnStyle.PolicyReturns
  },
  {
    Title: 'Sources.Table.Name.BusinessPayment',
    Key: SourceSettingKey.PaymentProfileId,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: ChannelSettingKey.UseBusinessPolicies, Value: '1' }],
    Style: ColumnStyle.BusinessPayment
  },
  {
    Title: 'Sources.Table.Name.BusinessReturn',
    Key: SourceSettingKey.ReturnProfileId,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: ChannelSettingKey.UseBusinessPolicies, Value: '1' }],
    Style: ColumnStyle.BusinessReturn
  },
  {
    Title: 'Sources.Table.Name.BusinessShipping',
    Key: SourceSettingKey.ShippingProfileId,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: ChannelSettingKey.UseBusinessPolicies, Value: '1' }],
    Style: ColumnStyle.BusinessShipping
  },
  {
    Title: 'Sources.Table.Name.BusinessCity',
    Key: SourceSettingKey.LocationCity,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Title: 'Sources.Table.Name.BusinessPostcode',
    Key: SourceSettingKey.LocationPostcode,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Title: 'Sources.Table.Name.LocationCountry',
    Key: SourceSettingKey.LocationCountry,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi]
  }
];