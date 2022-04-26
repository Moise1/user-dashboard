import '../../sass/orders.scss';
import '../../sass/medium-button.scss';
import { t } from 'src/utils/transShim';
import { Key } from 'antd/lib/table/interface';
import { useState, useMemo, useEffect } from 'react';
import { Card, Checkbox, Row, Col, Layout, Input } from 'antd';
import { CheckIcon } from '../common/Icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { OrderActionBtns } from './OrderActionBtns';
import { OrderData } from '../../redux/orders/orderSlice';
import { DataTable } from '../tables/DataTable';
import { getOrders } from 'src/redux/orders/orderThunk';
import { PopupModal } from '../modals/PopupModal';
import { SuccessBtn, CancelBtn } from '../../small-components/ActionBtns';
import { TableActionBtns } from '../../small-components/TableActionBtns';
import { OrdersAdvancedSearch } from '../small-components/OrderAdvancedSearchDrawers';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
// import { OrderEditSingleListing } from '../orders/OrderEditSingleListing';
import { BulkEditListings } from '../listings/BulkEditListings';
import { determineStatus } from '../../utils/determineStatus';
// import { SearchOptions } from '../small-components/SearchOptions';
import moment from 'moment';
// import OrderStateProgressModal from '../small-components/OrderStateProgressModal';
import { OrderContent } from '../small-components/OrderStateProgressModal';

export const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state);
  const { status } = useAppSelector((state) => state.orders);
  const [current, setCurrent] = useState<number>(1);
  const [orderNumber] = useState(445378);
  const [order, setOrder] = useState([]);
  const [searchedArray, setSearchedArray] = useState([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);
  const [searchFilterKey, setSearchFilterKey] = useState<Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const handleBulkListingModal = () => setBulkEditOpen(!bulkEditOpen);

  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const handleOrderModal = () => setOrderModalOpen(!orderModalOpen);

  //Get Orders
  useEffect(() => {
    dispatch(getOrders({ channelOAuthIds: [590881] }));
    setOrder(
      orders?.orders.length &&
        orders?.orders.map((item: OrderData): unknown => ({
          ...item,
          profit: item.channelPrice - item.channelPrice - item.fees,
          margin: (item.profit / item.channelPrice) * 100,
          date: moment(item.date).format('DD/MM/YY/ hh:mm')
        }))
    );
  }, [getOrders]);

  console.log(setCurrent);

  const tableColumns = [
    {
      title: t('OrderTable.Image'),
      dataIndex: '',
      key: '1',
      visible: true,
      render: (record: OrderData) => (
        <div className="img-container">
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
      dataIndex: 'sourceItem',
      key: '4',
      visible: true
    },
    {
      title: t('OrderTable.Title'),
      dataIndex: '',
      key: '5',
      visible: true,
      render: (record: OrderData) => <p className="title">{record.title}</p>
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
      dataIndex: 'profit',
      key: '10',
      visible: false
    },
    {
      title: t('OrderTable.Margin'),
      dataIndex: 'margin',
      key: '11',
      visible: false
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
  const [columns, setColumns] = useState(tableColumns);
  const visibleCols = useMemo(() => columns.filter((col) => col.visible === true), [columns]);
  // //For Searching
  useEffect(() => {
    setSearchedArray(order.filter((e: OrderData) => e.channelItem === String(searchKey)));
    setSearchFilterKey(order.filter((e: OrderData) => e.channelItem === String(searchKey)));
  }, [order, searchKey]);

  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log({ selectedRowKeys });
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handleClose = () => {
    setColumns(tableColumns);
    setShowColumns(!showColumns);
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

  const handleCancelChanges = () => {
    setColumns(tableColumns);
    setShowColumns(!showColumns);
  };
  const handleApplyChanges = () => setShowColumns(!showColumns);
  const handleSingleListingModal = () => setSingleEditOpen(!singleEditOpen);
  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);

  // console.log(rowSelection);
  console.log('The search Array ', searchFilterKey);
  // console.log('The searchkey setter is', setSearchKey);
  // console.log('The setShowColumn', setShowColumns);
  // console.log('The setBulkEditOpen', setBulkEditOpen);
  // console.log('setSingleEditOpen', setSingleEditOpen);
  // console.log('setDrawerOpen', setDrawerOpen);

  return (
    <Layout className="orders-container">
      <PopupModal open={showColumns} handleClose={handleClose} width={900}>
        <h5 className="cols-display-title">Select columns to display</h5>
        <p className="description">Display columns in the listing table that suit your interests.</p>
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
                <p>Amount of columns on your listings table</p>
                <h3>{visibleCols.length}</h3>
              </div>
            </Col>
          </Row>
          <div className="show-columns-action-btns">
            <CancelBtn handleClose={handleCancelChanges}>{t('Cancel')}</CancelBtn>
            <SuccessBtn handleClose={handleApplyChanges}>
              <CheckIcon />
              {t('ApplyChanges')}
            </SuccessBtn>
          </div>
        </Card>
      </PopupModal>
      {selectedRowKeys.length > 1 ? (
        <PopupModal open={bulkEditOpen} width={900} handleClose={handleBulkListingModal}>
          <BulkEditListings selectedItems={selectedRowKeys.length} />
        </PopupModal>
      ) : (
        <PopupModal open={singleEditOpen} width={900} handleClose={handleSingleListingModal}>
          <OrderContent orderProgress={status} handleClose={handleOrderModal} />
        </PopupModal>
      )}

      <div className="search-options-area">
        {/* <SearchOptions showSearchInput /> */}
        <Input
          autoFocus
          placeholder="Search....."
          onChange={(e) => {
            setSearchKey(e.target.value ? e.target.value : '');
          }}
        ></Input>
        <OrdersAdvancedSearch visible={drawerOpen} onClose={handleSideDrawer} />
        <TableActionBtns showColumns handleShowColumns={handleClose} handleSideDrawer={handleSideDrawer}>
          {t('AdvancedSearch')}
        </TableActionBtns>
      </div>
      <OrderActionBtns orderNumber={orderNumber} channelId={590881} />
      <DataTable
        page="order"
        columns={visibleCols}
        dataSource={searchedArray.length > 0 ? searchedArray : order}
        rowSelection={rowSelection}
        selectedRows={selectedRowKeys.length}
        totalItems={order.length}
        pageSize={10}
        current={current}
        // onChange={setCurrent}
        pagination={false}
        rowClassName="table-row"
        onRow={(record) => {
          console.log(record);
          return {
            onClick: () => handleSingleListingModal()
          };
        }}
      />
    </Layout>
  );
};
