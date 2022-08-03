import moment from 'moment';
import { OrderData } from '../../../redux/orders/orderSlice';
import { ColumnData } from '../../../small-components/tables/types/columns';
import { determineStatus } from '../../../utils/determineStatus';
import { RenderChannelItem, RenderDate, RenderImage, RenderSource } from './columns-renders';

export enum OrderColumnId {
  Image = 1,
  Reference = 2,
  ChannelItem = 3,
  Source = 4,
  Title = 5,
  Quantity = 6,
  Sold = 7,
  Cost = 8,
  Fees = 9,
  Profit = 10,
  Margin = 11,
  DateOfOrder = 12,
  Status = 13,
}

export type RecordType = {
  channelOAuthIds: [number];
  date: Date;
  imageUrl: string;
  sourceId: number;
  sourceItem: string;
  channelItem: string;
  channelShipping: number;
  channelCurrency: string;
  sourceCurrencyId: null;
  shippingAddressId: number;
  billingAddressId: number;
  channelTax: number;
  channelVAT: number;
  channelPaymentTaxes: number;
  sourceVAT: null;
  sourceShipping: null;
  sourcePath: string;
  storeStatus: number;
  hgrTrackingNumber: null;
  buyReference: string;
  cancelRequested: boolean;
  orderLineId: number;
  id: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  phone: number;
  city: string;
  zip: string;
  province: string;
  country: string;
  countryCode: string;
  provinceCode: string;
  //Added for advance search
  reference: string;
  quantity: number;
  title: string;
  sold: string;
  cost: string;
  fees: number;
  profit?: number | string;//Calculated in local
  margin?: number;
  status: number | string;
  sourcePrice: number;
  channelPrice: number;
  key: number; //Calculated in local
  //Calculated in client:
  sourceAOConfigured: boolean;
  sourceAOEnabled: boolean;
  sourceUrl: string;
  sourceName: string;
};

type FieldValue = unknown;
//type RecordType = Record<string, FieldValue>;

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
    title: 'OrderTable.Image',
    dataIndex: 'imageUrl',
    smartSearch: { ignore: true },
    render: RenderImage
  },
  {
    id: OrderColumnId.Reference,
    title: 'OrderTable.Reference',
    dataIndex: 'reference',
    width: 70
  },
  {
    id: OrderColumnId.ChannelItem,
    title: 'OrderTable.ChannelItem',
    dataIndex: 'channelItem',
    width: 70,
    render: RenderChannelItem
  },
  {
    id: OrderColumnId.Source,
    title: 'OrderTable.Source',
    dataIndex: 'sourceName',
    width: 70,
    render: RenderSource
  },
  {
    id: OrderColumnId.Title,
    title: 'OrderTable.Title',
    dataIndex: 'title',
    smartSearch: {
      customFilter: MultiTermFilter
    }
  },
  {
    id: OrderColumnId.Quantity,
    title: 'OrderTable.Quantity',
    dataIndex: 'quantity'
  },
  {
    id: OrderColumnId.Sold,
    title: 'OrderTable.Sold',
    dataIndex: 'channelPrice'
  },
  {
    id: OrderColumnId.Cost,
    title: 'OrderTable.Cost',
    dataIndex: 'sourcePrice'
  },
  {
    id: OrderColumnId.Fees,
    title: 'OrderTable.Fees',
    dataIndex: 'fees'
  },
  {
    id: OrderColumnId.Profit,
    title: 'OrderTable.Profit',
    dataIndex: 'profit'
  },
  {
    id: OrderColumnId.Margin,
    title: 'OrderTable.Margin',
    dataIndex: 'margin'
  },
  {
    id: OrderColumnId.DateOfOrder,
    title: 'OrderTable.DateOfOrder',
    dataIndex: 'date',
    smartSearch: { ignore: true },
    key: 'date',
    sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    render: RenderDate
  },
  {
    id: OrderColumnId.Status,
    title: 'OrderTable.Status',
    dataIndex: 'status',
    render: (status: number, record: RecordType) => determineStatus(status, record as unknown as OrderData)
  }
];