import { ActiveListing } from './listingsSlice';

export type compArray = (string | number)[][];

interface cacheMap {
  txt: string[];
  int: number[];
  bool: (boolean | null)[];
  epoch: number;
  minListingId: number;
  epochStr: string;
  commonBase: compArray | Partial<ActiveListing>[];
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export default function* unmap(comp: compArray) {
  const cm = comp[0][0] as unknown as cacheMap;
  function dupSource(nv: number | string) {
    return cm.commonBase[nv as number];
  }
  function deDiff(num: number | string) {
    if (typeof num === 'string') return;
    if (num == -1) return null;
    const minutesInTicks = num * 1000 * 60;
    return new Date(cm.epoch + minutesInTicks);
  }
  function db(bv: number | string): boolean | null {
    return cm.bool[bv as unknown as number] as boolean | null;
  }
  function ds(bv: number | string) {
    return cm.txt[bv as unknown as number];
  }
  function di(bv: number | string) {
    return bv as number;
  }
  function cd(bv: number | string) {
    if (typeof bv === 'string') return bv;
    return bv + cm.minListingId;
  }
  const cb = cm.commonBase as compArray;
  for (let i = 0; i < cb.length; i++) {
    const itm = cb[i];
    const objectFragment = {
      createdById: di(itm[0]),
      createdByName: ds(itm[1]),
      status: itm[2],
      sourceQuantity: itm[3],
      channelQuantity: itm[4],
      watches: itm[5],
      sourceId: itm[6],
      quantitySold: itm[7],
      productNotes: ds(itm[8]),
      overrides: {
        ignoreRules: db(itm[9]),
        markup: itm[10],
        dispatchDays: itm[11],
        monitorStock: db(itm[12]),
        monitorPrice: db(itm[13]),
        monitorPriceDecrease: db(itm[14]),
        monitorPriceDecreasePercentage: itm[15],
        primeOnly: db(itm[16]),
        minQuantity: itm[17]
      }
    };
    cm.commonBase[i] = objectFragment as Partial<ActiveListing>;
  }
  for (let i = 1; i < comp.length; i++) {
    const itm = comp[i];
    yield {
      id: itm[0],
      userProductSourceChannelId: itm[0],
      channelListingId: itm[1],
      createdOn: deDiff(itm[2]),
      channelItem: '' + cd(itm[3]),
      channelPrice: itm[4],
      sourcePrice: itm[5],
      views: itm[6],
      lastTimeSold: deDiff(itm[7]),
      sourcePath: itm[8],
      price: itm[9],
      overrides: {},
      ...dupSource(itm[10]),
      updatedOn: deDiff(itm[11]),
      lastTimeInStock: deDiff(itm[12]),
      title: ds(itm[13]),
      endsOn: deDiff(itm[14]),
      asin: itm[15],
      isLowestPrice: db(itm[16]),
      lowestPrice: itm[17],
      buyBoxPrice: itm[18],
      productSourceId: itm[19],
      origin: itm[20]
    } as ActiveListing;
  }
}
