import { ColumnData } from '../../../small-components/tables/types/columns';
import { RenderBoolean, RenderChannelItem, RenderCostOrProfit, RenderDate, RenderImage, RenderMarkup,  RenderPrice,  RenderMonitorPriceDecreasePercentage,  RenderSource, RenderStock, RenderAmazonSku, RenderLowestPrice, FnOnSetPrice, RenderOtherChannels, RenderPendingStatus, RenderError, FnOnRetry } from './columns-renders';
import { SorterChanelItem, SorterSource, SorterTitle, SorterSell, SorterCost, SorterProfit, SorterMarkup, SorterStock, SorterCreatedOn, SorterNotes, SorterMonitorPrice, SorterMonitorStock, SorterMonitorPriceDecrease, SorterMonitorPriceDecreasePercentage, SorterIgnoreRules, SorterUnsoldDays, SorterOutOfStockDays, SorterWatches, SorterEndsOn, SorterVariation, SorterDispatchDays, SorterQuantitySold, SorterViews, SorterAsin, SorterLowestPrice, SorterBuyBox, SorterOtherChannels, SorterCreatedBy, SorterStatus, SorterError } from './columns-sorter';
import { ListingStatusFilter, MultiTermFilter } from './smart-search-filters';
import { ListingT } from './types';

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
  ChannelItem = 12,
  Notes = 13,
  MonitorPrice = 14,
  MonitorStock = 15,
  MonitorPriceDecrease = 16,
  MonitorPriceDecreasePercentage = 17,
  IgnoreRules = 18,
  UnsoldDays = 19,
  OutOfStockDays = 20,
  OtherChannels = 21,
  CreatedBy = 22,
  Watchers = 23,
  EndingOn = 24,
  VariationOptions = 25,
  DispatchDays = 26,
  Sales = 27,
  Views = 28,
  AmazonAsin = 29,
  AmazonSku = 30,
  AmazonLowestPrice = 31,
  AmazonBuyBox = 32,
  PendingStatus = 33,
  Error = 34
}

export interface ListingColumnData extends ColumnData<ListingT> {
  id: ListingColumnId
}

