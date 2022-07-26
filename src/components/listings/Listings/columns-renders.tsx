import { Platforms } from '../../../data/platforms';
import { Channel } from '../../../redux/channels/channelsSlice';
import { t } from '../../../utils/transShim';
import { url as ApiURL } from '../../../redux/client';
import { Source } from '../../../redux/sources/sourceSlice';
import { ActiveListingExtended, ListingT } from './types';
import { CloseCircleFilled, CheckCircleFilled, ApiFilled, CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { ReactUtils } from '../../../utils/react-utils';
import { HGRUtils } from '../../../utils/hgr-utils';
import { Dropdown, Menu } from 'antd';

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

export const RenderAmazonSku = (channelItem: string, rowR: ListingT) => {
  if (channelItem == null) return '';

  const { channel, asin } = rowR as { channel: Channel, asin: string };

  const url = (() => {
    const infoChannel = Platforms[channel.channelId];
    if (infoChannel && infoChannel.itemUrl) {
      const baseUrl = (infoChannel.internalUrl instanceof Object) ? infoChannel.internalUrl[channel.isoCountry] : infoChannel.internalUrl;

      return baseUrl
        .replace('{asin}', asin ?? '')
        .replace('{sku}', channelItem)
        .replace('{shopName}', channel.channelIdentifier);
    } else {
      return '';
    }
  })();

  return (
    <a href={url} target="_blank" rel='noreferrer' >
      {channelItem}
    </a>
  );
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

export const RenderDate = (date: string | Date | undefined) => {
  return ReactUtils.GetFormattedDateTime(date);
};

export const RenderBoolean = (value: boolean | undefined) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {value && <CheckOutlined className="icon" />}
      {!value && <CloseOutlined className="icon" />}
    </div>
  );
};

export const RenderPercentage = (value: number | undefined) => {
  if (value == null)
    return '';
  return value + '%';
};

export const RenderMonitorPriceDecreasePercentage = (value: number | undefined) => {
  if (value == null)
    return '';
  if (value == 0)
    return <div style={{ textAlign: 'center' }}>{t('Listings.Value.Always')}</div>;
  return <div style={{ textAlign: 'center' }}>{value + '%'}</div>;
};

export type FnOnSetPrice = (row: ListingT, newPrice: number) => void;
export const RenderLowestPrice = (onSetPrice: FnOnSetPrice) => (lowestPrice: number | undefined, rowR: ListingT) => {
  const { isLowestPrice, channelPrice, asin , sourcePrice, sourceId, ignoreRules, pricingRules  } = rowR as ActiveListingExtended;

  const RenderIsLowestPrice = () => {
    return (
      <div className="bestPrice">
        <a
          href={'https://www.amazon.co.uk/gp/offer-listing/' + asin}
          target="_blank"
          rel='noreferrer'
          onClick={ReactUtils.OnClickNoPropagate}
        >
          <span className="glyphicon glyphicon-ok"></span>
          {t('Listings.Value.Lowest')}
        </a>
      </div>
    );
  };
  
  const SetPrice = (newPrice: number) => {
    if (newPrice && onSetPrice) {
      onSetPrice(rowR, newPrice);
    }
  };

  const BeatPrice = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    SetPrice((lowestPrice ?? channelPrice) - 0.01);
  };

  const MatchPrice = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    SetPrice(lowestPrice ?? channelPrice);
  };

  const RenderDropDown = () => {
    let hasRules = false;
    if (sourcePrice && sourceId && !ignoreRules) {
      hasRules = HGRUtils.GetMarkupFromPricingRules(sourcePrice, pricingRules) != null;
    }

    const iRules = hasRules ? ' (' + t('Listings.Value.IgnoreRules') + ')' : '';
   
    const menu = (<Menu
      items={[
        {
          key: '1',
          label: (
            <a href="#" onClick={(e) => BeatPrice(e)}>
              {'Beat' + iRules}
            </a>
          )
        },
        {
          key: '2',
          label: (
            <a href="#" onClick={(e) => MatchPrice(e)}>
              {'Match' + iRules}
            </a>
          )
        }
      ]}
    />);

    return (
      <Dropdown arrow overlay={menu}>
        <span>
          {' '}
          <DownOutlined />
        </span>
      </Dropdown>
    );
  };

  const RenderIsNotLowestPrice = () => {
    return (
      <div className="bestPrice">
        <a
          href={
            'https://www.amazon.co.uk/gp/offer-listing/' + asin + '?ref=myi_lowprice_offer'
          }
          target="_blank"
          rel='noreferrer'
          onClick={ReactUtils.OnClickNoPropagate}
        >
          {lowestPrice}
        </a>
        {RenderDropDown()}
      </div>
    );
  };

  if (isLowestPrice || (channelPrice ?? 0) <= (lowestPrice ?? -1)) {
    return RenderIsLowestPrice();
  } else if (lowestPrice) {
    return RenderIsNotLowestPrice();
  } else {
    return '-';
  }
};