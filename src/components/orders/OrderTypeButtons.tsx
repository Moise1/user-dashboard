import { ProcessOrderIcon, HandStopOrderIcon, DustbinDeleteOrderIcon, DispatchedOrderIcon } from '../common/Icons';
import { t } from '../../global/transShim';
import '../../sass/ligth-theme/orders.scss';

interface props {
  orderNumber: number;
}

const OrderTypeButtons = (typeBtnProps: props) => {
  const { orderNumber } = typeBtnProps;

  return (
    <div className="orders-type-btns">
      <div className=" d-flex">
        <button className="btn process-5-order-btn">
          <ProcessOrderIcon />
          <span className="ml-1 ml-sm-2">
            {' '}
            {t('OrderTable.Process')} {orderNumber > 0 ? orderNumber : ''}
          </span>
          <span className="d-none d-md-block">&nbsp;Orders</span>
        </button>
        <button className="btn stop-5-order-btn mx-1 mx-sm-3">
          <HandStopOrderIcon />
          <span className="ml-1 ml-sm-2">
            {t('OrderTable.Stop')} {orderNumber > 0 ? orderNumber : ''}
          </span>
          <span className="d-none d-md-block">&nbsp;Orders</span>
        </button>
      </div>

      <div className="d-flex   ">
        <button className="btn delete-5-order-btn">
          <DustbinDeleteOrderIcon />
          <span className="ml-1 ml-sm-2">
            {t('OrderTable.Delete')} {orderNumber > 0 ? orderNumber : ''}
          </span>
          <span className="d-none d-md-block">&nbsp;Orders</span>
        </button>
        <button className="btn mark-dispatch-btn mx-1  mx-sm-3">
          <DispatchedOrderIcon />
          <span className="ml-1 ml-sm-2">{t('OrderButtons.MarkAsDispatched')}</span>
        </button>
      </div>
    </div>
  );
};

export default OrderTypeButtons;
