import { ColumnData } from '../../../small-components/tables/types/columns';
import { RenderChannelItem, RenderSource } from './columns-renders';

export enum OrderColumnId {
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

export interface OrderColumnData extends ColumnData<RecordType> {
  id: OrderColumnId
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

export const OrdersColumns: OrderColumnData[] = [
  {
    id: OrderColumnId.Image,
    title: 'Orders.Column.Img',
    dataIndex: 'imageUrl',
    smartSearch: { ignore: true}
  },
  {
    id: OrderColumnId.ChannelItem,
    title: 'Orders.Column.ChannelItem',
    dataIndex: 'channelItem',
    width: 70,
    render: RenderChannelItem
  },
  {
    id: OrderColumnId.Source,
    title: 'Orders.Column.Source',
    dataIndex: 'sourcePath',
    width: 70,
    render: RenderSource
  },
  {
    id: OrderColumnId.Id,
    title: 'Orders.Column.Id',
    dataIndex: 'id'
  },
  {
    id: OrderColumnId.Title,
    title: 'Orders.Column.Title',
    dataIndex: 'title',
    smartSearch: {
      customFilter: MultiTermFilter
    }
  },
  {
    id: OrderColumnId.SellPrice,
    title: 'Orders.Column.Sell',
    dataIndex: 'channelPrice'
  },
  {
    id: OrderColumnId.CostPrice,
    title: 'Orders.Column.Cost',
    dataIndex: 'sourcePrice'
  },
  {
    id: OrderColumnId.Profit,
    title: 'Orders.Column.Profit',
    dataIndex: 'profit'
  },
  {
    id: OrderColumnId.Markup,
    title: 'Orders.Column.Markup',
    dataIndex: 'markup'
  },
  {
    id: OrderColumnId.Stock,
    title: 'Orders.Column.Stock',
    dataIndex: 'stock',
    smartSearch: { ignore: true }
  },
  {
    id: OrderColumnId.Options,
    title: 'Orders.Column.Options',
    dataIndex: 'options',
    smartSearch: { ignore: true }
  },
  {
    id: OrderColumnId.CreatedOn,
    title: 'Orders.Column.CreatedOn',
    dataIndex: 'createdOn',
    smartSearch: { ignore: true }
  }
];