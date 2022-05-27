import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
import { useEffect, useState } from 'react';
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
  orderNumber: { [key: string]: OrderData };
  // channelId: number;
  selectedRows: number;
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const { orderNumber, selectedRows } = typeBtnProps;
  const [disabled, setDisabled] = useState<boolean>(true);
  useEffect(() => {
    selectedRows > 0 && setDisabled(false);
    selectedRows == 0 && setDisabled(true);
  });
  const dispatch = useAppDispatch();

  // const { orderNumber, channelId } = typeBtnProps;

  const handleProcessOrders = () => {
    dispatch(processOrders(orderNumber.id));
  };

  const handleManuallyDispatch = () => {
    dispatch(manuallyDispatch(orderNumber.id));
  };

  const handleStopOrder = () => {
    dispatch(stopOrder(orderNumber.id));
  };

  return (
    <StatusBar>
      <ConfirmBtn handleConfirm={handleProcessOrders} disabled={disabled}>
        <ProcessOrderIcon />
        <span>
          {t('OrderTable.Process')} {selectedRows > 0 ? selectedRows : ''} orders{' '}
        </span>
      </ConfirmBtn>

      <WarningBtn handleConfirm={handleManuallyDispatch} disabled={disabled}>
        <HandStopOrderIcon />
        <span>
          {t('OrderTable.Stop')} {selectedRows > 0 ? selectedRows : ''} orders
        </span>
      </WarningBtn>

      <DangerBtn disabled={disabled}>
        <TrashIcon />
        <span>
          {t('OrderTable.Delete')} {selectedRows > 0 ? selectedRows : ''} orders{' '}
        </span>
      </DangerBtn>

      <SuccessBtn handleConfirm={handleStopOrder} disabled={disabled}>
        <CheckIcon />
        <span>{t('OrderButtons.MarkAsDispatched')}</span>
      </SuccessBtn>
    </StatusBar>
  );
};
