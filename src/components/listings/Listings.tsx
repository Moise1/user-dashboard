/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Checkbox, Row, Col, Layout, Input } from 'antd';
import { TableActionBtns } from '../small-components/TableActionBtns';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { DataTable, SeletedRowsType } from '../tables/DataTable';
import { ListingData, pending_listings } from '../../redux/listings/listingsSlice';
import { Key } from 'antd/lib/table/interface';
import { PopupModal } from '../modals/PopupModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SuccessBtn, CancelBtn } from '../small-components/ActionBtns';
import { EditSingleListing } from '../listings/EditSingleListing';
import { BulkEditListings } from '../listings/BulkEditListings';
import { CheckIcon } from '../common/Icons';
import { ListingsAdvancedSearch } from '../small-components/AdvancedSearchDrawers';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {
  getListings,
  getListingsSource,
  getPendingListing,
  getTerminateListings
} from 'src/redux/listings/listingsThunk';
import '../../sass/listings.scss';
import moment from 'moment';

export const Listings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [searchFilterKey, setSearchFilterKey] = useState<Key[]>([]);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const { listings } = useAppSelector((state) => state.listings);
  const { pending_listings } = useAppSelector((state) => state.pendingListings);
  const { terminate_listings } = useAppSelector((state) => state.terminateListings);
  // const { listingSources } = useAppSelector((state) => state);
  const [activeListingsType, setActiveListingsType] = useState('activeTabListings');
  const dispatch = useAppDispatch();
  const [list, setList] = useState([]);
  const [terminateList, setTerminateList] = useState([]);

  const [singleRecordData, setSingleRecordData] = useState({
    imageUrl:
      'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202102/202102041122171645_b1fbef27-f863-45eb-9558-6567c7cf8ec5.jpg',
    asin: null,
    buyBoxPrice: null,
    channelItem: '3548023',
    channelListingId: 3548023,
    channelPrice: 28.03,
    channelQuantity: 0,
    createdById: 30784,
    createdByName: 'Admin',
    createdOn: 'Tue Jul 13 2021 15:53:58 GMT+0500 (Pakistan Standard Time)',
    endsOn: null,
    id: 1879059,
    isLowestPrice: null,
    key: 0,
    lastTimeInStock: 'Tue Apr 19 2022 11:26:58 GMT+0500 (Pakistan Standard Time)',
    lastTimeSold: null,
    lowestPrice: null,
    origin: undefined,
    overrides: undefined,
    price: 28.03,
    productNotes: null,
    productSourceId: 1866638,
    quantitySold: 0,
    sourceId: 5,
    sourcePath:
      '8-PCS-Solar-Power-Lights-Bubble-White-LED-Light-Outdoor-Lawn-Garden-Lamp-Solar-Garden-Light-p-1025499.html?cur_warehouse=UK&rmmds=category',
    sourcePrice: 21.56,
    sourceQuantity: 0,
    status: 64,
    title: '8 PCS Solar Power Lights Bubble White LED Light Outdoor Lawn Garden Lamp Solar G',
    updatedOn: 'Thu Apr 21 2022 14:51:58 GMT+0500 (Pakistan Standard Time)',
    userProductSourceChannelId: 1879059,
    views: 0,
    watches: 0
  });
  // console.log({ listings });
  // console.log('the state', pending_listings);

  const [source, setSource] = useState([]);

  const [searchedArray, setSearchedArray] = useState([]);
  useEffect(() => {
    dispatch(getListings());
    dispatch(getListingsSource());
    dispatch(getPendingListing());
    dispatch(getTerminateListings());

    setList(pending_listings.length &&
      pending_listings.map((item: pending_listings) => ({
        ...item,
        createdOn: moment(item.createdOn).format('DD/MM/YY/ hh:mm')
      }))
    );

    setTerminateList(terminate_listings.length &&
      terminate_listings.map((item: pending_listings) => ({
        ...item,
        createdOn: moment(item.createdOn).format('DD/MM/YY/ hh:mm')
      }))
    );

    
    if(activeListingsType === 'activeTabListings') {
      console.log(activeListingsType);
    } else if (activeListingsType === 'pendingTabListing') {
      console.log(activeListingsType);
    } else {
      console.log(activeListingsType);
    }

    // console.log('The created on',list);
    // const t = listingSources?.sourceListings.length && listingSources?.sourceListings.map((item: any) => item.name);
    // setSource(t);
    // console.log('yes', t);
  }, [getListings, getListingsSource, getPendingListing, activeListingsType]);

  const [mySelectedRows, setMySelectedRows] = useState<SeletedRowsType>([]);

  const tableColumns = [
    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'id',
      key: '1',
      visible: true
    },

    {
      title: t('Listings.Column.Img'),
      dataIndex: '',
      key: '2',
      visible: activeListingsType === 'pendingTabListing' ? false : true,
      render: (record: pending_listings) => (
        <div className="img-container">
          <img src={record.imageUrl} alt="image" className="record-img" />
        </div>
      )
    },

    {
      title: t('Listings.Column.Source'),
      dataIndex: 'name',
      key: '3',
      visible: false
    },

    {
      title: t('Listings.Column.Title'),
      dataIndex: 'title',
      key: '4',
      visible: true
    },

    {
      title: t('Listings.Column.Sell'),
      dataIndex: 'channelPrice',
      key: '5',
      visible: true
    },
    {
      title: t('Listings.Column.Cost'),
      dataIndex: 'sourcePrice',
      key: '6',
      visible: false
    },
    {
      title: t('Listings.Column.Profit'),
      dataIndex: 'price',
      key: '7',
      visible: false
    },
    {
      title: t('Listings.Column.Markup'),
      dataIndex: 'sourceId',
      key: '8',
      visible: false
    },

    {
      title: t('Listings.Column.Stock'),
      dataIndex: 'sourceQuantity',
      key: '9',
      visible: false
    },
    {
      title: t('Listings.Column.Options'),
      dataIndex: 'options',
      key: '10',
      visible: false
    },
    {
      title: t('Listings.Column.Created On'),
      dataIndex: 'createdOn',
      key: '11',
      // eslint-disable-next-line no-constant-condition
      visible: activeListingsType === 'activeTabListings' ? false : true && activeListingsType === 'pendingTabListing' ? true : false && activeListingsType === 'terminateTypeListing' ? false : true
    },
    {
      title: t('Listings.Column.Created By'),
      dataIndex: 'createdByName',
      key: '12',
      visible: activeListingsType === 'activeTabListings' ? false : true
    },
  ];

  console.log('first', {tableColumns});

  const [columns, setColumns] = useState(tableColumns);

  const handleChangeTab = (e: React.MouseEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setActiveListingsType('activeTabListings');
    dispatch(getListings());
    // console.log(activeListingsType);
  };

  const handleChangePendingTab = (e: React.MouseEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setActiveListingsType('pendingTabListing');
    dispatch(getPendingListing());
    // console.log(activeListingsType);
  };

  const handleChangeTerminateTab = (e: React.MouseEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setActiveListingsType('terminateTypeListing');
    dispatch(getTerminateListings());
  };

  const onSelectChange = (selectedRowKeys: Key[], selectedRows: SeletedRowsType) => {
    // console.log(selectedRowKeys);
    // console.log(selectedRows);
    setMySelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
    const selectedRow = listings.filter((r: ListingData) => r.id === selectedRows[0]?.id)[0];
    console.log('to checked ID', selectedRow);
    setSingleRecordData(selectedRow);
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

  const visibleCols = useMemo(() => columns.filter((col) => col.visible === true), [columns]);

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);

  const handleSingleListingModal = () => setSingleEditOpen(!singleEditOpen);

  const handleBulkListingModal = () => setBulkEditOpen(!bulkEditOpen);

  useEffect(() => {
    setSearchedArray(listings.filter((e: ListingData) => e.id === Number(searchKey)));
    setSearchFilterKey(listings.filter((e: ListingData) => e.id === Number(searchKey)));
  }, [listings, searchKey]);

  const [current, setCurrent] = useState<number>(1);

  

  return (
    <Layout className="listings-container">
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
          <EditSingleListing selectedItems={singleRecordData} />
        </PopupModal>
      )}

      <div className="search-options-area">
        <Input
          autoFocus
          placeholder="Search....."
          onChange={(e) => {
            setSearchKey(e.target.value ? e.target.value : '');
          }}
        ></Input>
        <ListingsAdvancedSearch visible={drawerOpen} onClose={handleSideDrawer} />
        <TableActionBtns showColumns handleShowColumns={handleClose} handleSideDrawer={handleSideDrawer}>
          {t('AdvancedSearch')}
        </TableActionBtns>
      </div>

      <StatusBar>
        <StatusBtn
          title={`${t('ActiveListings')}`}
          changeTab={handleChangeTab}
          className={activeTab === 0 ? 'active-tab' : ''}
          id="0"
        />
        <StatusBtn
          title={`${t('PendingListings')}`}
          changeTab={handleChangePendingTab}
          className={activeTab === 1 ? 'active-tab' : ''}
          id="1"
        />
        <StatusBtn
          title={`${t('TerminatedListings')}`}
          changeTab={handleChangeTerminateTab}
          className={activeTab === 2 ? 'active-tab' : ''}
          id="2"
        />
      </StatusBar>

      <DataTable
        page="listing"
        handleSingleListingModal={handleSingleListingModal}
        handleBulkListingModal={handleBulkListingModal}
        columns={visibleCols}
        dataSource={
          activeListingsType === 'activeTabListings' ? listings : activeListingsType ==='pendingTabListing' ? list:  activeListingsType === 'terminateTypeListing' ? terminateList : searchedArray.length > 0 ? searchedArray : listings
        }
        rowSelection={rowSelection}
        selectedRows={selectedRowKeys.length}
        totalItems={activeListingsType === 'pendingTabListing' ? pending_listings.length : activeListingsType === 'terminateTypeListing' ? terminate_listings.length : listings.length}
        pageSize={5}
        showTableInfo={true}
        current={current}
        onChange={setCurrent}
        pagination={false}
      />
    </Layout>
  );
};
