export enum TableColumnId {
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
  CreatedOn = 11
}

export type ColumnData = {
  id: TableColumnId,
  title: string;
  width?: number;
  dataIndex: string;
}

export const ListingsColumns: ColumnData[] = [
  {
    id: TableColumnId.Image,
    title: 'Listings.Column.Img',
    dataIndex: 'imageUrl'
  },
  {
    id: TableColumnId.Source,
    title: 'Listings.Column.Source',
    dataIndex: 'sourcePath',
    width: 70
  },
  {
    id: TableColumnId.Id,
    title: 'Listings.Column.Id',
    dataIndex: 'id'
  },
  {
    id: TableColumnId.Title,
    title: 'Listings.Column.Title',
    dataIndex: 'title'
  },
  {
    id: TableColumnId.SellPrice,
    title: 'Listings.Column.Sell',
    dataIndex: 'channelPrice'
  },
  {
    id: TableColumnId.CostPrice,
    title: 'Listings.Column.Cost',
    dataIndex: 'sourcePrice'
  },
  {
    id: TableColumnId.Profit,
    title: 'Listings.Column.Profit',
    dataIndex: 'profit'
  },
  {
    id: TableColumnId.Markup,
    title: 'Listings.Column.Markup',
    dataIndex: 'markup'
  },
  {
    id: TableColumnId.Stock,
    title: 'Listings.Column.Stock',
    dataIndex: 'stock'
  },
  {
    id: TableColumnId.Options,
    title: 'Listings.Column.Options',
    dataIndex: 'options'
  },
  {
    id: TableColumnId.CreatedOn,
    title: 'Listings.Column.CreatedOn',
    dataIndex: 'createdOn',
  }
];