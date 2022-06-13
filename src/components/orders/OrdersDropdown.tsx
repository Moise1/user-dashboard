import { Dropdown, Menu } from 'antd';
// import { TrashIcon, CheckIcon, HandStopOrderIcon, ProcessOrderIcon, ThreeDotsColumnIcon } from '../common/Icons';
// import { t } from '../../utils/transShim';
import '../../sass/orders-dropdown.scss';
import '../../sass/orders.scss';

function OrdersDropdown() {

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <Dropdown overlay={menu} className="dropdown-orders-button">
        <p>one</p>
        <p>one</p>
      </Dropdown>
    </>
  );
}

export default OrdersDropdown;
