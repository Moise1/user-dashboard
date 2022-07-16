import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
import React, { useEffect, useState } from 'react';
import { StatusBar } from '../../small-components/StatusBar';
import { t } from '../../utils/transShim';
import '../../sass/orders.scss';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { processOrders } from '../../redux/orders/orderThunk';
import { manuallyDispatch } from '../../redux/orders/orderThunk';
import { stopOrder } from '../../redux/orders/orderThunk';
import { OrderData } from 'src/redux/orders/orderSlice';
interface props {
  orders: OrderData[];
  // channelId: number;
  selectedRows: React.Key[];
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const { orders, selectedRows } = typeBtnProps;
  const [disabled, setDisabled] = useState<boolean>(true);
  useEffect(() => {
    selectedRows.length > 0 && setDisabled(false);
    selectedRows.length == 0 && setDisabled(true);
  });
  const dispatch = useAppDispatch();

  const selectedOrderIds = selectedRows.map((x) => {
    console.log(x);
    console.log(orders[x as unknown as number]);
    return orders[x as unknown as number].id;
  });


  // const { orderNumber, channelId } = typeBtnProps;

  const handleProcessOrders = () => {
    dispatch(processOrders(selectedOrderIds));
  };

  const handleManuallyDispatch = () => {
    dispatch(manuallyDispatch(selectedOrderIds));
  };

  const handleStopOrder = () => {
    dispatch(stopOrder(selectedOrderIds));
  };

  return (
    <StatusBar>
      <ConfirmBtn handleConfirm={handleProcessOrders} disabled={disabled}>
        <ProcessOrderIcon />
        <span>
          {t('OrderTable.Process')} {selectedRows.length > 0 ? selectedRows.length : ''} orders{' '}
        </span>
      </ConfirmBtn>

      <WarningBtn handleConfirm={handleStopOrder} disabled={disabled}>
        <HandStopOrderIcon />
        <span>
          {t('OrderTable.Stop')} {selectedRows.length > 0 ? selectedRows.length : ''} orders
        </span>
      </WarningBtn>

      <DangerBtn disabled={disabled}>
        <TrashIcon />
        <span>
          {t('OrderTable.Delete')} {selectedRows.length > 0 ? selectedRows.length : ''} orders{' '}
        </span>
      </DangerBtn>

      <SuccessBtn handleConfirm={handleManuallyDispatch} disabled={disabled}>
        <CheckIcon />
        <span>{t('OrderButtons.MarkAsDispatched')}</span>
      </SuccessBtn>
    </StatusBar>
  );
};
