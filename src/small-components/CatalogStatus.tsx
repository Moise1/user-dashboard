import { Progress } from 'antd';
import '../sass/listing-options.scss';
import { eChannel } from '../redux/catalog/catalogSlice';
import { Channel } from '../redux/channels/channelsSlice';
import { Platforms } from '../data/platforms';
import { BulkStatus, ChannelListingStatusAndError, eBulkStatus, Product } from '../components/catalog/Types';
import { eCountry } from '../data/countries';
import { eChannelListingStatus } from '../redux/listings/listingsSlice';
//import { useState } from 'react';
//import { PopupModal } from '../components/modals/PopupModal';

export interface CatalogStatusProps {
  data: Product;
  editUrl?: string;
  myListingsUrl?: string;
  pendingUrl?: string;
  onRetry?: (data: Product) => void;
  channelId?: eChannel;
  urlRetryListing?: string;
}

export interface ErrorKind {
  severity: ErrorKindSeverity;
  name: string;
  message: string;
  extraData: string[];
  retryable: boolean;
}

export enum KindType {
  basic = 0,
  error = 1,
  progress = 2,
  done = 3,
  beingSend = 4, //Submmiting
  pendingError = 5
}

export enum ErrorKindSeverity {
  warning = 0,
  error = 1
}

export const CatalogStatus = (props: CatalogStatusProps) => {
  const { data/*, editUrl, myListingsUrl, pendingUrl, channelId, urlRetryListing*/ } = props;
  //const [/*showError,*/ setShowError] = useState<boolean>(false);
  const Kind = (beingSend: boolean, bStatus?: BulkStatus) => {
    if (beingSend) return { type: KindType.beingSend };
    const status: eChannelListingStatus | undefined = bStatus?.channelListingStatusC.status;
    switch (bStatus?.status || -1) {
      case eBulkStatus.Done:
        if (!bStatus?.channelListingStatusC) {
          //
          return { type: KindType.progress };
        }

        if ((status && (eChannelListingStatus.Relisted | eChannelListingStatus.ListingCreatedSuccessfully | eChannelListingStatus.Terminated)) != 0)
          return { type: KindType.done };

        if ((status && (eChannelListingStatus.ExceptionThrown | eChannelListingStatus.TemporaryFailure | eChannelListingStatus.PermanentFailure)) != 0) {
          return {
            type: KindType.pendingError,
            errorKind: {
              severity: ErrorKindSeverity.error,
              name: '',
              extraData: null,
              message: bStatus.channelListingStatusC?.errorMessage,
              retryable: true
            }
          };
        }

        return { type: KindType.progress };

      case eBulkStatus.Unrecoverable_Error:
        return {
          type: KindType.error, errorKind: {
            severity: ErrorKindSeverity.error,
            name: '',
            extraData: null,
            message: null,
            retryable: true
          }
        };

      default:
        return { type: KindType.progress };

      case -1:
        return { type: KindType.basic };
    }
  };

  const selectedChannel = localStorage.getItem('selectedChannel');
  const channel = (selectedChannel ? JSON.parse(selectedChannel) : null) as Channel;
  const platform = Platforms[channel.channelId];

  const ChannelInfoToUrl = (
    channelId: eChannel,
    channelSite: eCountry,
    channelIdentifier: string,
    itemId: string
  ) => {
    if (platform && platform.itemUrl) {
      let baseUrl: string;
      if (platform.itemUrl instanceof Object) {
        baseUrl = platform.itemUrl[channelSite];
      } else {
        baseUrl = platform.itemUrl;
      }
      return baseUrl.replace('{id}', itemId).replace('{shopName}', channelIdentifier);
    } else {
      return undefined;
    }
  };


  const renderProgress = () => {
    const p = data;
    let percent = 0;
    let msg = '';
    let storeName = '';
    const channelId = p.status?.channelListingStatusC?.channelId;
    if (channelId) {
      storeName = Platforms[channelId]?.storeName;
    }
    switch (p.status?.status) {
      case eBulkStatus.Initial: //1
      case eBulkStatus.GettingSettings: //100
      case eBulkStatus.ScrapingProduct: // 200
      case eBulkStatus.ObtainDirectlyFromProductSource: // 350
        percent = 10;
        msg = 'Obtaining details';
        break;

      case eBulkStatus.ScrapingProduct_CheckStock: // 210
      case eBulkStatus.UpdatingProductSource: // 300
        percent = 15;
        msg = 'Obtaining details';
        break;

      case eBulkStatus.Verification_HGR: //400-500
      case eBulkStatus.Verification_ChannelSpecific:
        percent = 20;
        msg = 'Verifying';
        break;

      case eBulkStatus.Templates_GetTemplates: //600
      case eBulkStatus.Templates_TemplateCacheCheck:
        percent = 22;
        msg = 'Configuring';
        break;

      case eBulkStatus.Templates_GetTemplate:
      case eBulkStatus.Templates_ApplyTemplate:
        percent = 26;
        msg = 'Configuring';
        break;

      case eBulkStatus.ApplyPricing: // 700
      case eBulkStatus.EnsureJsonStaticObjectIsCreated:
        percent = 30;
        msg = 'Preparing';
        break;

      case eBulkStatus.OptimizeTitle:
        percent = 40;
        msg = 'Preparing';
        break;

      case eBulkStatus.ComposeDescription: // 800
      case eBulkStatus.ComposeDescription_EbaySpecific:
      case eBulkStatus.ComposeDescription_IgnoreVero:
        percent = 45;
        msg = 'Composing';
        break;

      case eBulkStatus.ComposeDescription_SpecificFields:
      case eBulkStatus.ComposeDescription_EAN:
        percent = 50;
        msg = 'Composing';
        break;

      case eBulkStatus.UpdateJson: // 900
      case eBulkStatus.UpdateJson_CreateMissingChannelListing:
      case eBulkStatus.UpdateJson_Tokens:
        percent = 65;
        msg = 'Preparing';
        break;

      case eBulkStatus.SetNewPreparedForList:
      case eBulkStatus.SetNewPreparedForList_PrepareForListing:
        percent = 75;
        msg = 'Preparing';
        break;

      case eBulkStatus.UpdateChannelListingAfterBulk:
        percent = 80;
        msg = 'Creating';
        break;

      case eBulkStatus.WriteHistory:
        percent = 85;
        msg = 'Creating';
        break;

      case eBulkStatus.Done:
        percent = 95;
        switch (channelId) {
          case 1:
          case 2:
            if (storeName) msg = `Listing on ${storeName}`;
            else msg = 'Listing';
            break;
          case 3:
          case 4:
            msg = `Waiting on ${storeName} NoApi extension.`;
            break;
          default:
            // an error, like "Product already processed"
            // or Product already processed{already}\nNo Channel Listing Id \n\n Finished
            //if(p.)
            //msg = `Listing on ${storeName}`;
            msg = '';
            break;
        }

        break;

      default:
        if (p.status && p.status.status && p.status.status > 0 && p.status.status < 1400) {
          percent = p.status.status / 1400;
        } else {
          percent = 100;
        }
        break;
    }
    return (
      <div className="row cardProgress">
        <div className="col-xs-12">
          <Progress percent={percent} status='active' />
          <span className="status">{msg}</span>
        </div>
      </div>
    );
  };


  const renderBasic = () => {
    return (
      <div className="transaction-details">
        <div>
          <p className="transaction-type">Sell</p>
          <p className="transaction-amount sell">
            <span>&pound;</span>
            {data.channelPrice}
          </p>
        </div>
        <div>
          <p className="transaction-type">Cost</p>
          <p className="transaction-amount cost">
            <span>&pound;</span>
            {data.sourcePrice}
          </p>
        </div>
        <div>
          <p className="transaction-type">Profit</p>
          <p className="transaction-amount profit">
            <span>&pound;</span>
            {data.profit}
          </p>
        </div>
      </div>
    );
  };

  const renderDone = () => {
    const channelListing: ChannelListingStatusAndError | undefined = data.status?.channelListingStatusC;
    if (!channelListing) {
      return (
        <p className="cardMsg">
          Done
        </p>
      );
    }

    return (
      <p className="cardMsg">
        <a
          href={ChannelInfoToUrl(
            channelListing.channelId,
            channel.isoCountry,
            channelListing.channelIdentifier,
            channelListing.asin ?? channelListing.channelItem
          )}
          target="_blank" rel="noreferrer"
        >
          View in your store
        </a>
      </p>
    );
  };

  const renderSending = () => {
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  };

  //const OnShowError = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //  e.preventDefault();
  //  e.stopPropagation();
  //  setShowError(true);
  //};

  //const renderDoneWithError = () => {
  //  //const channelListing: ChannelListingStatusAndError = this.props.data.status.channelListingStatus;
  //  return (
  //    <>
  //      <p className="cardMsg">
  //        <a href="#" onClick={OnShowError}>
  //          {data.status?.channelListingStatusC.errorMessage}
  //        </a>
  //        <br />
  //      </p>
  //      <PopupModal
  //        channelId={data.status?.channelListingStatusC.channelId}
  //        show={this.state.showError}
  //        onHide={() => this.setState({ showError: false })}
  //        errorMessage={this.props.data.status.channelListingStatusC.errorMessage}
  //        errorSourceInfo={this.props.data.status.channelListingStatusC.sourceInfo}
  //        site={eCountry[this.props.data.status.channelListingStatusC.isoCountry?.toUpperCase()]}
  //        listingId={this.props.data.status.channelListingId}
  //        urlRetryListins={this.props.urlRetryListing}
  //        urlFixListings={this.props.editUrl}
  //      />
  //    </>
  //  );
  //};

  //const renderUnrecoverableError = (dKind: ErrorKind | undefined) => {
  //  let errorLine: string | JSX.Element = '';

  //  switch (dKind?.name) {
  //    case 'channelItem':
  //      errorLine = (
  //        <a href={myListingsUrl + '?s_channelitem=' + dKind?.extraData[0]} target="_blank">
  //          {dKind?.message}
  //        </a>
  //      );
  //      break;

  //    case 'pending':
  //      errorLine = (
  //        <a href={pendingUrl + '?s_id=' + dKind?.extraData[0]} target="_blank">
  //          {dKind?.message}
  //        </a>
  //      );
  //      break;

  //    case 'already':
  //      errorLine = dKind?.message;
  //      break;

  //    default:
  //      errorLine = (
  //        <a href="#" onClick={OnShowError}>
  //          {/*dKind.message*/}Not published.Click for details.
  //        </a>
  //      );
  //      break;
  //  }

  //  return (
  //    <>
  //      <p className="cardMsg">
  //        <span className="errorMsg" title={dKind?.message}>
  //          {errorLine}
  //        </span>
  //        {dKind?.retryable && (
  //          <a href="#" onClick={OnRetry}>
  //            Retry
  //          </a>
  //        )}
  //      </p>
  //      <PopupModal
  //        message={dKind.message}
  //        title="Unrecoverable error"
  //        primaryButton={true}
  //        secondaryButton={null}
  //        primaryButtonText="Accept"
  //        onPrimaryClick={() => this.setState({ showError: false })}
  //        onHide={() => this.setState({ showError: false })}
  //        show={this.state.showError}
  //      />
  //    </>
  //  );
  //}

  const k = Kind(data?.beingSend ?? false, data?.status);

  return (
    <div>
      {(() => {
        switch (k.type) {
          case KindType.beingSend:
            return renderSending();
          case KindType.done:
            return renderDone();
          //case KindType.pendingError:
          //  return renderDoneWithError();
          default:
          case KindType.progress:
            return renderProgress();
          case KindType.basic:
            return renderBasic();
          //case KindType.error:
          //  return renderUnrecoverableError(k.errorKind);
        }
      })()}
    </div>
  );
};