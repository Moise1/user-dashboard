import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
import { StatusBar } from '../small-components/StatusBar';
import { t } from '../../global/transShim';
import '../../sass/light-theme/orders.scss';
import { ConfirmBtn, WarningBtn, DangerBtn, SuccessBtn } from '../small-components/ActionBtns';

interface props {
  orderNumber: number;
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const { orderNumber } = typeBtnProps;

  return (
    <StatusBar>
      <ConfirmBtn>
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
