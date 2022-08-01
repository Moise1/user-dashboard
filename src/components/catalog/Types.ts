import { eChannelListingStatus } from '../../redux/listings/listingsSlice';

export enum eBulkStatus {
  PreviouslyListed = -1,

  Unknown = 0,
  Initial = 1,

  GettingSettings = 100,

  ScrapingProduct = 200,
  ScrapingProduct_CheckStock = 210,

  UpdatingProductSource = 300,
  ObtainDirectlyFromProductSource = 350,

  Verification_HGR = 400,
  Verification_ChannelSpecific = 500,

  Templates_GetTemplates = 600,
  Templates_TemplateCacheCheck = 601,
  Templates_GetTemplate = 602,
  Templates_ApplyTemplate = 603,

  ApplyPricing = 700,
  EnsureJsonStaticObjectIsCreated = 750,
  OptimizeTitle = 790,

  ComposeDescription = 800,
  ComposeDescription_EbaySpecific = 801,
  ComposeDescription_IgnoreVero = 802,
  ComposeDescription_SpecificFields = 810,
  ComposeDescription_EAN = 820,

  UpdateJson = 900,
  UpdateJson_CreateMissingChannelListing = 950,
  UpdateJson_Tokens = 951,
  SetNewPreparedForList = 1000,
  SetNewPreparedForList_PrepareForListing = 1100,
  UpdateChannelListingAfterBulk = 1200,
  WriteHistory = 1300,
  //DeductTokens = 1400,
  Unrecoverable_Error = 5000,
  Done = 100000
}

export interface BulkStatusRequest {
  channelOAuthId?: number;
  initialState?: eBulkStatus;
  runToState?: eBulkStatus;
  productSourceIdsWithTitle: { [key: number]: string | null | undefined };
  channelListingIds?: number[];
  debugLogs?: boolean;
  storeCatalogue?: boolean;
  listOOS?: boolean;
  optimizeTitle?: boolean;
  ignoreVero?: boolean;
  needsReview?: boolean;
  delaysMap: { [key: number]: Date };
}

export interface ChannelListingStatusAndError {
  id: number;
  status: eChannelListingStatus;
  channelItem: string;
  channelId: number;
  channelIdentifier: string;
  isoCountry: string;
  asin: string;
  errorMessage: string;
  sourceInfo: string; //errorSourceInfo
}

export interface BulkStatus {
  status?: eBulkStatus;
  //channelListingStatus?: eChannelListingStatus;
  errorMessage: string;
  channelListingId: number;

  channelListingStatusC: ChannelListingStatusAndError;
}

export type Guid = string;

export interface Source {
  id: number;
  name: string;
  baseUrl: string;
}

export interface Product {
  id: number;
  sourceId: number;
  imageUrl: string;
  sourcePrice: number;
  title: string;
  url: string;
  profit: number;
  channelPrice: number;
  options: number;
  competition: number;
  sold: number;
  priority: number;
  sourceName: string;
  status?: BulkStatus;
  quantityListed: number;
  page: number;
  totalResults: number;
  pageSize: number;
  sessionId: number;
  option: number;
  productId: number;
  hiddenInCart: boolean;
  beingSend: boolean;
  batchId: string;
  [key: string]: number | string | boolean | null | undefined | BulkStatus;
}

export interface ProductSource {
  title: string;
  priceChannel: number;
  priceSource: number;
  profit: number;
  images: string[];
  paragraphs: string[];
  properties: string[];
  tableValues: TableValueRow[];
}

export interface TableValueRow {
  Key: string;
  Value: string;
}
