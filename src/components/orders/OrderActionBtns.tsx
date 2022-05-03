import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
import { StatusBar } from '../../small-components/StatusBar';
import { t } from '../../utils/transShim';
import '../../sass/orders.scss';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { processOrders } from '../../redux/orders/orderThunk';
import { manuallyDispatch } from '../../redux/orders/orderThunk';
import { stopOrder } from '../../redux/orders/orderThunk';
interface props {
  orderNumber: number;
  // channelId: number;
  selectedRows: number;
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const dispatch = useAppDispatch();

  // const { orderNumber, channelId } = typeBtnProps;
  const { orderNumber, selectedRows } = typeBtnProps;

  console.log('The orderNumber is', orderNumber);
  // console.log('The channelId is', channelId);

  const handleProcessOrders = () => {
    dispatch(processOrders(orderNumber));
  };

  const handleManuallyDispatch = () => {
    dispatch(manuallyDispatch(orderNumber));
  };

  const handleStopOrder = () => {
    dispatch(stopOrder(orderNumber));
  };

  return (
    <StatusBar>
      <ConfirmBtn handleConfirm={handleProcessOrders}>
        <ProcessOrderIcon />
        <span>
          {t('OrderTable.Process')} {selectedRows > 0 ? selectedRows : ''} orders{' '}
        </span>
      </ConfirmBtn>

      <WarningBtn handleConfirm={handleManuallyDispatch}>
        <HandStopOrderIcon />
        <span>
          {t('OrderTable.Stop')} {selectedRows > 0 ? selectedRows : ''} orders
        </span>
      </WarningBtn>

      <DangerBtn>
        <TrashIcon />
        <span>
          {' '}
          {t('OrderTable.Delete')} {selectedRows > 0 ? selectedRows : ''} orders{' '}
        </span>
      </DangerBtn>

      <SuccessBtn handleConfirm={handleStopOrder}>
        <CheckIcon />
        <span>{t('OrderButtons.MarkAsDispatched')}</span>
      </SuccessBtn>
    </StatusBar>
  );
};
