// import { orderData } from '../common/OrderData';
import '../../sass/orders.scss';
import '../../sass/medium-button.scss';
import { t } from 'src/utils/transShim';
import { useEffect, useState } from 'react';
import { OrderActionBtns } from './OrderActionBtns';
import { Layout, Input } from 'antd';
import { OrderData } from '../../redux/orders/orderSlice';
import { DataTable } from '../tables/DataTable';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { getOrders } from 'src/redux/orders/orderThunk';
import { Key } from 'antd/lib/table/interface';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state);

  const [current, setCurrent] = useState<number>(1);
  const [orderNumber] = useState(0);
  const [order, setOrder] = useState([]);
  const [searchedArray, setSearchedArray] = useState([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [searchFilterKey, setSearchFilterKey] = useState<Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  useEffect(() => {
    dispatch(getOrders({ channelOAuthIds: [590881] }));
    setOrder(orders?.orders.length && orders?.orders.map((item: string) => item));
  }, [getOrders]);

  useEffect(() => {
    setSearchedArray(order.filter((e: OrderData) => e.channelItem === String(searchKey)));
    setSearchFilterKey(order.filter((e: OrderData) => e.channelItem === String(searchKey)));
  }, [order, searchKey]);

  const onSelectChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  console.log(rowSelection);
  console.log('The search Array ', searchedArray);
  console.log('The search Array ', searchFilterKey);

  const columns = [
    {
      title: t('OrderTable.Image'),
      dataIndex: '<img src={imageUrl} />',
      key: '1',
      visible: true
    },
    {
      title: t('OrderTable.Reference'),
      dataIndex: 'reference',
      key: '2',
      visible: false
    },
    {
      title: t('OrderTable.Item'),
      dataIndex: 'channelItem',
      key: '3',
      visible: false
    },
    {
      title: t('OrderTable.Source'),
      dataIndex: 'sourceItem',
      key: '4',
      visible: false
    },
    {
      title: t('OrderTable.Title'),
      dataIndex: 'title',
      key: '5',
      visible: false
    },
    {
      title: t('OrderTable.Quantity'),
      dataIndex: 'quantity',
      key: '6',
      visible: false
    },
    {
      title: t('OrderTable.Sold'),
      dataIndex: 'channelPrice',
      key: '7',
      visible: false
    },
    {
      title: t('OrderTable.Cost'),
      dataIndex: 'sourcePrice',
      key: '8',
      visible: false
    },
    {
      title: t('OrderTable.Fees'),
      dataIndex: 'fees',
      key: '9',
      visible: false
    },
    {
      title: t('OrderTable.Profit'),
      dataIndex: 'fees',
      key: '10',
      visible: false
    },
    {
      title: t('OrderTable.Margin'),
      dataIndex: 'fees',
      key: '11',
      visible: false
    },
    {
      title: t('OrderTable.DateOfOrder'),
      dataIndex: 'date',
      key: '12',
      visible: false
    },
    {
      title: t('OrderTable.Status'),
      dataIndex: 'status',
      key: '13',
      visible: false
    }
  ];

  return (
    <Layout className="orders-container">
      <div className="search-options-area">
        <Input
          autoFocus
          placeholder="Smart Search....."
          value={selectedRowKeys[0]}
          onChange={(e) => {
            setSearchKey(e.target.value ? e.target.value : '');
            console.log(searchKey);
          }}
        ></Input>
      </div>
      {/* <TableActionBtns /> This is small icon button for searching*/}
      <OrderActionBtns orderNumber={orderNumber} />
      <DataTable
        page="order"
        columns={columns}
        dataSource={searchedArray.length > 0 ? searchedArray : order}
        rowSelection={rowSelection}
        selectedRows={selectedRowKeys.length}
        totalItems={order.length}
        pageSize={10}
        current={current}
        onChange={setCurrent}
        pagination={false}
      />
    </Layout>
  );
};
