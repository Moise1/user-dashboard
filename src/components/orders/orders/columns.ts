import { ColumnData } from '../../../small-components/tables/types/columns';
import { RenderChannelItem, RenderSource } from './columns-renders';

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
    render: RenderChannelItem
  },
  {
    id: ListingColumnId.Source,
    title: 'Listings.Column.Source',
    dataIndex: 'sourcePath',
    width: 70,
    render: RenderSource
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