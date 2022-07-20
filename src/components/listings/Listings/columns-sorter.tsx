import { Source } from '../../../redux/sources/sourceSlice';
import { ListingT } from './types';

type FieldValue = unknown;
type RecordType = Record<string, FieldValue>;
type WithChannelItem = { channelItem: string };
type WithSource = { source: Source };
type WithTitle = { title: string };
type WithSell = { channelPrice: number };
type WithCost = { sourcePrice: number };

const CompareString = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '');
const CompareNumber = (a?: number, b?: number) => (a ?? 0) - (b ?? 0);

export const SorterChanelItem = (a: ListingT, b: ListingT) => CompareString((a as WithChannelItem).channelItem, (b as WithChannelItem).channelItem);
export const SorterSource = (a: ListingT, b: ListingT) => CompareString((a as WithSource).source?.name, (b as WithSource).source?.name);
export const SorterTitle = (a: ListingT, b: ListingT) => CompareString((a as WithTitle).title, (b as WithTitle).title);
export const SorterSell = (a: ListingT, b: ListingT) => CompareNumber((a as WithSell).channelPrice, (b as WithSell).channelPrice);
export const SorterCost = (a: ListingT, b: ListingT) => CompareNumber((a as WithCost).sourcePrice, (b as WithCost).sourcePrice);