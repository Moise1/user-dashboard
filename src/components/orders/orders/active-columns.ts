import { ListingColumnId } from './columns';

export const ActiveListingsColumns = [
  ListingColumnId.Image,
  ListingColumnId.ChannelItem,
  ListingColumnId.Source,
  ListingColumnId.Title,
  ListingColumnId.SellPrice,
  ListingColumnId.CostPrice,
  ListingColumnId.Profit,
  ListingColumnId.Markup,
  ListingColumnId.Stock,
  ListingColumnId.CreatedOn,
  //TableColumnId.CreatedBy,
  //TableColumnId.Notes,
  //TableColumnId.MonitorPrice,
  //TableColumnId.MonitorSotck,
  //TableColumnId.PriceDecrease,
  //TableColumnId.PriceDecreasePercent,
  //TableColumnId.IgnoreRules,
  //TableColumnId.UnsoldDayas,
  //TableColumnId.OutOfStockDays,
  //TableColumnId.AlsoOn,
];

export const ActiveListingsColumnsVisibleByDefault = [
  ListingColumnId.Image,
  ListingColumnId.ChannelItem,
  ListingColumnId.Source,
  ListingColumnId.Title,
  ListingColumnId.SellPrice,
  ListingColumnId.CostPrice,
  ListingColumnId.Profit,
  ListingColumnId.Markup,
  ListingColumnId.Stock,
  ListingColumnId.CreatedOn
];