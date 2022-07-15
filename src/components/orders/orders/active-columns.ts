import { OrderColumnId } from './columns';

export const ActiveListingsColumns = [
  OrderColumnId.Image,
  OrderColumnId.ChannelItem,
  OrderColumnId.Source,
  OrderColumnId.Title,
  OrderColumnId.SellPrice,
  OrderColumnId.CostPrice,
  OrderColumnId.Profit,
  OrderColumnId.Markup,
  OrderColumnId.Stock,
  OrderColumnId.CreatedOn,
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
  OrderColumnId.Image,
  OrderColumnId.ChannelItem,
  OrderColumnId.Source,
  OrderColumnId.Title,
  OrderColumnId.SellPrice,
  OrderColumnId.CostPrice,
  OrderColumnId.Profit,
  OrderColumnId.Markup,
  OrderColumnId.Stock,
  OrderColumnId.CreatedOn
];