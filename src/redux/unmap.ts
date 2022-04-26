export interface ChannelListingVariationAttributeOption {
  id: number;
  channelListingId: number;
  attribute: string;
  option: string;
}

export type compArray = (string | number)[][];

export interface MiniSettings {
  paymentProfileId?: number;
  templateId?: number;
  fee?: number;
  markup?: number;
  monitorStock?: boolean;
  monitorPrice?: boolean;
  monitorPriceDecrease?: boolean;
  monitorPriceDecreasePercentage?: number;
  dispatchDays?: number;
  primeOnly?: boolean;
  minQuantity?: number;
  ignoreRules?: boolean;
  customCategory?: number;
  notes?: string;
  gsp?: boolean;
  returnsPolicy?: string;
  defaultShipping?: string;
  locationCity?: string;
  locationPostcode?: string;
  locationCountry?: string;
  returnProfileId?: number;
  shippingProfileId?: number;
}

export enum eChannelListingOrigin {
  Unknown = 0,
  Extension = 1,
  BulkLister = 2,
  CompeliaImporter = 3,
  ExistingChannelListing = 4,
  RelistedDiscoveredBySync = 5,
  SmartLister = 6,
  Migration = 8,
  Relisted = 16,
  ManuallyByAnAdmin = 32,
  Catalog = 64,
  WeListForYou = 128
}
interface HGRSearchData {
  dummy: string;
}
export interface ActiveListing extends HGRSearchData {
  id: number;
  userProductSourceChannelId: number;
  channelListingId: number;
  channelOAuthId: number;
  channelItem: string; //Item Id
  channelQuantity: number;
  sourcePrice: number;
  channelPrice: number;
  title: string;
  createdOn: Date;
  status: number;
  productSourceId: number;
  lastTimeInStock: Date;
  sourceQuantity: number;
  views: number;
  watches: number;
  quantitySold: number;
  lastTimeSold: Date;
  productNotes: string;
  overrides: MiniSettings;
  sourceId: number;
  sourcePath: string;
  createdById: number;
  createdByName: string;
  updatedOn: Date;
  price?: number;
  endsOn: Date;
  asin?: string;
  isLowestPrice?: boolean;
  lowestPrice?: number;
  buyBoxPrice?: number;
  origin: eChannelListingOrigin;
  variationAtributes: ChannelListingVariationAttributeOption[];
  // eslint-disable-next-line semi
}

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
  //   console.log({ comp });
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
    //for (const co of cm.commonBase as []) {
    // price to createdbyName - 19 -> 50  ( - 19)
    const itm = cb[i];
    //itm[0]
    const objectFragment = {
      //Partial<ActiveListing>
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
