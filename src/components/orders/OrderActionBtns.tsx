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
interface props {
  channelOAuthId: number[];
  selectedOrderIds: number[];
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const { channelOAuthId, selectedOrderIds } = typeBtnProps;
  const [disabled, setDisabled] = useState<boolean>(true);
  useEffect(() => {
    selectedOrderIds.length > 0 && setDisabled(false);
    selectedOrderIds.length == 0 && setDisabled(true);
  });
  const dispatch = useAppDispatch();


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
      <ConfirmBtn handleConfirm={handleProcessOrders} disabled={disabled}>
        <ProcessOrderIcon />
        <span>
          {t('OrderButtons.Process')} {selectedOrderIds.length > 0 ? selectedOrderIds.length : ''} orders{' '}
        </span>
      </ConfirmBtn>

      <WarningBtn handleConfirm={handleStopOrder} disabled={disabled}>
        <HandStopOrderIcon />
        <span>
          {t('OrderButtons.Stop')} {selectedOrderIds.length > 0 ? selectedOrderIds.length : ''} orders
        </span>
      </WarningBtn>

      <DangerBtn disabled={disabled}>
        <TrashIcon />
        <span>
          {t('OrderButtons.Delete')} {selectedOrderIds.length > 0 ? selectedOrderIds.length : ''} orders{' '}
        </span>
      </DangerBtn>

      <SuccessBtn handleConfirm={handleManuallyDispatch} disabled={disabled}>
        <CheckIcon />
        <span>{t('OrderButtons.MarkAsDispatched')}</span>
      </SuccessBtn>
    </StatusBar>
  );
};
