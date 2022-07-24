import { Platforms } from '../../../data/platforms';
import { Channel } from '../../../redux/channels/channelsSlice';
import { t } from '../../../utils/transShim';
import moment from 'moment';
import { Link } from 'react-router-dom';

type FieldValue = unknown;
type RecordType = Record<string, FieldValue>;

export const RenderChannelItem = (channelItem: string, rowR: RecordType) => {
  console.log(localStorage.getItem('channelId'));
  const row = rowR as { channel: Channel, asin?: string, id: number };

  const selectedChannel = localStorage.getItem('selectedChannel');
  const channel = (selectedChannel ? JSON.parse(selectedChannel) : null) as Channel;

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
    url = url.replace('{id}', channelItem ?? '');
    return <Link target='_blank' rel='noreferrer' to={{
      pathname: '/BuyNow',
      search: '?sourceUrl=' + encodeURI(url)
    }}>{channelItem}</Link>;
  }
};

export const RenderSource = (sourceName: string, rowR: RecordType) => {
  if (sourceName == undefined || sourceName == '')
    return t('OrderTable.Value.UnknownSource');
  const url = rowR.sourceUrl as unknown as string;
  return <Link target='_blank' rel='noreferrer' to={{
    pathname: '/BuyNow',
    search: '?sourceUrl=' + encodeURI(url)
  }} > {sourceName}</ Link>;
};

export const RenderImage = (imageUrl: string) => {
  return <div className="order-img-container">
    <img src={imageUrl} alt="image" className="record-img" />
  </div>;
};

export const RenderDate = (date: Date) => moment(date).format('DD/MM/YY HH:mm');