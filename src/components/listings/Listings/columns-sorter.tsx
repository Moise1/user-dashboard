import { Source } from '../../../redux/sources/sourceSlice';

type FieldValue = unknown;
type RecordType = Record<string, FieldValue>;
type WithChannelItem = { channelItem: string };
type WithSource = { source: Source };
type WithTitle = { title: string };
type WithSell = { sell: number };
type WithCost = { cost: number };

const CompareString = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '');
const CompareNumber = (a?: number, b?: number) => (a ?? 0) - (b ?? 0);

export const SorterChanelItem = (a: RecordType, b: RecordType) => CompareString((a as WithChannelItem).channelItem, (b as WithChannelItem).channelItem);
export const SorterSource = (a: RecordType, b: RecordType) => CompareString((a as WithSource).source?.name, (b as WithSource).source?.name);
export const SorterTitle = (a: RecordType, b: RecordType) => CompareString((a as WithTitle).title, (b as WithTitle).title);
export const SorterSell = (a: RecordType, b: RecordType) => CompareNumber((a as WithSell).sell, (b as WithSell).sell);
export const SorterCost = (a: RecordType, b: RecordType) => CompareNumber((a as WithCost).cost, (b as WithCost).cost);