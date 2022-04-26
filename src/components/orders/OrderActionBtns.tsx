import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
import { StatusBar } from '../small-components/StatusBar';
import { t } from '../../utils/transShim';
import '../../sass/orders.scss';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from '../small-components/ActionBtns';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { processOrders } from '../../redux/orders/orderThunk';
interface props {
  orderNumber: number;
  channelId: number;
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const dispatch = useAppDispatch();

  const { orderNumber, channelId } = typeBtnProps;
  console.log('The orderNumber', orderNumber);
  console.log('The channelId', channelId);

  const handleClick = () => {
    dispatch(processOrders({ channelOAuthIds: [590881] }));
  };

  return (
    <StatusBar>
      <ConfirmBtn handleClick={handleClick}>
        <ProcessOrderIcon />
        <span>
          {t('OrderTable.Process')} {orderNumber > 0 ? orderNumber : ''} orders{' '}
        </span>
      </ConfirmBtn>
      <WarningBtn>
        <HandStopOrderIcon />
        <span>
          {t('OrderTable.Stop')} {orderNumber > 0 ? orderNumber : ''} orders
        </span>
      </WarningBtn>

      <DangerBtn>
        <TrashIcon />
        <span>
          {' '}
          {t('OrderTable.Delete')} {orderNumber > 0 ? orderNumber : ''} orders{' '}
        </span>
      </DangerBtn>
      <SuccessBtn>
        <CheckIcon />
        <span>{t('OrderButtons.MarkAsDispatched')}</span>
      </SuccessBtn>
    </StatusBar>
  );
};
