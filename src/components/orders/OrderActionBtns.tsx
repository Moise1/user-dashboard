import { Button } from 'antd';
import { ProcessOrderIcon, HandStopOrderIcon, TrashIcon, CheckIcon } from '../common/Icons';
import { StatusBar } from '../small-components/StatusBar';
import { t } from '../../global/transShim';
import '../../sass/light-theme/orders.scss';

interface props {
  orderNumber: number;
}

export const OrderActionBtns = (typeBtnProps: props) => {
  const { orderNumber } = typeBtnProps;

  return (
    <>
      <StatusBar className="order-action-bar">
        <Button className="action-btn">
          <ProcessOrderIcon />
          <div className="btn-text">
            <span>
              {t('OrderTable.Process')} {orderNumber > 0 ? orderNumber : ''}
            </span>
            <span>Orders</span>
          </div>
        </Button>
        <Button className="action-btn">
          <HandStopOrderIcon />
          <div className="btn-tetx">
            <span>
              {t('OrderTable.Stop')} {orderNumber > 0 ? orderNumber : ''}
            </span>
            <span>Orders</span>
          </div>
        </Button>

        <Button className="action-btn">
          <TrashIcon />
          <div className="btn-text">
            <span>
              {t('OrderTable.Delete')} {orderNumber > 0 ? orderNumber : ''}
            </span>
            <span>Orders</span>
          </div>
        </Button>
        <Button className="action-btn">
          <CheckIcon />
          <div className="btn-text">
            <span>{t('OrderButtons.MarkAsDispatched')}</span>
          </div>
        </Button>
      </StatusBar>
    </>
  );
};
