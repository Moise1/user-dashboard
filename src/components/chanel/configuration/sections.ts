import { ePlatform } from '../../../data/platforms';


export enum ChannelSettingSection {
  Monitoring, Listing, Business, Other
}

interface ChannelSettingSectionsInfo {
  Type: ChannelSettingSection;
  Label: string;
  ChannelIds?: ePlatform[]//If undefined it accepts all the channels
}

export const ChannelSettingsSections: ChannelSettingSectionsInfo[] = [
  {
    Type: ChannelSettingSection.Monitoring,
    Label: 'Channel.Monitoring'
  },
  {
    Type: ChannelSettingSection.Listing,
    Label: 'Channel.Listing'
  },
  {
    Type: ChannelSettingSection.Business,
    Label: 'Channel.Business',
    ChannelIds: [ePlatform.eBay, ePlatform.eBayNoApi]
  },
  {
    Type: ChannelSettingSection.Other,
    Label: 'Channel.Other'
  }
];