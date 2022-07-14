import { Link } from 'react-router-dom';
import { Platforms } from '../../../data/platforms';
import { Channel } from '../../../redux/channels/channelsSlice';
import { Source } from '../../../redux/sources/sourceSlice';
import { ColumnData } from '../../../small-components/tables/types/columns';
import { t } from '../../../utils/transShim';
import { url as ApiURL } from '../../../redux/client';

export enum ListingColumnId {
  Image = 1,
  Source = 2,
  Id = 3,
  Title = 4,
  SellPrice = 5,
  CostPrice = 6,
  Profit = 7,
  Markup = 8,
  Stock = 9,
  Options = 10,
  CreatedOn = 11,
  ChannelItem= 12
}

type FieldValue = unknown;
type RecordType = Record<string, FieldValue>;

export interface ListingColumnData extends ColumnData<RecordType> {
  id: ListingColumnId
}

const MultiTermFilter = (fieldValue: FieldValue, searchTerm: string) => {
  const terms = searchTerm.trim().split(' ');
  for (const term of terms) {
    if (term.length == 0)
      continue;
    if ((fieldValue as string)?.toLocaleLowerCase?.().indexOf?.(term) < 0) {
      return false;
    }
  }
  return true;
};

export const ListingsColumns: ListingColumnData[] = [
  {
    id: ListingColumnId.Image,
    title: 'Listings.Column.Img',
    dataIndex: 'imageUrl',
    smartSearch: { ignore: true}
  },
  {
    id: ListingColumnId.ChannelItem,
    title: 'Listings.Column.ChannelItem',
    dataIndex: 'channelItem',
    width: 70,
    render: (channelItem: string, rowR: RecordType) => {
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
        return <Link target="_blank" to={url}>{row.asin ?? ''}</Link>;
      } else {
        let url: string;
        if (platform.itemUrl instanceof Object) {
          url = platform.itemUrl[channel.isoCountry];
        } else {
          url = platform.itemUrl;
        }
        return <a target="_blank" rel="noreferrer" href={ApiURL + '/ChannelListing/BuyNow?sourceUrl=' + encodeURI(url) + '&channelListingId=' + row.id}>{channelItem}</a>;
      }
    }
  },
  {
    id: ListingColumnId.Source,
    title: 'Listings.Column.Source',
    dataIndex: 'sourcePath',
    width: 70,
    render: (path: string, rowR: RecordType) => {
      const row = rowR as { source: Source, id: number };
      const source = row.source;
      if (!source)
        return t('Listings.UnknownSource');
      const url = 'https://' + source.baseUrl + '/' + path;
      return <a target="_blank" rel="noreferrer" href={ApiURL + '/ChannelListing/BuyNow?sourceUrl=' + encodeURI(url) + '&channelListingId=' + row.id}>{source.name}</a>;
    }
  },
  {
    id: ListingColumnId.Id,
    title: 'Listings.Column.Id',
    dataIndex: 'id'
  },
  {
    id: ListingColumnId.Title,
    title: 'Listings.Column.Title',
    dataIndex: 'title',
    smartSearch: {
      customFilter: MultiTermFilter
    }
  },
  {
    id: ListingColumnId.SellPrice,
    title: 'Listings.Column.Sell',
    dataIndex: 'channelPrice'
  },
  {
    id: ListingColumnId.CostPrice,
    title: 'Listings.Column.Cost',
    dataIndex: 'sourcePrice'
  },
  {
    id: ListingColumnId.Profit,
    title: 'Listings.Column.Profit',
    dataIndex: 'profit'
  },
  {
    id: ListingColumnId.Markup,
    title: 'Listings.Column.Markup',
    dataIndex: 'markup'
  },
  {
    id: ListingColumnId.Stock,
    title: 'Listings.Column.Stock',
    dataIndex: 'stock',
    smartSearch: { ignore: true }
  },
  {
    id: ListingColumnId.Options,
    title: 'Listings.Column.Options',
    dataIndex: 'options',
    smartSearch: { ignore: true }
  },
  {
    id: ListingColumnId.CreatedOn,
    title: 'Listings.Column.CreatedOn',
    dataIndex: 'createdOn',
    smartSearch: { ignore: true }
  }
];