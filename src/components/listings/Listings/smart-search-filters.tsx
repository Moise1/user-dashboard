import { eChannelListingStatus } from '../../../redux/listings/listingsSlice';

export const MultiTermFilter = (fieldValue: unknown, searchTerm: string) => {
  const terms = searchTerm.trim().split(' ');
  for (const term of terms) {
    if (term.length == 0)
      continue;
    if ((fieldValue as string)?.toLocaleLowerCase?.().indexOf?.(term) < 0) {
      return false;
    }
  }
  return true;
};

export const ListingStatusFilter = (fieldValue: unknown, searchTerm: string) => {
  return eChannelListingStatus[fieldValue as eChannelListingStatus].indexOf(searchTerm) >= 0;
};