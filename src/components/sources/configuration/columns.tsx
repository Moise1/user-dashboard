import { eChannelSettings } from '../../../redux/channel-configuration/channels-configuration-slice';
import { eChannelOAuthSourceSettings } from '../../../redux/source-configuration/source-configuration-slice';
import { ePlatform } from '../../../utils/ePlatform';

export type ColumnChannelAncestor = { Field: eChannelSettings, Value: string }

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
  Key: eChannelOAuthSourceSettings;
  Channels?: ePlatform[];
  Style?: ColumnStyle;
  ChannelSetting?: eChannelSettings;//In case value is undefined, it will use this channelsetting as default value to show it
  ChannelSettingAncestors?: ColumnChannelAncestor[];
}

export const Columns: Column[] = [
  {
    Title: 'Sources.Table.Name.Markup',
    Key: eChannelOAuthSourceSettings.Markup,
    ChannelSetting: eChannelSettings.Markup
  },
  {
    Title: 'Sources.Table.Name.MonitorStock',
    Key: eChannelOAuthSourceSettings.MonitorStock,
    Style: ColumnStyle.Outlined,
    ChannelSetting: eChannelSettings.MonitorStock
  },
  {
    Title: 'Sources.Table.Name.MonitorPrice',
    Key: eChannelOAuthSourceSettings.MonitorPrice,
    Style: ColumnStyle.Outlined,
    ChannelSetting: eChannelSettings.MonitorPrice
  },
  {
    Title: 'Sources.Table.Name.PriceDecrease',
    Key: eChannelOAuthSourceSettings.MonitorPriceDecrease,
    Style: ColumnStyle.Outlined
  },
  {
    Title: 'Sources.Table.Name.DecreaseLimit',
    Key: eChannelOAuthSourceSettings.MonitorPriceDecreasePercentage
  },
  {
    Title: 'Sources.Table.Name.Template',
    Key: eChannelOAuthSourceSettings.TemplateId,
    Style: ColumnStyle.Template
  },
  {
    Title: 'Sources.Table.Name.PolicyDelivery',
    Key: eChannelOAuthSourceSettings.DefaultShipping,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: eChannelSettings.UseBusinessPolicies, Value: '0' }],
    Style: ColumnStyle.PolicyDelivery
  },
  {
    Title: 'Sources.Table.Name.PolicyReturns',
    Key: eChannelOAuthSourceSettings.ReturnsPolicy,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: eChannelSettings.UseBusinessPolicies, Value: '0' }],
    Style: ColumnStyle.PolicyReturns
  },
  {
    Title: 'Sources.Table.Name.BusinessPayment',
    Key: eChannelOAuthSourceSettings.PaymentProfileId,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: eChannelSettings.UseBusinessPolicies, Value: '1' }],
    Style: ColumnStyle.BusinessPayment
  },
  {
    Title: 'Sources.Table.Name.BusinessReturn',
    Key: eChannelOAuthSourceSettings.ReturnProfileId,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: eChannelSettings.UseBusinessPolicies, Value: '1' }],
    Style: ColumnStyle.BusinessReturn
  },
  {
    Title: 'Sources.Table.Name.BusinessShipping',
    Key: eChannelOAuthSourceSettings.ShippingProfileId,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi],
    ChannelSettingAncestors: [{ Field: eChannelSettings.UseBusinessPolicies, Value: '1' }],
    Style: ColumnStyle.BusinessShipping
  },
  {
    Title: 'Sources.Table.Name.BusinessCity',
    Key: eChannelOAuthSourceSettings.LocationCity,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Title: 'Sources.Table.Name.BusinessPostcode',
    Key: eChannelOAuthSourceSettings.LocationPostcode,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Title: 'Sources.Table.Name.LocationCountry',
    Key: eChannelOAuthSourceSettings.LocationCountry,
    Channels: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
];