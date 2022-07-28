import { Channel } from '../../../redux/channels/channelsSlice';
import { ActiveListing, PendingListing, TerminatedListings } from '../../../redux/listings/listingsSlice';
import { PriceRule } from '../../../redux/pricing-rules/rulesSlice';
import { Source } from '../../../redux/sources/sourceSlice';

export interface ActiveListingExtended extends ActiveListing {
  //Calculated in local:
  imageUrl?: string;
  profit?: number;
  markup?: number;
  monitorStock?: boolean;
  monitorPrice?: boolean;
  monitorPriceDecrease?: boolean;
  monitorPriceDecreasePercentage?: number;
  ignoreRules?: boolean;
  unsoldDays?: number;
  outOfStockDays?: number;
  variationsText?: string;
  dispatchDays?: number;
  pricingRules: PriceRule[];
  otherChannels: Channel[];
};

export type ListingT = (ActiveListingExtended | PendingListing | TerminatedListings) & { key: number, source?: Source, channel?: Channel };
