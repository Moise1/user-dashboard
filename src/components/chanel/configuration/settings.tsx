import { eChannelSettings } from '../../../redux/channel-configuration/channels-configuration-slice';
import { ChannelSettingSection } from './sections';

export enum SettingType {
  Number, Boolean, TwoOptions, SwitchTwoOptions, TwoOptionsTwo
}

export interface ChannelSetting {
  Labels: string[];
  Description: string[];
  Type: SettingType;
  Section: ChannelSettingSection;
  Fields: eChannelSettings[];
  DefaultValues: string[];
}

export const ChannelSettings: ChannelSetting[] = [
  {
    Labels: ['Channel.Setting.Name.Markup'],
    Description: ['Channel.Setting.Description.Markup'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Monitoring,
    Fields: [eChannelSettings.Markup],
    DefaultValues: ['30']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorStock'],
    Description: ['Channel.Setting.Description.MonitorStock'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [eChannelSettings.MonitorStock],
    DefaultValues: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.MonitorPrice'],
    Description: ['Channel.Setting.Description.MonitorPrice'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [eChannelSettings.MonitorPrice],
    DefaultValues: ['1']
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
    Fields: [eChannelSettings.MonitorPriceDecrease, eChannelSettings.MonitorPriceDecreasePercentage],
    DefaultValues: ['1','0','0', '30']
  },
  {
    Labels: ['Channel.Setting.Name.MinQuantity'],
    Description: ['Channel.Setting.Description.MinQuantity'],
    Type: SettingType.Number,
    Section: ChannelSettingSection.Monitoring,
    Fields: [eChannelSettings.MinQuantity],
    DefaultValues: ['1']
  },
  {
    Labels: ['Channel.Setting.Name.Ending99'],
    Description: ['Channel.Setting.Description.Ending99'],
    Type: SettingType.Boolean,
    Section: ChannelSettingSection.Monitoring,
    Fields: [eChannelSettings.TransformPrice],
    DefaultValues: ['0']
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
    Type: SettingType.TwoOptionsTwo,
    Section: ChannelSettingSection.Monitoring,
    Fields: [eChannelSettings.OutOfStockAction, eChannelSettings.OutOfStockActionPriceIncreaseAmount],
    DefaultValues: ['1', '100', '1', '2']
  },
];