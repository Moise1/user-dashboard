import { Channel } from "../../../redux/channels/channelsSlice";
import { ActiveListing, PendingListing, TerminatedListings } from "../../../redux/listings/listingsSlice";
import { Source } from "../../../redux/sources/sourceSlice";

export interface ActiveListingExtended extends ActiveListing {
  //Calculated in local:
  imageUrl?: string;
  profit?: number;
}

export type ListingT = (ActiveListingExtended | PendingListing | TerminatedListings) & { key: number, source?: Source, channel?: Channel };
