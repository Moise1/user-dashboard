import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
//import { useEffect, useState } from 'react';
import { StatusBar } from '../../small-components/StatusBar';
import { t } from '../../utils/transShim';
import '../../sass/orders.scss';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { processOrders } from '../../redux/orders/orderThunk';
import { manuallyDispatch } from '../../redux/orders/orderThunk';
import { stopOrder } from '../../redux/orders/orderThunk';
import { AutoOrderingState, OrderStatus } from '../../utils/determineStatus';
import { OrderData } from '../../redux/orders/orderSlice';

interface props {
  channelOAuthId: number[];
  selectedOrderIds: number[];
  orderList: OrderData[];
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const { channelOAuthId, selectedOrderIds, orderList } = typeBtnProps;
  //const processDisabled  = !selectedorder || notConfigured
  //  || (!Utils.HasValue(order?.status) && order.storeStatus != OrderStatus.Shipped && order.storeStatus != OrderStatus.Cancelled)
  //  || (order.status != AutoOrderingState.AutoorderingDisabled
  //    && order.status != AutoOrderingState.GoingToBuyError
  //    && order.status != AutoOrderingState.PermanentError
  //  );

  const dispatch = useAppDispatch();

  const btnProcessDisabled = orderList.map((data: OrderData) => {
    return ((data.status === null || data.status === undefined) && data?.storeStatus != OrderStatus.Shipped && data.storeStatus != OrderStatus.Cancelled)
      || (data?.status != AutoOrderingState.AutoorderingDisabled && data.status != AutoOrderingState.GoingToBuyError && data.status != AutoOrderingState.PermanentError);
  });

  const btnDispatchDisabled = orderList.map((data: OrderData) => {
    return ((data.status === null || data.status === undefined) && data?.storeStatus != OrderStatus.Shipped && data.storeStatus != OrderStatus.Cancelled)
      || (data?.status != AutoOrderingState.AutoorderingDisabled && data.status != AutoOrderingState.GoingToBuyError && data.status != AutoOrderingState.PermanentError);
  });

  const cantBeStoped = orderList.map((data: OrderData) => {
    return (data?.storeStatus == OrderStatus.Shipped || data?.storeStatus == OrderStatus.Cancelled)
      || data?.status < AutoOrderingState.AutoorderingPrepared
      || (data?.status > AutoOrderingState.CompletedAutoOrder && data.status != AutoOrderingState.TemporaryError);
  });

  // const { orderNumber, channelId } = typeBtnProps;

  const handleProcessOrders = () => {
    dispatch(processOrders({ orderLineIds: selectedOrderIds, channelOAuthId: channelOAuthId }));
  };

  const handleManuallyDispatch = () => {
    dispatch(manuallyDispatch({ orderLineIds: selectedOrderIds, channelOAuthId: channelOAuthId }));
  };

  const handleStopOrder = () => {
    dispatch(stopOrder({ orderLineIds: selectedOrderIds, channelOAuthId: channelOAuthId }));
  };

  return (
    <StatusBar>
      <ConfirmBtn handleConfirm={handleProcessOrders} disabled={!btnProcessDisabled.includes(false)}>
        <ProcessOrderIcon />
        <span>
          {t('OrderButtons.Process')} {selectedOrderIds.length > 0 ? selectedOrderIds.length : ''} orders{' '}
        </span>
      </ConfirmBtn>

      <WarningBtn handleConfirm={handleStopOrder} disabled={!cantBeStoped.includes(false)}>
        <HandStopOrderIcon />
        <span>
          {t('OrderButtons.Stop')} {selectedOrderIds.length > 0 ? selectedOrderIds.length : ''} orders
        </span>
      </WarningBtn>

      <DangerBtn disabled={true}>
        <TrashIcon />
        <span>
          {t('OrderButtons.Delete')} {selectedOrderIds.length > 0 ? selectedOrderIds.length : ''} orders{' '}
        </span>
      </DangerBtn>

      <SuccessBtn handleConfirm={handleManuallyDispatch} disabled={!btnDispatchDisabled.includes(false)}>
        <CheckIcon />
        <span>{t('OrderButtons.MarkAsDispatched')}</span>
      </SuccessBtn>
    </StatusBar>
  );
};
