import { useState } from 'react';
import { TableActionBtns } from '../small-components/TableActionBtns';
import {orderData} from '../common/OrderData';
// import { OrdersTable } from '../tables/OrdersTable';
import { OrderActionBtns } from './OrderActionBtns';
import { Layout } from 'antd';
import OrderStateProgressModal from '../modals/OrderStateProgressModal';
import OrderDetailsModal from '../modals/OrderDetailsModal';
import '../../sass/light-theme/orders.scss';
import '../../sass/light-theme/medium-button.scss';
import {DataTable} from '../tables/DataTable';
import { t } from 'src/global/transShim';

// interface props {
//   staticValue: boolean;
// }

export const Orders = () => {
  const [orderNumber,] = useState(0);
  const [show, setShow] = useState(false);
  const [orderDetailsModalShow, setOrderDetailsModalShow] = useState(false);

  const columns = [
    {
      title: t('OrderTable.Item'),
      dataIndex: 'img',
      key: 'img'
    },
    {
      title: t('OrderTable.Sale'),
      dataIndex: 'sale',
      key: 'sale'
    },
    {
      title: t('OrderTable.Source'),
      dataIndex: 'source',
      key: 'source'
    },
    {
      title: t('OrderTable.Title'),
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t('OrderTable.Quantity'),
      dataIndex: 'qty',
      key: 'qty'
    },
    {
      title: t('OrderTable.Sold'),
      dataIndex: 'sold',
      key: 'sold'
    }


  ];

  const handleCloseAllModals = () => {
    setOrderDetailsModalShow(false);
    setShow(false);
  };

  return (
    <Layout className="orders-container">
      <TableActionBtns />
      <OrderActionBtns orderNumber={orderNumber} />
      <DataTable columns={columns} dataSource={orderData}/>
      <OrderStateProgressModal
        setOrderDetailsModalShow={setOrderDetailsModalShow}
        orderDetailsModalShow={orderDetailsModalShow}
        orderProgress={1}
        show={show}
        setShow={setShow}
        handleCloseAllModals={handleCloseAllModals}
      />

      <OrderDetailsModal
        setOrderDetailsModalShow={setOrderDetailsModalShow}
        orderDetailsModalShow={orderDetailsModalShow}
        handleCloseAllModals={handleCloseAllModals}
        setShow={setShow}
      />
    </Layout>
  );
};
