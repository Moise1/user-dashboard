import '../../sass/orders.scss';
import '../../sass/medium-button.scss';
import { t } from 'src/utils/transShim';
import { Key } from 'antd/lib/table/interface';
import { useState, useMemo, useEffect, useContext } from 'react';
import { CheckIcon } from '../common/Icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { OrderActionBtns } from './OrderActionBtns';
import { OrderData } from '../../redux/orders/orderSlice';
import { DataTable } from '../tables/DataTable';
import { getOrders } from 'src/redux/orders/orderThunk';
import { PopupModal } from '../modals/PopupModal';
import { BulkEditListings } from '../listings/BulkEditListings';
import { determineStatus } from '../../utils/determineStatus';
import { OrderContent } from 'src/small-components/OrderContent';
import { Card, Checkbox, Row, Col, Layout, Input, Spin } from 'antd';
import { ShowVisibleColBtn, CancelBtn } from '../../small-components/ActionBtns';
import { TableActionBtns } from '../../small-components/TableActionBtns';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { OrdersAdvancedSearch } from 'src/small-components/OrderAdvancedSearchDrawers';
import OrderDetailsContent from 'src/small-components/OrderDetailsContent';
import moment from 'moment';
import { AppContext } from '../../contexts/AppContext';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state);
  const { status, loading } = useAppSelector((state) => state.orders);
  const [current, setCurrent] = useState<number>(1);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [orderNumber] = useState(selectedRecord && selectedRecord);
  const [order, setOrder] = useState([]);
  const [searchedArray, setSearchedArray] = useState<OrderData[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [searchFilterKey, setSearchFilterKey] = useState<Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [postPerPage, setPostPerPage] = useState<number>(10);
  //For Modal
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState<boolean>(false);
  const handleBulkOrderModal = () => setBulkEditOpen(!bulkEditOpen);
  const handleSingleOrderModal = () => setSingleEditOpen(!singleEditOpen);
  const handleSingleOrderDetailModal = () => setOrderDetailsOpen(!orderDetailsOpen);

  const handleOrderDetailsOpen = () => {
    handleSingleOrderModal();
    setOrderDetailsOpen(!orderDetailsOpen);
  };

  const handleOrderContentOpen = () => {
    handleSingleOrderModal();
    setOrderDetailsOpen(!orderDetailsOpen);
  };

  const tableColumns = [
    {
      title: t('OrderTable.Image'),
      dataIndex: '',
      key: '1',
      visible: true,
      render: (record: OrderData) => (
        <div className="order-img-container">
          <img src={record.imageUrl} alt="image" className="record-img" />
        </div>
      )
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
      visible: true
    },
    {
      title: t('OrderTable.Source'),
      dataIndex: '',
      key: '4',
      visible: true,
      render: (record: OrderData) => <p>{record.sourceId === 1 ? ' Amazon ' : ' - '}</p>
    },
    {
      title: t('OrderTable.Title'),
      dataIndex: '',
      key: '5',
      visible: true,
      render: (record: OrderData) => <p>{record.title}</p>
    },
    {
      title: t('OrderTable.Quantity'),
      dataIndex: 'quantity',
      key: '6',
      visible: true
    },
    {
      title: t('OrderTable.Sold'),
      dataIndex: 'channelPrice',
      key: '7',
      visible: true
    },
    {
      title: t('OrderTable.Cost'),
      dataIndex: '',
      key: '8',
      visible: true,
      render: (record: OrderData) => <p>{record.sourcePrice ? `£${record.sourcePrice}` : ' - '}</p>
    },
    {
      title: t('OrderTable.Fees'),
      dataIndex: '',
      key: '9',
      visible: true,
      render: (record: OrderData) => <p>{record.fees ? `£${record.fees}` : ' - '}</p>
    },
    {
      title: t('OrderTable.Profit'),
      dataIndex: '',
      key: '10',
      visible: true,
      render: (record: OrderData) => <p>{record.profit ? `${record.profit}£` : ' - '}</p>
    },
    {
      title: t('OrderTable.Margin'),
      dataIndex: '',
      key: '11',
      visible: true,
      render: (record: OrderData) => <p>{record.margin ? `${record.margin}%` : ' - '}</p>
    },
    {
      title: t('OrderTable.DateOfOrder'),
      dataIndex: 'date',
      key: '12',
      visible: true
    },
    {
      title: t('OrderTable.Status'),
      dataIndex: '',
      key: '13',
      visible: true,
      render: (record: OrderData) => determineStatus(record.status)
    }
  ];

  const { channelId: newChannel } = useContext(AppContext);

  useEffect(() => {
    setOrder(
      orders?.orders.length &&
        orders?.orders.map((item: OrderData): unknown => ({
          ...item,
          profit: item.channelPrice - item.channelPrice - item.fees,
          margin: (item.profit! / item.channelPrice) * 100,
          date: moment(item.date).format('DD/MM/YY/ hh:mm')
        }))
    );
  }, [orders.orders, newChannel]);

  useEffect(() => {
    dispatch(getOrders({ channelOAuthIds: [newChannel as number] }));
  }, [getOrders, newChannel]);

  //How many columns to show
  const [columns, setColumns] = useState(tableColumns);
  const visibleCols = useMemo(() => columns.filter((col) => col.visible === true), [columns]);
  const onSelectChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const handleCheckBox = (e: CheckboxChangeEvent): void => {
    const cloneColumns = columns.map((col) => {
      if (col.key === e.target.value) {
        return { ...col, visible: e.target.checked };
      } else {
        return col;
      }
    });
    setColumns(cloneColumns);
  };
  const handleClose = () => {
    setColumns(tableColumns);
    setShowColumns(!showColumns);
  };
  const handleApplyChanges = () => setShowColumns(!showColumns);
  const handleCancelChanges = () => {
    setColumns(tableColumns);
    setShowColumns(!showColumns);
  };
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  console.log(searchFilterKey);
  // //For Searching
  useEffect(() => {
    if (order.length) {
      setSearchedArray(
        order?.filter(
          (e: OrderData) =>
            e.channelItem === String(searchKey) ||
            e.title === String(searchKey) ||
            e.reference === String(searchKey) ||
            String(e.fees) === String(searchKey) ||
            String(e.profit) === String(searchKey) ||
            String(e.sold) === String(searchKey)
        )
      );
      setSearchFilterKey(order?.filter((e: OrderData) => e.channelItem === String(searchKey)));
    }
  }, [searchKey, orders]);

  console.log('The selectedRecord is', selectedRecord);
  return (
    <Layout className="orders-container">
      {loading ? (
        <Spin />
      ) : (
        <>
          <PopupModal open={showColumns} handleClose={handleClose} width={900}>
            <h5 className="cols-display-title">Select columns to display</h5>
            <p className="description">Display columns in the order table that suit your interests.</p>
            <Card className="listings-card">
              <Row className="listings-cols">
                <Col>
                  <ul className="cols-list">
                    {columns.map((col) => (
                      <li key={col.key}>
                        <Checkbox className="checkbox" checked={col.visible} value={col.key} onChange={handleCheckBox}>
                          {col.title}
                        </Checkbox>
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col>
                  <div className="cols-amount">
                    <p>Amount of columns on your orders table</p>
                    <h3>{visibleCols.length}</h3>
                  </div>
                </Col>
              </Row>
              <div className="show-columns-action-btns">
                <CancelBtn handleClose={handleCancelChanges}>{t('Cancel')}</CancelBtn>
                <ShowVisibleColBtn handleClose={handleApplyChanges}>
                  <CheckIcon />
                  {t('ApplyChanges')}
                </ShowVisibleColBtn>
              </div>
            </Card>
          </PopupModal>
          {selectedRowKeys.length > 1 ? (
            <PopupModal open={bulkEditOpen} width={900} handleClose={handleBulkOrderModal}>
              <BulkEditListings selectedItems={selectedRowKeys.length} />
            </PopupModal>
          ) : (
            <PopupModal open={singleEditOpen} width={900} handleClose={handleSingleOrderModal}>
              <OrderContent
                orderProgress={status}
                data={selectedRecord}
                OrderDetailsModalOpen={handleOrderDetailsOpen}
              />
            </PopupModal>
          )}
          <PopupModal open={orderDetailsOpen} width={900} handleClose={handleSingleOrderDetailModal}>
            <OrderDetailsContent data={selectedRecord} OrderContentModalOpen={handleOrderContentOpen} />
          </PopupModal>
          <div className="search-options-area">
            <Input
              autoFocus
              placeholder="Search....."
              onChange={(e) => {
                setSearchKey(e.target.value ? e.target.value : '');
              }}
            ></Input>
            <OrdersAdvancedSearch
              visible={drawerOpen}
              onClose={handleSideDrawer}
              order={order}
              setSearchKey={setSearchKey}
              setSearchedArray={setSearchedArray}
              setSearchFilterKey={setSearchFilterKey}
            />
            <TableActionBtns showColumns handleShowColumns={handleClose} handleSideDrawer={handleSideDrawer}>
              {t('AdvancedSearch')}
            </TableActionBtns>
          </div>
          <OrderActionBtns orderNumber={orderNumber} selectedRows={selectedRowKeys.length} />
          <DataTable
            page="order"
            columns={visibleCols}
            dataSource={searchedArray.length > 0 ? searchedArray : order}
            rowSelection={rowSelection}
            selectedRows={selectedRowKeys.length}
            totalItems={order.length}
            pageSize={postPerPage}
            setPostPerPage={setPostPerPage}
            current={current}
            onChange={setCurrent}
            rowClassName="table-row"
            onRow={(record) => {
              return {
                onClick: () => {
                  setSelectedRecord(record);
                  handleSingleOrderModal();
                }
              };
            }}
          />
        </>
      )}
    </Layout>
  );
};
