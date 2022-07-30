import { ListingColumnId } from './columns';

export const PendingListingsColumns = [
  ListingColumnId.Id,
  ListingColumnId.Image,
  ListingColumnId.Title,
  ListingColumnId.PendingStatus,
  ListingColumnId.Error,
  ListingColumnId.CreatedOn,
  ListingColumnId.CreatedBy,
];

export const PendingListingsColumnsVisibleByDefault = [
  ListingColumnId.Id,
  ListingColumnId.Image,
  ListingColumnId.Title,
  ListingColumnId.PendingStatus,
  ListingColumnId.Error,
  ListingColumnId.CreatedOn,
];