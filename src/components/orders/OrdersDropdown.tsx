import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  DustbinDeleteOrderIcon,
  DispatchedOrderIcon,
  HandStopOrderIcon,
  ProcessOrderIcon,
  ThreeDotsColumnIcon
} from '../common/Icons';
import { t } from '../../global/transShim';
import '../../sass/light-theme/orders-dropdown.scss';
import '../../sass/light-theme/orders.scss';

function OrdersDropdown() {
  return (
    <>
      <Dropdown className="dropdown-orders-button">
        <Dropdown.Toggle id="dropdown-basic">
          <ThreeDotsColumnIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-box">
          <Dropdown.Item className="dropdown-item">
            <ProcessOrderIcon />
            <span className="dropdown-text"> {t('OrderDetails.ProcessOrder')}</span>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            <span>
              <HandStopOrderIcon />
              <span className="dropdown-text">{t('OrderDetails.StopOrder')} </span>
            </span>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            <DispatchedOrderIcon />
            <span className="dropdown-text"> {t('OrderDetails.MarkAsDispatched')}</span>
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">
            <DustbinDeleteOrderIcon />
            <span className="dropdown-text">{t('OrderDetails.DeleteOrder')} </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default OrdersDropdown;
