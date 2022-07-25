﻿import { ePlatform } from '../../../types/ePlatform';
import { ListingColumnId } from './columns';

export const ActiveListingsColumns = {
  [ePlatform.eBay]: [
    ListingColumnId.Image,
    ListingColumnId.ChannelItem,
    ListingColumnId.Source,
    ListingColumnId.Title,
    //ListingColumnId.VariationOptions,
    ListingColumnId.SellPrice,
    ListingColumnId.CostPrice,
    ListingColumnId.Profit,
    ListingColumnId.Markup,
    ListingColumnId.Stock,
    ListingColumnId.CreatedOn,
    //ListingColumnId.CreatedBy,
    //ListingColumnId.Notes,
    //ListingColumnId.MonitorPrice,
    //ListingColumnId.MonitorStock,
    //ListingColumnId.MonitorPriceDecrease,
    //ListingColumnId.MonitorPriceDecreasePercentage,
    //ListingColumnId.IgnoreRules,
    //ListingColumnId.UnsoldDays,
    //ListingColumnId.OutOfStockDays,
    //ListingColumnId.Sales,
    //ListingColumnId.Watchers,
    //ListingColumnId.EndingOn,
    //ListingColumnId.DispatchDays,
    //ListingColumnId.OtherChannels
  ],
  [ePlatform.eBayNoApi]: [
    ListingColumnId.Image,
    ListingColumnId.ChannelItem,
    ListingColumnId.Source,
    ListingColumnId.Title,
    //ListingColumnId.VariationOptions,
    ListingColumnId.SellPrice,
    ListingColumnId.CostPrice,
    ListingColumnId.Profit,
    ListingColumnId.Markup,
    ListingColumnId.Stock,
    ListingColumnId.CreatedOn,
    //ListingColumnId.CreatedBy,
    //ListingColumnId.Notes,
    //ListingColumnId.MonitorPrice,
    //ListingColumnId.MonitorStock,
    //ListingColumnId.MonitorPriceDecrease,
    //ListingColumnId.MonitorPriceDecreasePercentage,
    //ListingColumnId.IgnoreRules,
    //ListingColumnId.UnsoldDays,
    //ListingColumnId.OutOfStockDays,
    //ListingColumnId.Sales,
    //ListingColumnId.Views,
    //ListingColumnId.Watchers,
    //ListingColumnId.EndingOn,
    //ListingColumnId.DispatchDays,
    //ListingColumnId.OtherChannels
  ],
  [ePlatform.Shopify]: [
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
    //ListingColumnId.CreatedBy,
    ListingColumnId.Notes,
    ListingColumnId.MonitorPrice,
    ListingColumnId.MonitorStock,
    //ListingColumnId.MonitorPriceDecrease,
    //ListingColumnId.MonitorPriceDecreasePercentage,
    //ListingColumnId.IgnoreRules,
    //ListingColumnId.UnsoldDays,
    //ListingColumnId.OutOfStockDays,
    //ListingColumnId.OtherChannels
  ],
  [ePlatform.Amazon]: [
    ListingColumnId.Image,
    //ListingColumnId.AmazonAsin,
    //ListingColumnId.AmazonSku,
    ListingColumnId.Source,
    ListingColumnId.Title,
    ListingColumnId.SellPrice,
    //ListingColumnId.AmazonLowestPrice,
    //ListingColumnId.AmazonBuyBox,
    ListingColumnId.CostPrice,
    ListingColumnId.Profit,
    ListingColumnId.Markup,
    ListingColumnId.Stock,
    ListingColumnId.CreatedOn,
    //ListingColumnId.CreatedBy,
    //ListingColumnId.Notes,
    //ListingColumnId.MonitorPrice,
    //ListingColumnId.MonitorStock,
    //ListingColumnId.MonitorPriceDecrease,
    //ListingColumnId.MonitorPriceDecreasePercentage,
    //ListingColumnId.IgnoreRules,
    //ListingColumnId.UnsoldDays,
    //ListingColumnId.OutOfStockDays,
    //ListingColumnId.OtherChannels
  ]
};

export const ActiveListingsColumnsVisibleByDefault = {
  [ePlatform.eBay]: [
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
  ],
  [ePlatform.eBayNoApi]: [
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
  ],
  [ePlatform.Shopify]: [
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
  ],
  [ePlatform.Amazon]: [
    ListingColumnId.Image,
    //ListingColumnId.AmazonAsin,
    //ListingColumnId.AmazonSku,
    ListingColumnId.Source,
    ListingColumnId.Title,
    ListingColumnId.SellPrice,
    ListingColumnId.CostPrice,
    ListingColumnId.Profit,
    ListingColumnId.Markup,
    ListingColumnId.Stock
  ]
};