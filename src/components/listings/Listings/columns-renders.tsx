import { Platforms } from '../../../data/platforms';
import { Channel } from '../../../redux/channels/channelsSlice';
import { t } from '../../../utils/transShim';
import { url as ApiURL } from '../../../redux/client';
import { Source } from '../../../redux/sources/sourceSlice';

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
      url = platform.itemUrl[channel.isoCountry]
        .replace('{sku}', channelItem)
        .replace('{shopName}', channel.channelIdentifier);
    } else {
      url = platform.itemUrl
        .replace('{sku}', channelItem)
        .replace('{shopName}', channel.channelIdentifier);
    }
    return <a target='_blank' rel='noreferrer' href={ApiURL + '/api/Sources/BuyNow?sourceUrl=' + encodeURI(url) + '&channelListingId=' + row.id + '&isoCountry=' + row.channel.isoCountry}>{channelItem}</a>;
  }
};

export const RenderSource = (path: string, rowR: RecordType) => {
  const row = rowR as { channel: Channel, source: Source, id: number };
  const source = row.source;
  if (!source)
    return t('Listings.UnknownSource');
  const url = 'https://' + source.baseUrl + '/' + path;
  return <a target='_blank' rel='noreferrer' href={ApiURL + '/api/Sources/BuyNow?sourceUrl=' + encodeURI(url) + '&channelListingId=' + row.id + '&isoCountry=' + row.channel.isoCountry}>{source.name}</a>;
};

export const RenderImage = (imageUrl?: string) => {
  if (!imageUrl) {
    return <div className="record-img"></div>;
  }
  return <div className="record-img"><img src={imageUrl} /></div>;
};

export const RenderPrice = (price: number) => {
  return price.toLocaleString(
    undefined,
    {minimumFractionDigits: 2 }
  );
};