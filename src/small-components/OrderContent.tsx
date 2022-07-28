import { Progress, Spin } from 'antd';
import { OrderData } from 'src/redux/orders/orderSlice';
import {
  LastStepOrderIcon,
  OrderCheckoutIcon,
  OrderProcessRoundedIcon,
  RoundCircleCycleIcon,
  LeftBackArrowIcon
} from '../components/common/Icons';
import { useState } from 'react';
import { t } from '../utils/transShim';
import '../sass/order-state-modal.scss';
import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../components/common/Icons';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from './ActionBtns';
import { useAppDispatch, useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { processOrders } from '../redux/orders/orderThunk';
import { manuallyDispatch } from '../redux/orders/orderThunk';
import { stopOrder } from '../redux/orders/orderThunk';
import { loadProgressOfOrder } from '../redux/orders/orderThunk';
import { CrossModalIcon } from '../components/common/Icons';
import { useEffect } from 'react';
import { AutoOrderingState, OrderStatus } from '../utils/determineStatus';
import { AutoOrderingError } from '../components/orders/data/auto-ordering-error';
import { OrderProgressStatus } from '../components/orders/data/progress';
import { ReactUtils } from '../utils/react-utils';

interface Props {
  order: OrderData | undefined;
  channelOAuthId: number[];
  OrderDetailsModalOpen: () => void;
  handleSingleOrderModal: () => void;
}

export const OrderContent = (props: Props) => {
  const { order, channelOAuthId, OrderDetailsModalOpen, handleSingleOrderModal } = props;
  const [orderNumber] = useState(order?.id);
  const { orderProgress } = useAppSelector((state) => state.orderProgress);
  const dispatch = useAppDispatch();

  const handleProcessOrders = async () => {
    await dispatch(processOrders({ orderLineIds: [orderNumber as unknown as number], channelOAuthId: channelOAuthId }));
    handleSingleOrderModal();
  };
  const handleManuallyDispatch = async () => {
    await dispatch(manuallyDispatch({ orderLineIds: [orderNumber as unknown as number], channelOAuthId: channelOAuthId }));
    handleSingleOrderModal();
  };
  const handleStopOrder = async () => {
    await dispatch(stopOrder({ orderLineIds: [orderNumber as unknown as number], channelOAuthId: channelOAuthId }));
    handleSingleOrderModal();
  };
  const { loading } = useAppSelector((state) => state.orderProgress);
  const { updating } = useAppSelector((state) => state.orders);
  const notConfigured = !order?.sourceAOConfigured;

  const btnProcessDisabled = !order || notConfigured
    || ((order.status === null || order.status === undefined) && order?.storeStatus != OrderStatus.Shipped && order.storeStatus != OrderStatus.Cancelled)
    || (
      order?.status != AutoOrderingState.AutoorderingDisabled
      && order.status != AutoOrderingState.GoingToBuyError
      && order.status != AutoOrderingState.PermanentError
      && (
        order.status != AutoOrderingState.ManuallyDispatched
        || order.storeStatus == OrderStatus.Shipped
        || order.storeStatus == OrderStatus.Cancelled
      )
    );

  const btnDispatchDisabled = !order || notConfigured
    || ((order.status === null || order.status === undefined) && order?.storeStatus != OrderStatus.Shipped && order.storeStatus != OrderStatus.Cancelled)
    || (order?.status != AutoOrderingState.AutoorderingDisabled && order.status != AutoOrderingState.GoingToBuyError && order.status != AutoOrderingState.PermanentError);

  const cantBeStoped = !order || notConfigured
    || (order?.storeStatus == OrderStatus.Shipped || order?.storeStatus == OrderStatus.Cancelled)
    || order?.status < AutoOrderingState.AutoorderingPrepared
    || (order?.status > AutoOrderingState.CompletedAutoOrder && order.status != AutoOrderingState.TemporaryError);

  useEffect(() => {
    // dispatch(loadProgressOfOrder(iddd));
    dispatch(loadProgressOfOrder(order?.id));
  }, [order?.id]);

  let OrderProgress = 1;
  let states = orderProgress?.states;
  let lastState = undefined;
  if (states != undefined && states != []) {
    lastState = states[states.length - 1];
  }
  const dlu = orderProgress.lastStatusUpdate ?? new Date(orderProgress.lastStatusUpdate);
  if (!!orderProgress.lastStatus && (!lastState || lastState.date <= dlu)) {
    const nls: OrderProgressStatus = {
      id: lastState?.id ?? 9999999,
      date: dlu,
      status: orderProgress?.lastStatus,
      error: lastState?.error,
      errorMessage: lastState?.errorMessage
    };
    lastState = nls;
    states = [...states, nls];
  }

  let hasError = false;
  const lastStatusUpdate = orderProgress?.lastStatusUpdate;
  //To check status, working on it -Suleman Ahmad-
  let statusText = '';

  if (!lastState || lastState.status == AutoOrderingState.AutoorderingDisabled) {//Paused
    OrderProgress = 0;
    statusText = 'Paused';
  } else if (lastState.status == AutoOrderingState.ManuallyDispatched) {
    OrderProgress = 0;
    statusText = 'Manually dispatched';
  }
  else if (lastState.status == AutoOrderingState.AutoorderingPrepared) {//Starting
    OrderProgress = 1;
    statusText = 'Waiting to start';
  }
  else if ((lastState.status > AutoOrderingState.AutoorderingPrepared && lastState.status < AutoOrderingState.CompletedAutoOrder) || lastState.status == AutoOrderingState.TemporaryError) {//Processing
    OrderProgress = 2;
    statusText = 'Checking out';
  }
  else if (lastState.status >= AutoOrderingState.CompletedAutoOrder && lastState.status < AutoOrderingState.Completed) {//LastSteps
    OrderProgress = 3;
    statusText = 'Last steps';
  }
  else if (lastState.status >= AutoOrderingState.Completed && lastState.status < AutoOrderingState.TemporaryError) {//Completed
    OrderProgress = 4;
    statusText = 'Completed';
  }
  else /*if (lastState.status > AutoOrderingState.TemporaryError)*/ {//Error
    OrderProgress = 0;
    statusText = 'Error';
    hasError = true;
  }

  const percent = OrderProgress * 25;

  let dateStart: Date | undefined = order?.date;
  let dateProgress: Date | undefined;
  let dateFinish: Date | undefined;
  if (states)
    for (let i = 0; i < states.length; i++) {
      const ls = states[i];
      if (!ls || ls.status == AutoOrderingState.AutoorderingDisabled) {//Paused
        dateStart = lastStatusUpdate;
      }
      else if (ls.status == AutoOrderingState.AutoorderingPrepared) {//Starting
        dateStart = lastStatusUpdate;
      }
      else if ((ls.status > AutoOrderingState.AutoorderingPrepared && ls.status < AutoOrderingState.CompletedAutoOrder) || ls.status == AutoOrderingState.TemporaryError) {//Processing
        dateProgress = ls.date;
      }
      else if (ls.status >= AutoOrderingState.CompletedAutoOrder && ls.status < AutoOrderingState.Completed) {//LastSteps
        dateFinish = ls.date;
      }
      else if (ls.status >= AutoOrderingState.Completed && ls.status < AutoOrderingState.TemporaryError) {//Completed
        dateFinish = ls.date;
      }
      else /*if (lastState.status > AutoOrderingState.TemporaryError)*/ {//Error
        dateStart = lastStatusUpdate;
      }
    }
  else {
    dateFinish = lastStatusUpdate;
  }
  const configurableButNotConfigured = !!order?.sourceAOEnabled && notConfigured;

  const ErrorToMessage = (error: AutoOrderingError, status: AutoOrderingState) => {
    if (status == AutoOrderingState.GoingToBuyError) {
      return 'Due to an error we cannot determine if the product has been bought. We recommend you to check it in ' + order?.sourceName + '. If it has not been bought, click Process, if it has been bought, click Mark as Dispatched.';
    }
    switch (error) {
      default:
      case AutoOrderingError.Unknown:
        return '';
      case AutoOrderingError.Login:
        return 'Wrong user or password.';
      case AutoOrderingError.TwoFA:
        return <>Two factor authentification problem. <a href="https://hustlegotreal.com/en/amazon-key-auto-ordering">Click here to know how to configure this</a></>;
      case AutoOrderingError.Verification:
        return 'The store is asking to verify your account by using an email or phone. Disable that settting.';
      case AutoOrderingError.UserActionRequired:
        return 'User action required. The supplier needs some extra details from you.';
      case AutoOrderingError.Captcha:
        return 'The system was unable to solve the captcha.';
      case AutoOrderingError.Suspended:
        return 'The supplier has suspended your account.';
      case AutoOrderingError.HighPrice:
        return 'The final price was higher than expected, leaving a negative profit. Operation cancelled.';
      case AutoOrderingError.OutOfStock:
        return 'Item was out of stock.';
      case AutoOrderingError.Timeout:
        return 'The page is not responding.';
      case AutoOrderingError.UnknownJavascriptError:
        return 'Unexpected error.';
      case AutoOrderingError.InvalidShippingAddress:
        return 'Invalid address. You can modify it in order details and process it again.';
      case AutoOrderingError.Payment:
        return 'There was a problem with your payment.';
      case AutoOrderingError.NoGiftCards:
        return 'No gift carts. Add more giftCards and try it again or change the configuration to allow credit and debit card payments.';
      case AutoOrderingError.InvalidCard:
        return 'Invalid card.';
      case AutoOrderingError.NoCard:
        return 'No credit or debit card found.';
      case AutoOrderingError.CardVerification:
        return 'Invalid card.';
      case AutoOrderingError.NoBillingAddress:
        return <>No billing address configured for {order?.sourceName}.
          {(() => {
            switch (order?.sourceId) {
              /*Saleyee*/
              case 221:
              case 222:
              case 223:
              case 224:
                return <> Change it <a href="https://www.saleyee.com/user/addresses/billaddresses.html" target='_blank' rel='noreferrer'>clicking here</a></>;

              /*Dropshiptraders UK*/
              case 185:
                return <> Change it <a href="https://www.dropship-traders.co.uk/my-account/edit-address/billing/" target='_blank' rel='noreferrer'>clicking here</a></>;

              /*Robert Dyas UK*/
              case 10:
                return <> Change it <a href="https://www.robertdyas.co.uk/customer/address/" target='_blank' rel='noreferrer'>clicking here</a></>;

              /*Costway UK*/
              case 59:
                return <> Change it <a href="https://www.costway.co.uk/customer/address/" target='_blank' rel='noreferrer'>clicking here</a></>;

              default:
                return <> Change it on <a href={'/AutoOrderingConfiguration?s=' + order?.sourceId} target='_blank' rel='noreferrer'> Auto Ordering settings</a> or on {order?.sourceName} settings.</>;
            }
          })()}

        </>;
      case AutoOrderingError.ImportedWithError:
        return 'Problem importing the order';
      case AutoOrderingError.MaxBuyLimit:
        return 'Supplier doesn\'t allow you to buy more of this item.';
      case AutoOrderingError.MinBuyLimit:
        return 'Supplier requires to buy more quantity of this item.';
      case AutoOrderingError.WrongGiftFrom:
        return 'Wrong gift "From" field. Visit source settings to fix it.';
      case AutoOrderingError.WrongGiftMessage:
        return 'Wrong gift "Message" field. Visit source settings to fix it.';
      case AutoOrderingError.InvalidBillingAddress:
        return <>Invalid billing address for {order?.sourceName}. Your billing address has some error or it is not completed.
          {(() => {
            switch (order?.sourceId) {
              /*Saleyee*/
              case 221:
              case 222:
              case 223:
              case 224:
                return <> Change it <a href='https://www.saleyee.com/user/addresses/billaddresses.html' target='_blank' rel='noreferrer'>clicking here</a></>;

              /*Dropshiptraders UK*/
              case 185:
                return <> Change it <a href='https://www.dropship-traders.co.uk/my-account/edit-address/billing/' target='_blank' rel='noreferrer'>clicking here</a></>;

              /*Robert Dyas UK*/
              case 10:
                return <> Change it <a href='https://www.robertdyas.co.uk/customer/address/' target='_blank' rel='noreferrer'>clicking here</a></>;

              /*Costway UK*/
              case 59:
                return <> Change it <a href='https://www.costway.co.uk/customer/address/' target='_blank' rel='noreferrer'>clicking here</a></>;

              default:
                return <> Change it on <a href={'/AutoOrderingConfiguration?s=' + order?.sourceId} target='_blank' rel='noreferrer'> Auto Ordering settings</a> or on {order?.sourceName} settings.</>;
            }
          })()}

        </>;
      case AutoOrderingError.NoPaypal:
        return 'Paypal method is selected but there is no paypal account configured in the supplier';
      case AutoOrderingError.NoWallet:
        return 'Not enough funds in the wallet';
    }
  };

  return (
    <div className="order-state-progress-modal">
      <div className="flex-sm-row order-state-header">
        <div className="d-flex justify-content-between" style={{ flexGrow: 1 }}>
          <div>
            <h2 className="head-part-one mr-2 mr-lg-5">Order State Process</h2>
            {configurableButNotConfigured && (
              <span className="account-label-style" style={{ marginTop: -2, marginLeft: 10 }}>
                <a href={'/AutoOrderingConfiguration?s=' + order?.sourceId}>
                  <button className="btn mark-dispatch-modal-btn-style">
                    <span className="ml-1 ml-lg-2">Configure Autoordering for this supplier</span>
                  </button>
                </a>
              </span>
            )}
          </div>
          {!!order?.hgrTrackingNumber && (
            <div style={{ marginTop: 7, marginRight: 10 }}>
              <h1 className="source-url" style={{ display: 'inline-block', marginRight: 5 }}>
                Tracking Id:
              </h1>
              <a
                href={'https://www.velocipacker.com/tracking/' + order.hgrTrackingNumber}
                target="_blank"
                rel="noreferrer"
              >
                {order.hgrTrackingNumber}
              </a>
            </div>
          )}
        </div>
        {/*<h1 className="modal-title">{t('OrderDetails.OrderState')}</h1>*/}
        <span
          className="close-modal-icon"
          onClick={() => {
            // setOrderDetailsModalShow(false);
          }}
        >
          <CrossModalIcon />
        </span>
      </div>
      <div className="order-state-body-container flex-lg-row my-4">
        {loading || updating ? (
          <Spin />
        ) : (
          <>
            <div className="col-12 col-lg-5">
              <div className="d-flex justify-content-between pb-3">
                <span className="history-text"> {t('OrderDetails.HISTORY')}</span>
              </div>
              <div className="time-line-here">
                {/* START ORDER  */}
                <div className="d-flex">
                  <span className="d-flex flex-column align-items-center">
                    <span className="start-order-active-svg">
                      <RoundCircleCycleIcon />
                    </span>
                    <span className={`${OrderProgress > 1 ? 'h-blue-line' : 'disabled-line'}`}></span>
                  </span>
                  <div className="order-step-heading d-flex flex-column mt-2 ml-3">
                    <h4 className="mb-1">
                      {hasError && 'Error'}
                      {!hasError &&
                        OrderProgress < 1 &&
                        lastState?.status == AutoOrderingState.ManuallyDispatched &&
                        'Manually dispatched'}
                      {!hasError &&
                        OrderProgress < 1 &&
                        lastState?.status != AutoOrderingState.ManuallyDispatched &&
                        'Paused'}
                      {!hasError && OrderProgress >= 1 && t('OrderDetails.StartOrder')}
                      {OrderProgress === 1 ? (
                        <span className="ml-2">
                          <OrderProcessRoundedIcon />
                        </span>
                      ) : (
                        ''
                      )}
                    </h4>
                    <p className="mb-0">{ReactUtils.GetFormattedDateTime(dateStart)}</p>
                    <span>{hasError && ErrorToMessage(lastState.error, lastState.status)}</span>
                  </div>
                </div>
                {/* CHECKOUT  */}
                <div className="d-flex">
                  <span className="d-flex flex-column align-items-center">
                    <span className={`${OrderProgress > 1 ? 'order-checkout-icon' : ''}`}>
                      <OrderCheckoutIcon />
                    </span>
                    <span className={`${OrderProgress > 2 ? 'h-blue-line' : 'disabled-line'}`}></span>
                  </span>
                  <div className="order-step-heading d-flex flex-column mt-2 ml-3">
                    <h4 className={'mb-1' + (OrderProgress < 2 ? ' disabled' : '')}>
                      Checkout{' '}
                      {OrderProgress == 2 && (
                        <span className="ml-2">
                          <OrderProcessRoundedIcon />
                        </span>
                      )}
                    </h4>
                    <p className="mb-0">
                      {OrderProgress > 1 && dateProgress !== undefined && ReactUtils.GetFormattedDateTime(dateProgress)}
                    </p>
                    <span></span>
                  </div>
                </div>
                {/* LAST STEP  */}

                <div className="d-flex">
                  <span className="d-flex flex-column align-items-center">
                    <span className={OrderProgress > 2 ? 'last-step-order-icon' : ''}>
                      <LastStepOrderIcon />
                    </span>
                  </span>
                  <div className="order-step-heading d-flex flex-column mt-2 ml-3">
                    <h4 className={'mb-1' + (OrderProgress < 3 ? ' disabled' : '')}>
                      {OrderProgress <= 3 && 'Last steps'}
                      {OrderProgress > 3 && 'Completed'}{' '}
                      {OrderProgress == 3 && (
                        <span className="ml-2">
                          <OrderProcessRoundedIcon />
                        </span>
                      )}
                    </h4>
                    <p className="mb-0">{OrderProgress > 2 && ReactUtils.GetFormattedDateTime(dateFinish)}</p>
                  </div>
                </div>
                <div className="progress-order mt-4 mb-3 mb-lg-0">
                  <h2 className="mb-0">
                    Progress: <span className="fw-400">{statusText}</span>{' '}
                  </h2>
                  {/* Add progress bar from ant design*/}
                  <Progress percent={percent} status={percent == 100 ? 'success' : 'active'} />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="p-4 bg-InputLight amazon-order-ss ml-auto br-10">
                <a
                  href={'/sales/GetOrderImage/' + order?.id + '/' + (lastState?.id ?? 0) + '.png'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-100 h-100 ml-auto"
                    src={'/sales/GetOrderImage/' + order?.id + '/' + (lastState?.id ?? 0) + '.png'}
                    alt="Progress image"
                    onError={(event) => (event.currentTarget.style.display = 'none')}
                  />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col-12 d-flex flex-column-reverse flex-lg-row justify-content-between ">
          <div className="row">
            <div className="go-back-details-container col">
              <div onClick={OrderDetailsModalOpen} className="go-back-details">
                <span> {t('OrderDetails.OrderDetails')}</span>
              </div>
              <LeftBackArrowIcon />
            </div>
          </div>

          {/* Buttons to stop,process,dispatch,delete an order */}
          <div className="modal-buttons-block">
            <div className="modal-button-row-mt5">
              {/* <Button className="process-btn action-btn">
                  <ProcessOrderIcon />
                  <div className="btn-text">
                    <span>{t('OrderTable.Process')}</span>
                    <span>Orders</span>
                  </div>
                </Button>
                <Button className="stop-btn action-btn">
                  <HandStopOrderIcon />
                  <div className="btn-tetx">
                    <span>{t('OrderTable.Stop')}</span>
                    <span>Orders</span>
                  </div>
                </Button> */}

              <WarningBtn handleConfirm={handleStopOrder} disabled={cantBeStoped || order?.cancelRequested}>
                <HandStopOrderIcon />
                <span>{!cantBeStoped && order?.cancelRequested ? <>Stop requested</> : <>Stop Order</>}</span>
              </WarningBtn>
              <ConfirmBtn handleConfirm={handleProcessOrders} disabled={btnProcessDisabled}>
                <ProcessOrderIcon />
                <span>{t('OrderButtons.Process')} order</span>
              </ConfirmBtn>
            </div>

            <div className="modal-button-row-mt5 ">
              {/* <Button className="process-btn action-btn">
                  <ProcessOrderIcon />
                  <div className="btn-text">
                    <span>{t('OrderTable.Process')}</span>
                    <span>Orders</span>
                  </div>
                </Button>
                <Button className="stop-btn action-btn">
                  <HandStopOrderIcon />
                  <div className="btn-tetx">
                    <span>{t('OrderTable.Stop')}</span>
                    <span>Orders</span>
                  </div>
                </Button> */}
              <SuccessBtn handleConfirm={handleManuallyDispatch} disabled={btnDispatchDisabled}>
                <CheckIcon />
                <span>{t('OrderButtons.MarkAsDispatched')}</span>
              </SuccessBtn>
              <DangerBtn className="mr-3" disabled={true}>
                <TrashIcon />
                <span> {t('OrderButtons.Delete')} order</span>
              </DangerBtn>
            </div>
            {/* <div className="d-flex delete-btn-parent  justify-content-around  mt-lg-2 align-items-center">
                     <button className="btn delete-order-modal-btn-style mr-0 mr-lg-3">
                        <TrashIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.DeleteOrders')}</span>
                      </button>
                      <button className=" btn disabled-btn mark-dispatch-modal-btn-style">
                        <CheckIcon />
                        <span className="ml-1 ml-lg-2"> {t('OrderButtons.MarkAsDispatched')}</span>
                      </button>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
