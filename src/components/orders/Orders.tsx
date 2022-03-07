import { useState } from 'react';
import { TableActionBtns } from '../small-components/TableActionBtns';
import { orderData } from '../common/OrderData';
import { OrderActionBtns } from './OrderActionBtns';
import { Layout } from 'antd';
import '../../sass/orders.scss';
import '../../sass/medium-button.scss';
import { DataTable } from '../tables/DataTable';
import { t } from 'src/utils/transShim';

export const Orders = () => {
  const [orderNumber] = useState(0);
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

  return (
    <Layout className="orders-container">
      <TableActionBtns />
      <OrderActionBtns orderNumber={orderNumber} />
      <DataTable columns={columns} dataSource={orderData} page="order" />
    </Layout>
  );
};
