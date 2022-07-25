import { Platforms } from '../../../data/platforms';
import { Channel } from '../../../redux/channels/channelsSlice';
import { t } from '../../../utils/transShim';
import { url as ApiURL } from '../../../redux/client';
import { Source } from '../../../redux/sources/sourceSlice';
import { ActiveListingExtended, ListingT } from './types';
import { CloseCircleFilled, CheckCircleFilled, ApiFilled } from '@ant-design/icons';
import { ReactUtils } from '../../../utils/react-utils';

export const RenderChannelItem = (channelItem: string, rowR: ListingT) => {
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

export const RenderSource = (path: string, rowR: ListingT) => {
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

export const RenderCostOrProfit = (price: number, dataR: ListingT) => {
  const data = dataR as ActiveListingExtended;

  if (!data.monitorPrice || !data.monitorStock) {
    return <ApiFilled className='icon' />;
  }

  return price.toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
};

export const RenderPrice = (price: number) => {
  return price.toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
};

export const RenderMarkup = (markup: number) => {
  return '+' + markup + '%';
};

export const RenderStock = (sourceQuantity: number, dataR: ListingT) => {
  if (sourceQuantity === undefined || sourceQuantity === null) return '';

  const data = dataR as ActiveListingExtended;

  const Icon = (monitorStock: boolean, value: number) => {
    if (!monitorStock) {
      return <ApiFilled className="icon" />;
    }

    if (value) return <CheckCircleFilled className='inStockIcon icon' />;
    else return <CloseCircleFilled className= 'outStockIcon icon' />;
  };

  return (
    <span className="stock-cell">
      {Icon(data.monitorStock ?? true, sourceQuantity)} <span>({data.channelQuantity})</span>
    </span>
  );
};

export const RenderDate = (date: string | Date) => {
  return ReactUtils.GetFormattedDateTime(date);
};