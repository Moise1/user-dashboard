import { isString } from 'util';
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
type WithCreatedOn = { createdOn?: string|Date };

const CompareString = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '');
const CompareNumber = (a?: number, b?: number) => (a ?? 0) - (b ?? 0);
const CompareDate = (a?: string | Date, b?: string | Date) => {
  if (!a && !b)
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

export const SorterChanelItem = (a: ListingT, b: ListingT) => CompareString((a as WithChannelItem).channelItem, (b as WithChannelItem).channelItem);
export const SorterSource = (a: ListingT, b: ListingT) => CompareString((a as WithSource).source?.name, (b as WithSource).source?.name);
export const SorterTitle = (a: ListingT, b: ListingT) => CompareString((a as WithTitle).title, (b as WithTitle).title);
export const SorterSell = (a: ListingT, b: ListingT) => CompareNumber((a as WithSell).channelPrice, (b as WithSell).channelPrice);
export const SorterCost = (a: ListingT, b: ListingT) => CompareNumber((a as WithCost).sourcePrice, (b as WithCost).sourcePrice);
export const SorterProfit = (a: ListingT, b: ListingT) => CompareNumber((a as WithProfit).profit, (b as WithProfit).profit);
export const SorterMarkup = (a: ListingT, b: ListingT) => CompareNumber((a as WithMarkup).markup, (b as WithMarkup).markup);
export const SorterStock = (a: ListingT, b: ListingT) => CompareNumber((a as WithSourceQuantity).sourceQuantity, (b as WithSourceQuantity).sourceQuantity);
export const SorterCreatedOn = (a: ListingT, b: ListingT) => CompareDate((a as WithCreatedOn).createdOn, (b as WithCreatedOn).createdOn);

