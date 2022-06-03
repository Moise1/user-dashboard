export enum ChannelSettingSection {
  Monitoring, Listing, Business, Other
}

interface ChannelSettingSectionsInfo {
  Type: ChannelSettingSection;
  Label: string;
  ChannelIds?: number[]
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
    ChannelIds: [1, 3]
  },
  {
    Type: ChannelSettingSection.Other,
    Label: 'Channel.Other'
  }
];