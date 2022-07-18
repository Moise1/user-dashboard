import { OrderColumnId } from './columns';

export const AllColumns = [
  OrderColumnId.Image,
  OrderColumnId.ChannelItem,
  OrderColumnId.Source,
  OrderColumnId.Title,
  OrderColumnId.Quantity,
  OrderColumnId.Sold,
  OrderColumnId.Cost,
  OrderColumnId.Fees,
  OrderColumnId.Profit,
  OrderColumnId.Margin,
  OrderColumnId.DateOfOrder,
  OrderColumnId.Status
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

export const ColumnsVisibleByDefault = [
  OrderColumnId.Image,
  //OrderColumnId.ChannelItem,
  //OrderColumnId.Source,
  OrderColumnId.Title,
  OrderColumnId.Quantity,
  OrderColumnId.Sold,
  OrderColumnId.Cost,
  OrderColumnId.Fees,
  OrderColumnId.Profit,
  OrderColumnId.Margin,
  OrderColumnId.DateOfOrder,
  OrderColumnId.Status
];