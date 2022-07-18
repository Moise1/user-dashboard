import { Platforms } from '../../../data/platforms';
import { Channel } from '../../../redux/channels/channelsSlice';
import { t } from '../../../utils/transShim';
import { url as ApiURL } from '../../../redux/client';
import { Source } from '../../../redux/sources/sourceSlice';
import moment from 'antd/node_modules/moment';

type FieldValue = unknown;
type RecordType = Record<string, FieldValue>;

export const RenderChannelItem = (channelItem: string, rowR: RecordType) => {
  const row = rowR as { channel: Channel, asin?: string, id: number };
  const channel = row.channel;
  if (!channel)
    return channelItem;

  const platform = Platforms[channel.channelId];

  if (!platform)
    return channelItem;

  if (platform.useInternalInList) {
    let url: string;
    if (platform.internalUrl instanceof Object) url = platform.internalUrl[channel.isoCountry];
    else url = platform.internalUrl;

    if (!row.asin)
      return '';

    url = url
      .replace('{asin}', row.asin ?? '')
      .replace('{sku}', channelItem)
      .replace('{shopName}', channel.channelIdentifier);
    return <a target='_blank' rel='noreferrer' href={url}>{row.asin ?? ''}</a>;
  } else {
    let url: string;
    if (platform.itemUrl instanceof Object) {
      url = platform.itemUrl[channel.isoCountry];
    } else {
      url = platform.itemUrl;
    }
    return <a target='_blank' rel='noreferrer' href={ApiURL + '/ChannelListing/BuyNow?sourceUrl=' + encodeURI(url) + '&channelListingId=' + row.id}>{channelItem}</a>;
  }
};

export const RenderSource = (path: string, rowR: RecordType) => {
  const row = rowR as { source: Source, id: number };
  const source = row.source;
  if (!source)
    return t('Listings.UnknownSource');
  const url = 'https://' + source.baseUrl + '/' + path;
  return <a target='_blank' rel='noreferrer' href={ApiURL + '/ChannelListing/BuyNow?sourceUrl=' + encodeURI(url) + '&channelListingId=' + row.id}>{source.name}</a>;
};

export const RenderImage = (imageUrl: string) => {
  return <div className="order-img-container">
    <img src={imageUrl} alt="image" className="record-img" />
  </div>;
};

export const RenderDate = (date:Date) => moment(date).format('DD/MM/YY hh:mm');