import { LoadingOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { ePlatform, Platforms } from '../data/platforms';
import { eChannelListingStatus } from '../redux/listings/listingsSlice';
import { PriceRule } from '../redux/pricing-rules/rulesSlice';
import { TTag } from './transShim';

export const ListingsUtils = {
  GetMarkupFromPricingRules: (sourcePrice: number, rules: PriceRule[]) => {
    let newMarkup: number | null = null;
    for (const pr of rules) {
      if (!pr.active) continue;

      if (pr.priceTo != null) {
        if (pr.priceFrom != null) {
          if (pr.priceFrom <= sourcePrice && sourcePrice <= pr.priceTo) {
            newMarkup = pr.markup;
          }
        } else {
          if (sourcePrice <= pr.priceTo) {
            newMarkup = pr.markup;
          }
        }
      } else {
        if (pr.priceFrom != null) {
          if (pr.priceFrom <= sourcePrice) {
            newMarkup = pr.markup;
          }
        } else {
          newMarkup = pr.markup;
        }
      }
    } //Last pricingrule will rule
    return newMarkup; //If no pricingrule has been applied, we return null
  },

  StatusToUI: (status: eChannelListingStatus, channelId: ePlatform) => {
    switch (status) {
      default:
        return <>{eChannelListingStatus[status]}</>;
      case eChannelListingStatus.Unknown:
        return <TTag lKey='Listings.Status.Unknown' />;
      case eChannelListingStatus.PendingForScraping:
      case eChannelListingStatus.BulkApiCreated:
      case eChannelListingStatus.BULK:
      case eChannelListingStatus.BulkScraping:
        return <>
          <LoadingOutlined />{' '}
          <TTag lKey='Listings.Status.Procesing' />
        </>;
      case eChannelListingStatus.PreparedForFirstListing:
      case eChannelListingStatus.QueuedForWork:
      case eChannelListingStatus.TemporaryFailure:
      case eChannelListingStatus.Retrying:
      case eChannelListingStatus.ListingInStore:
      case eChannelListingStatus.RetryingTwice:
      case eChannelListingStatus.RetryingFinal:
      case eChannelListingStatus.CreatingListing:
        return <Space>
          <LoadingOutlined />
          <TTag lKey='Listings.Status.ListingOn' values={{ channel: Platforms[channelId].storeName }} />
        </Space>;
      case eChannelListingStatus.PermanentFailure:
      case eChannelListingStatus.ExceptionThrown:
      case eChannelListingStatus.InvalidUserCredentials:
        return <TTag lKey='Listings.Status.Failure' />;
      case eChannelListingStatus.PendingToReview:
        return <TTag lKey='Listings.Status.PendingToReview' />;
      case eChannelListingStatus.ListingCreatedSuccessfully:
      case eChannelListingStatus.Removed:
        return <TTag lKey='Listings.Status.Removed' />;
      case eChannelListingStatus.Terminated:
        return <TTag lKey='Listings.Status.Terminated' />;
      case eChannelListingStatus.PendingForRelist:
        return <>
          <LoadingOutlined />{' '}
          <TTag lKey='Listings.Status.Relisting' />
        </>;
      case eChannelListingStatus.Relisted:
        return <TTag lKey='Listings.Status.Relisted' />;
      case eChannelListingStatus.ImportedWaitingForChannelData:
      case eChannelListingStatus.ListingVariation:
        return <></>;
    }
  }
};