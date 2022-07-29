import { isString } from 'util';
import { Channel } from '../../../redux/channels/channelsSlice';
import { Source } from '../../../redux/sources/sourceSlice';
import { ListingT } from './types';

type WithChannelItem = { channelItem: string };
type WithSource = { source: Source };
type WithTitle = { title: string };
type WithSell = { channelPrice: number };
type WithCost = { sourcePrice: number };
type WithProfit = { profit?: number };
type WithMarkup = { markup?: number };
type WithSourceQuantity = { sourceQuantity?: number };
type WithCreatedOn = { createdOn?: string | Date };
type WithNotes = { productNotes?: string };
type WithMonitorPrice = { monitorPrice?: boolean };
type WithMonitorStock = { monitorStock?: boolean };
type WithMonitorPriceDecrease = { monitorPriceDecrease?: boolean };
type WithMonitorPriceDecreasePecentage = { monitorPriceDecreasePercentage?: number };
type WithIgnoreRules = { ignoreRules?: boolean };
type WithUnsoldDays = { unsoldDays?: number };
type WithOutOfStockDays = { outOfStockDays?: number };
type WithWatches = { watches?: number };
type WithEndsOn = { endsOn?: Date | string };
type WithVariationText = { variationsText?: string };
type WithDispatchDays = { dispatchDays?: number };
type WithQuantitySold = { quantitySold?: number };
type WithViews = { views?: number };
type WithAsin = { asin?: string };
type WithBuyBox = { buyBoxPrice?: string };
type WithLowestPrice = { lowestPrice?: number, isLowestPrice?: boolean };
type WithOtherChannels = { otherChannels: Channel[] };
type WithCreatedBy = { createdByName: string };
type WithError = { errorMessage: string };
type WithStatus = { status: number };

const CompareString = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '');
const CompareNumber = (a?: number, b?: number) => (a ?? 0) - (b ?? 0);
const CompareDate = (a?: string | Date, b?: string | Date) => {
  if (a == b)
    return 0;
  if (!a)
    return 1;
  if (!b)
    return -1;
  if (isString(a) && isString(b))
    return CompareString(a, b);
  if (isString(a))
    return CompareString(a, (b as Date).toISOString());
  if (isString(b))
    return CompareString((a as Date).toISOString(), b);
  return CompareString(a.toISOString(), b.toISOString());
};
const CompareBooleans = (a?: boolean, b?: boolean) => (a === b) ? 0 : a ? -1 : 1;

export const SorterChanelItem = (a: ListingT, b: ListingT) => CompareString((a as WithChannelItem).channelItem, (b as WithChannelItem).channelItem);
export const SorterSource = (a: ListingT, b: ListingT) => CompareString((a as WithSource).source?.name, (b as WithSource).source?.name);
export const SorterTitle = (a: ListingT, b: ListingT) => CompareString((a as WithTitle).title, (b as WithTitle).title);
export const SorterSell = (a: ListingT, b: ListingT) => CompareNumber((a as WithSell).channelPrice, (b as WithSell).channelPrice);
export const SorterCost = (a: ListingT, b: ListingT) => CompareNumber((a as WithCost).sourcePrice, (b as WithCost).sourcePrice);
export const SorterProfit = (a: ListingT, b: ListingT) => CompareNumber((a as WithProfit).profit, (b as WithProfit).profit);
export const SorterMarkup = (a: ListingT, b: ListingT) => CompareNumber((a as WithMarkup).markup, (b as WithMarkup).markup);
export const SorterStock = (a: ListingT, b: ListingT) => CompareNumber((a as WithSourceQuantity).sourceQuantity, (b as WithSourceQuantity).sourceQuantity);
export const SorterCreatedOn = (a: ListingT, b: ListingT) => CompareDate((a as WithCreatedOn).createdOn, (b as WithCreatedOn).createdOn);
export const SorterNotes = (a: ListingT, b: ListingT) => CompareString((a as WithNotes).productNotes, (b as WithNotes).productNotes);
export const SorterMonitorPrice = (a: ListingT, b: ListingT) => CompareBooleans((a as WithMonitorPrice).monitorPrice, (b as WithMonitorPrice).monitorPrice);
export const SorterMonitorStock = (a: ListingT, b: ListingT) => CompareBooleans((a as WithMonitorStock).monitorStock, (b as WithMonitorStock).monitorStock);
export const SorterMonitorPriceDecrease = (a: ListingT, b: ListingT) => CompareBooleans((a as WithMonitorPriceDecrease).monitorPriceDecrease, (b as WithMonitorPriceDecrease).monitorPriceDecrease);
export const SorterMonitorPriceDecreasePercentage = (a: ListingT, b: ListingT) => CompareNumber((a as WithMonitorPriceDecreasePecentage).monitorPriceDecreasePercentage, (b as WithMonitorPriceDecreasePecentage).monitorPriceDecreasePercentage);
export const SorterIgnoreRules = (a: ListingT, b: ListingT) => CompareBooleans((a as WithIgnoreRules).ignoreRules, (b as WithIgnoreRules).ignoreRules);
export const SorterUnsoldDays = (a: ListingT, b: ListingT) => CompareNumber((a as WithUnsoldDays).unsoldDays, (b as WithUnsoldDays).unsoldDays);
export const SorterOutOfStockDays = (a: ListingT, b: ListingT) => CompareNumber((a as WithOutOfStockDays).outOfStockDays, (b as WithOutOfStockDays).outOfStockDays);
export const SorterWatches = (a: ListingT, b: ListingT) => CompareNumber((a as WithWatches).watches, (b as WithWatches).watches);
export const SorterEndsOn = (a: ListingT, b: ListingT) => CompareDate((a as WithEndsOn).endsOn, (b as WithEndsOn).endsOn);
export const SorterVariation = (a: ListingT, b: ListingT) => CompareString((a as WithVariationText).variationsText, (b as WithVariationText).variationsText);
export const SorterDispatchDays = (a: ListingT, b: ListingT) => CompareNumber((a as WithDispatchDays).dispatchDays, (b as WithDispatchDays).dispatchDays);
export const SorterQuantitySold = (a: ListingT, b: ListingT) => CompareNumber((a as WithQuantitySold).quantitySold, (b as WithQuantitySold).quantitySold);
export const SorterViews = (a: ListingT, b: ListingT) => CompareNumber((a as WithViews).views, (b as WithViews).views);
export const SorterAsin = (a: ListingT, b: ListingT) => CompareString((a as WithAsin).asin, (b as WithAsin).asin);
export const SorterBuyBox = (a: ListingT, b: ListingT) => CompareString((a as WithBuyBox).buyBoxPrice, (b as WithBuyBox).buyBoxPrice);
export const SorterLowestPrice = (a: ListingT, b: ListingT) => CompareNumber((a as WithLowestPrice).isLowestPrice ? 0 : (a as WithLowestPrice).lowestPrice, (b as WithLowestPrice).isLowestPrice ? 0 : (b as WithLowestPrice).lowestPrice);
export const SorterOtherChannels = (a: ListingT, b: ListingT) => CompareNumber((a as WithOtherChannels).otherChannels?.length ?? 0, (b as WithOtherChannels).otherChannels?.length ?? 0);
export const SorterCreatedBy = (a: ListingT, b: ListingT) => CompareString((a as WithCreatedBy).createdByName, (b as WithCreatedBy).createdByName);
export const SorterError = (a: ListingT, b: ListingT) => CompareString((a as WithError).errorMessage, (b as WithError).errorMessage);
export const SorterStatus = (a: ListingT, b: ListingT) => CompareNumber((a as WithStatus).status, (b as WithStatus).status);