export const GenerateListingsColumns = (onSetPrice: FnOnSetPrice, onRetryPending: FnOnRetry): ListingColumnData[] => [
  {
    id: ListingColumnId.Image,
    title: 'Listings.Column.Img',
    dataIndex: 'imageUrl',
    smartSearch: { ignore: true },
    render: RenderImage
  },
  {
    id: ListingColumnId.AmazonAsin,
    title: 'Listings.Column.Asin',
    dataIndex: 'asin',
    render: RenderChannelItem,
    sorter: SorterAsin
  },
  {
    id: ListingColumnId.AmazonSku,
    title: 'Listings.Column.Sku',
    dataIndex: 'channelItem',
    render: RenderAmazonSku,
    sorter: SorterChanelItem
  },
  {
    id: ListingColumnId.ChannelItem,
    title: 'Listings.Column.ChannelItem',
    dataIndex: 'channelItem',
    width: 70,
    render: RenderChannelItem,
    sorter: SorterChanelItem
  },
  {
    id: ListingColumnId.Source,
    title: 'Listings.Column.Source',
    dataIndex: 'sourcePath',
    width: 70,
    render: RenderSource,
    sorter: SorterSource
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
    },
    sorter: SorterTitle
  },
  {
    id: ListingColumnId.VariationOptions,
    title: 'Listings.Column.Variation',
    dataIndex: 'variationsText',
    smartSearch: { ignore: true },
    sorter: SorterVariation
  },
  {
    id: ListingColumnId.SellPrice,
    title: 'Listings.Column.Sell',
    dataIndex: 'channelPrice',
    render: RenderPrice,
    sorter: SorterSell
  },
  {
    id: ListingColumnId.AmazonLowestPrice,
    title: 'Listings.Column.LowestPrice',
    dataIndex: 'lowestPrice',
    render: RenderLowestPrice(onSetPrice),
    sorter: SorterLowestPrice
  },
  {
    id: ListingColumnId.AmazonBuyBox,
    title: 'Listings.Column.BuyBox',
    dataIndex: 'buyBoxPrice',
    render: RenderPrice,
    sorter: SorterBuyBox
  },
  {
    id: ListingColumnId.CostPrice,
    title: 'Listings.Column.Cost',
    dataIndex: 'sourcePrice',
    render: RenderCostOrProfit,
    sorter: SorterCost
  },
  {
    id: ListingColumnId.Profit,
    title: 'Listings.Column.Profit',
    dataIndex: 'profit',
    render: RenderCostOrProfit,
    sorter: SorterProfit
  },
  {
    id: ListingColumnId.Markup,
    title: 'Listings.Column.Markup',
    dataIndex: 'markup',
    render: RenderMarkup,
    sorter: SorterMarkup
  },
  {
    id: ListingColumnId.Stock,
    title: 'Listings.Column.Stock',
    dataIndex: 'sourceQuantity',
    smartSearch: { ignore: true },
    render: RenderStock,
    sorter: SorterStock
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
    smartSearch: { ignore: true },
    render: RenderDate,
    sorter: SorterCreatedOn
  },
  {
    id: ListingColumnId.PendingStatus,
    title: 'Listings.Column.Status',
    dataIndex: 'status',
    smartSearch: { customFilter: ListingStatusFilter },
    render: RenderPendingStatus,
    sorter: SorterStatus
  },
  {
    id: ListingColumnId.Error,
    title: 'Listings.Column.Error',
    dataIndex: 'errorMessage',
    smartSearch: { ignore: true },
    render: RenderError(onRetryPending),
    sorter: SorterError
  },
  {
    id: ListingColumnId.CreatedBy,
    title: 'Listings.Column.CreatedBy',
    dataIndex: 'createdByName',
    smartSearch: { ignore: true },
    sorter: SorterCreatedBy
  },
  {
    id: ListingColumnId.Notes,
    title: 'Listings.Column.Notes',
    dataIndex: 'productNotes',
    smartSearch: { customFilter: MultiTermFilter },
    sorter: SorterNotes
  },
  {
    id: ListingColumnId.MonitorPrice,
    title: 'Listings.Column.MonitorPrice',
    dataIndex: 'monitorPrice',
    smartSearch: { ignore: true },
    render: RenderBoolean,
    sorter: SorterMonitorPrice
  },
  {
    id: ListingColumnId.MonitorStock,
    title: 'Listings.Column.MonitorStock',
    dataIndex: 'monitorStock',
    smartSearch: { ignore: true },
    render: RenderBoolean,
    sorter: SorterMonitorStock
  },
  {
    id: ListingColumnId.MonitorPriceDecrease,
    title: 'Listings.Column.MonitorPriceDecrease',
    dataIndex: 'monitorPriceDecrease',
    smartSearch: { ignore: true },
    render: RenderBoolean,
    sorter: SorterMonitorPriceDecrease
  },
  {
    id: ListingColumnId.MonitorPriceDecreasePercentage,
    title: 'Listings.Column.MonitorPriceDecreasePercentage',
    dataIndex: 'monitorPriceDecreasePercentage',
    smartSearch: { ignore: true },
    render: RenderMonitorPriceDecreasePercentage,
    sorter: SorterMonitorPriceDecreasePercentage
  },
  {
    id: ListingColumnId.IgnoreRules,
    title: 'Listings.Column.IgnoreRules',
    dataIndex: 'ignoreRules',
    smartSearch: { ignore: true },
    render: RenderBoolean,
    sorter: SorterIgnoreRules
  },
  {
    id: ListingColumnId.UnsoldDays,
    title: 'Listings.Column.UnsoldDays',
    dataIndex: 'unsoldDays',
    smartSearch: { ignore: true },
    sorter: SorterUnsoldDays
  },
  {
    id: ListingColumnId.OutOfStockDays,
    title: 'Listings.Column.OutOfStockDays',
    dataIndex: 'outOfStockDays',
    smartSearch: { ignore: true },
    sorter: SorterOutOfStockDays
  },
  {
    id: ListingColumnId.Sales,
    title: 'Listings.Column.Sales',
    dataIndex: 'quantitySold',
    smartSearch: { ignore: true },
    sorter: SorterQuantitySold
  },
  {
    id: ListingColumnId.Watchers,
    title: 'Listings.Column.Watchers',
    dataIndex: 'watches',
    smartSearch: { ignore: true },
    sorter: SorterWatches
  },
  {
    id: ListingColumnId.Views,
    title: 'Listings.Column.Views',
    dataIndex: 'views',
    smartSearch: { ignore: true },
    sorter: SorterViews
  },
  {
    id: ListingColumnId.EndingOn,
    title: 'Listings.Column.EndingOn',
    dataIndex: 'endsOn',
    smartSearch: { ignore: true },
    render: RenderDate,
    sorter: SorterEndsOn
  },
  {
    id: ListingColumnId.DispatchDays,
    title: 'Listings.Column.DispatchDays',
    dataIndex: 'dispatchDays',
    smartSearch: { ignore: true },
    sorter: SorterDispatchDays
  },
  {
    id: ListingColumnId.OtherChannels,
    title: 'Listings.Column.OtherChannels',
    dataIndex: 'otherChannels',
    smartSearch: { ignore: true },
    render: RenderOtherChannels,
    sorter: SorterOtherChannels
  }
];