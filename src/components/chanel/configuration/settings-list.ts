import { Ancestor, ChannelSettingKey, SettingExtra, SettingInfo, SettingType } from '../../../types/settings';
import { ePlatform } from '../../../types/ePlatform';
import { ChannelSettingSection } from './sections';

export interface ChannelSettingAncestor extends Ancestor {
  Field: ChannelSettingKey;
}

export interface ChannelSettingInfo extends SettingInfo {
  Section: ChannelSettingSection;
  Fields: ChannelSettingKey[];
  Ancestors?: ChannelSettingAncestor[];
}

export const ChannelSettingsList: ChannelSettingInfo[] = [
  {
    Labels: ['Channel.Setting.Name.Markup'],
    Description: ['Channel.Setting.Description.Markup'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.Markup],
    Values: ['30'],
  },
  {
    Labels: ['Channel.Setting.Name.MonitorStock'],
    Description: ['Channel.Setting.Description.MonitorStock'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.MonitorStock],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorPrice'],
    Description: ['Channel.Setting.Description.MonitorPrice'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.MonitorPrice],
    Values: ['1'],
    Ancestors: [{
      Field: ChannelSettingKey.MonitorStock,
      Value:'1'
    }]
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
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.MonitorPriceDecrease, ChannelSettingKey.MonitorPriceDecreasePercentage],
    Values: [null, null, '0', '30'],
    Ancestors: [
      {
        Field: ChannelSettingKey.MonitorStock,
        Value: '1'
      },
      {
        Field: ChannelSettingKey.MonitorPrice,
        Value: '1'
      }
    ]
  },
  {
    Labels: ['Channel.Setting.Name.MinQuantity'],
    Description: ['Channel.Setting.Description.MinQuantity'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.MinQuantity],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.Ending99'],
    Description: ['Channel.Setting.Description.Ending99'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.TransformPrice],
    Values: ['0']
  },
  {
    Labels: [
      'Channel.Setting.Name.OutOfStockAction',
      'Channel.Setting.Name.OutOfStockAction.Quantity0',
      'Channel.Setting.Name.OutOfStockAction.Increase'
    ],
    Description: [
      'Channel.Setting.Description.OutOfStockAction',
    ],
    Type: SettingType.TwoOptions,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.OutOfStockAction, ChannelSettingKey.OutOfStockActionPriceIncreaseAmount],
    Values: ['1', '100', '1', '2']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorCompareAtPrice'],
    Description: ['Channel.Setting.Description.MonitorCompareAtPrice.1','Channel.Setting.Description.MonitorCompareAtPrice.2'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [ChannelSettingKey.CompareAtPrice],
    Values: ['0'],
    ChannelIds: [ePlatform.Shopify]
  },



  {
    Labels: ['Channel.Setting.Name.ForbiddenWords'],
    Description: ['Channel.Setting.Description.ForbiddenWords'],
    Type: SettingType.WordList,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.ForbiddenWords],
    Values: ['']
  },
  {
    Labels: ['Channel.Setting.Name.ForbiddenWordsUrl'],
    Description: ['Channel.Setting.Description.ForbiddenWordsUrl'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.ForbiddenWordsInUrl],
    Values: ['0']
  },
  {
    Labels: ['Channel.Setting.Name.ListingsDuration'],
    Description: ['Channel.Setting.Description.ListingsDuration'],
    Type: SettingType.List,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.ListingDuration],
    Values: ['GTC', 'GTC', '_t:Channel.Setting.Option.GTC', 'Days_30', '_t:Channel.Setting.Option.Days30'],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.TerminateOOS'],
    Description: ['Channel.Setting.Description.TerminateOOS.1', 'Channel.Setting.Description.TerminateOOS.2'],
    Type: SettingType.BooleanNumber,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.ActiveTerminateOosDays, ChannelSettingKey.TerminateOosDays],
    Values: ['0','60']
  },
  {
    Labels: ['Channel.Setting.Name.MinTitleLength'],
    Description: ['Channel.Setting.Description.MinTitleLength'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.MinTitleLength],
    Values: ['10']
  },
  {
    Labels: ['Channel.Setting.Name.TitleSuggestions'],
    Description: ['Channel.Setting.Description.TitleSuggestions'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.TitleSuggestions],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.DefaultTemplate'],
    Description: ['Channel.Setting.Description.DefaultTemplate'],
    Type: SettingType.List,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.TemplateId],
    Values: ['0'],
    Extra: [SettingExtra.TemplateList]
  },
  {
    Labels: ['Channel.Setting.Name.DefaultEAN'],
    Description: ['Channel.Setting.Description.DefaultEAN'],
    Type: SettingType.String,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.DefaultEAN],
    Values: ['_t:Channel.Setting.Value.DoesNotApply']
  },
  {
    Labels: ['Channel.Setting.Name.DefaultMPN'],
    Description: ['Channel.Setting.Description.DefaultMPN'],
    Type: SettingType.String,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.DefaultMpn],
    Values: ['_t:Channel.Setting.Value.DoesNotApply'],
  },
  {
    Labels: ['Channel.Setting.Name.DefaultQuantity'],
    Description: ['Channel.Setting.Description.DefaultQuantity'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.DefaultQuantity],
    Values: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.MinImages'],
    Description: ['Channel.Setting.Description.MinImages'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Listing,
    Fields: [ChannelSettingKey.MinImages],
    Values: ['1']
  },




  {
    Labels: ['Channel.Setting.Name.UseBusiness'],
    Description: ['Channel.Setting.Description.UseBusiness'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.UseBusinessPolicies],
    Values: ['0'],
    ChannelIds:[ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.PolicyReturns'],
    Description: ['Channel.Setting.Description.PolicyReturns'],
    Type: SettingType.List,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.ReturnsPolicy],
    Values: [
      '30 Days',
      'Days_14', '_t:Channel.Setting.Option.Days14',
      'Days_30', '_t:Channel.Setting.Option.Days30',
      'Days_60', '_t:Channel.Setting.Option.Days60',
      'No_Returns', '_t:Channel.Setting.Option.NoReturns'
    ],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
      Value:'0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.PolicyDelivery'],
    Description: ['Channel.Setting.Description.PolicyDelivery'],
    Type: SettingType.List,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.DefaultShipping],
    Values: [null],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
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
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.DispatchDays],
    Values: ['1'],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
      Value: '0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.GSP'],
    Description: ['Channel.Setting.Description.GSP'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.GSP],
    Values: ['0'],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
      Value: '0'
    }],
    AncestorsHide: true,
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessShipping'],
    Description: ['Channel.Setting.Description.BusinessShipping'],
    Type: SettingType.List,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.ShippingProfileId],
    Values: [null],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
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
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.ReturnProfileId],
    Values: [null],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
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
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.PaymentProfileId],
    Values: [null],
    Ancestors: [{
      Field: ChannelSettingKey.UseBusinessPolicies,
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
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.LocationPostcode],
    Values: [''],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.BusinessCity'],
    Description: ['Channel.Setting.Description.BusinessCity'],
    Type: SettingType.String,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.LocationCity],
    Values: [''],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: ['Channel.Setting.Name.PaymentMethod'],
    Description: ['Channel.Setting.Description.PaymentMethod'],
    Type: SettingType.BooleanStringNull,
    Section: ChannelSettingSection.Business,
    Fields: [ChannelSettingKey.PaypalEmail],
    Values: [null,'example@email.com'],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Labels: [''],
    Description: [''],
    Type: SettingType.Button,
    Section: ChannelSettingSection.Business,
    Fields: [],
    Values: ['Channel.Setting.Name.RefreshPolicies'],
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi],
    Extra: [SettingExtra.RefreshPolicies]
  },

  {
    Labels: ['Channel.Setting.Name.NoApiName'],
    Description: ['Channel.Setting.Description.NoApiName'],
    Type: SettingType.String,
    Section: ChannelSettingSection.Other,
    Fields: [ChannelSettingKey.NoApiName],
    Values: [''],
    ChannelIds: [ePlatform.eBay, ePlatform.Amazon],
    Extra: [SettingExtra.NoApiName]
  },
  {
    Labels: ['Channel.Setting.Name.FeePercentage'],
    Description: ['Channel.Setting.Description.FeePercentage'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Other,
    Fields: [ChannelSettingKey.FeePercentage],
    Values: ['13']
  },
];