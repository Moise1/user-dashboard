import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { Card, Checkbox, Row, Col, Layout, Input, Spin } from 'antd';
import { TableActionBtns } from '../../small-components/TableActionBtns';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { DataTable, TableDataTypes } from '../tables/DataTable';
import { Key } from 'antd/lib/table/interface';
import { PopupModal } from '../modals/PopupModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SuccessBtn, CancelBtn } from '../../small-components/ActionBtns';
import { EditSingleListing } from '../listings/EditSingleListing';
import { BulkEditListings } from '../listings/BulkEditListings';
// import { SearchOptions } from '../../small-components/SearchOptions';
import { CheckIcon } from '../common/Icons';
import { ListingsAdvancedSearch } from '../../small-components/AdvancedSearchDrawers';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {
  getListings,
  getListingsSource,
  getPendingListing,
  getTerminateListings
} from 'src/redux/listings/listingsThunk';
import { ListingData, PendingListings, TerminatedListings } from 'src/redux/listings/listingsSlice';
import moment from 'moment';
import '../../sass/listings.scss';

export const Listings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [, setSearchFilterKey] = useState<Key[]>([]);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<number>(0);
  const { listings, loading } = useAppSelector((state) => state.listings);
  const { pending_listings } = useAppSelector((state) => state.pendingListings);
  const { terminate_listings } = useAppSelector((state) => state.terminateListings);
  const [activeListingsType, setActiveListingsType] = useState('activeTabListings');
  const [listPending, setPendingList] = useState([]);

  const [terminatedList, setTerminatedList] = useState([]);
  const [current, setCurrent] = useState<number>(1);
  const [searchedArray, setSearchedArray] = useState([]);
  const [, setMySelectedRows] = useState<TableDataTypes[]>([]);

  const dispatch = useAppDispatch();

  const [singleRecordData, setSingleRecordData] = useState({} as ListingData);
  const [_, setDataRender] = useState(false);

  useEffect(() => {
    dispatch(getListings());
    dispatch(getListingsSource());
    dispatch(getPendingListing());
    dispatch(getTerminateListings());

    setPendingList(
      pending_listings.length &&
        pending_listings.map((item: PendingListings) => ({
          ...item,
          createdOn: moment(item.createdOn).format('DD/MM/YY/ hh:mm')
        }))
    );

    setTerminatedList(
      terminate_listings.length &&
        terminate_listings.map((item: TerminatedListings) => ({
          ...item,
          createdOn: moment(item.createdOn).format('DD/MM/YY/ hh:mm')
        }))
    );
  }, [getListings, getListingsSource, getPendingListing, activeListingsType]);

  const tableColumns = [
    {
      title: t('Listings.Column.Img'),
      dataIndex: '',
      key: '1',
      visible: activeListingsType === 'pendingTabListing' ? false : true,
      render: (record: PendingListings) => (
        <div className="img-container">
          {record.imageUrl ? <img src={record.imageUrl} alt="image" className="record-img" /> : 'N/A'}
        </div>
      )
    },

    {
      title: t('Listings.Column.Source'),
      dataIndex: 'sourcePath',
      key: '2',
      visible: true
    },
    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'id',
      key: '3',
      visible: true
    },

    {
      title: t('Listings.Column.Title'),
      dataIndex: 'title',
      key: '4',
      visible: false
    },
    {
      title: t('Listings.Column.Sell'),
      dataIndex: 'sell',
      key: '5',
      visible:
        activeListingsType === 'terminateTypeListing' || activeListingsType === 'pendingTabListing' ? false : true
    },
    {
      title: t('Listings.Column.Cost'),
      dataIndex: 'cost',
      key: '6',
      visible: true
    },
    {
      title: t('Listings.Column.Profit'),
      dataIndex: 'profit',
      key: '7',
      visible: true
    },
    {
      title: t('Listings.Column.Markup'),
      dataIndex: 'markup',
      key: '9',
      visible: false
    },
    {
      title: t('Listings.Column.Stock'),
      dataIndex: 'stock',
      key: '9',
      visible: activeListingsType === 'activeTabListings' ? true : false
    },
    {
      title: t('Listings.Column.Options'),
      dataIndex: 'options',
      key: '10',
      visible: false
    }
  ];
  const [columns, setColumns] = useState(tableColumns);

  const handleChangeTab = (e: React.MouseEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setActiveListingsType('activeTabListings');
    dispatch(getListings());
  };

  const handleChangePendingTab = (e: React.MouseEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setActiveListingsType('pendingTabListing');
    setDataRender((prev) => !prev);
    dispatch(getPendingListing());
  };

  const handleChangeTerminateTab = (e: React.MouseEvent): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
    setActiveListingsType('terminateTypeListing');
    dispatch(getTerminateListings());
  };

  const onSelectChange = (selectedRowKeys: Key[], selectedRows: TableDataTypes[] | undefined) => {
    setMySelectedRows(selectedRows!);
    setSelectedRowKeys(selectedRowKeys);
    const selectedRow = listings.filter((r: ListingData) => r.id === selectedRows![0].id)[0];
    setSingleRecordData(selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
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

  const handleCheckBox = (e: CheckboxChangeEvent): void => {
    const cloneColumns = tableColumns.map((col) => {
      if (col.key === e.target.value) {
        return { ...col, visible: e.target.checked };
      } else {
        return col;
      }
    });
    setColumns(cloneColumns);
  };

  useEffect(() => {
    setSearchedArray(listings.filter((e: ListingData) => e.id === Number(searchKey)));
    setSearchFilterKey(listings.filter((e: ListingData) => e.id === Number(searchKey)));
  }, [listings, searchKey]);

  return (
    <Layout className="listings-container">
      {loading ? (
        <Spin />
      ) : (
        <Fragment>
          <PopupModal open={showColumns} handleClose={handleClose} width={900}>
            <h5 className="cols-display-title">Select columns to display</h5>
            <p className="description">Display columns in the listing table that suit your interests.</p>
            <Card className="listings-card">
              <Row className="listings-cols">
                <Col>
                  <ul className="cols-list">
                    {tableColumns.map((col) => (
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
            {/* <SearchOptions showSearchInput /> */}
            <Input
              autoFocus
              placeholder="Search....."
              onChange={(e) => {
                setSearchKey(e.target.value ? e.target.value : '');
              }}
            />
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
            isListingsTable={true}
            handleSingleListingModal={handleSingleListingModal}
            handleBulkListingModal={handleBulkListingModal}
            columns={visibleCols}
            dataSource={
              activeListingsType === 'activeTabListings'
                ? listings
                : activeListingsType === 'pendingTabListing'
                  ? listPending
                  : activeListingsType === 'terminateTypeListing'
                    ? terminatedList
                    : searchedArray.length > 0
                      ? searchedArray
                      : listings
            }
            rowSelection={rowSelection}
            selectedRows={selectedRowKeys.length}
            totalItems={
              activeListingsType === 'pendingTabListing'
                ? pending_listings.length
                : activeListingsType === 'terminateTypeListing'
                  ? terminate_listings.length
                  : listings.length
            }
            pageSize={5}
            showTableInfo={true}
            current={current}
            onChange={setCurrent}
          />
        </Fragment>
      )}
    </Layout>
  );
};
