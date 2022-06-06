import React, { useState, useMemo, useEffect, Fragment, useCallback } from 'react';
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
import { CheckIcon } from '../common/Icons';
import { ListingsAdvancedSearch } from '../../small-components/AdvancedSearchDrawers';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import moment from 'moment';
import {
  getListings,
  getListingsSource,
  getPendingListings,
  getTerminatedListings
} from 'src/redux/listings/listingsThunk';
import { ListingData, PendingListings } from 'src/redux/listings/listingsSlice';
import { ListingsStatusType, useTableSearch } from '../../custom-hooks/useTableSearch';
import { ActiveListing } from 'src/redux/unmap';
import '../../sass/listings.scss';

const { Search } = Input;

export const Listings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [searchTxt, setSearchTxt] = useState<null | string>(null);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<number>(1);
  const { listings, loading } = useAppSelector((state) => state.listings);
  const { pendingListings } = useAppSelector((state) => state.pendingListings);
  const { terminatedListings } = useAppSelector((state) => state.terminatedListings);
  const [tabStatus, setTabStatus] = useState('activeTab');
  const [current, setCurrent] = useState<number>(1);
  const [, setMySelectedRows] = useState<TableDataTypes[]>([]);

  const dispatch = useAppDispatch();

  const [selectedRecordData, setSelectedRecordData] = useState({} as ListingData);

  useEffect(() => {
    dispatch(getListings());
    dispatch(getListingsSource());
    dispatch(getPendingListings());
    dispatch(getTerminatedListings());
  }, [getListings, getListingsSource, getPendingListings, tabStatus]);

  const tableColumns = [
    {
      title: t('Listings.Column.Img'),
      dataIndex: '',
      key: '1',
      visible: tabStatus === 'pendingTab' ? false : true,
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
      visible: true,
      width: 70
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
      visible: tabStatus === 'terminateTypeListing' || tabStatus === 'pendingTabListing' ? false : true
    },
    {
      title: t('Listings.Column.Cost'),
      dataIndex: 'price',
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
      key: '10',
      visible: tabStatus === 'activeTab' ? true : false
    },
    {
      title: t('Listings.Column.Options'),
      dataIndex: 'options',
      key: '11',
      visible: false
    },
    {
      title: t('Listings.Column.CreatedOn'),
      dataIndex: '',
      key: '12',
      render: (record: ActiveListing) => moment(record.createdOn).format('DD-MM-YYYY'),
      visible: false
    }
  ];
  const [columns, setColumns] = useState(tableColumns);

  const handleChangeTab = (e: React.MouseEvent): void => {
    const id = parseInt(e.currentTarget.getAttribute('id')!);
    switch (id) {
    case 1:
      setActiveTab(id);
      setTabStatus('activeTab');
      dispatch(getListings());
      break;
    case 2:
      setActiveTab(id);
      setTabStatus('pendingTab');
      dispatch(getPendingListings());
      break;
    case 3:
      setActiveTab(id);
      setTabStatus('terminatedTab');
      dispatch(getTerminatedListings());
      break;
    default:
      break;
    }
  };

  const dataSource = useCallback(() => {
    switch (tabStatus) {
    case 'activeTab':
      return listings;
    case 'pendingTab':
      return pendingListings;
    case 'terminatedTab':
      return terminatedListings;
    default:
      break;
    }
  }, [tabStatus]);

  const { filteredData } = useTableSearch({ searchTxt, dataSource });

  const onSelectChange = (selectedRowKeys: Key[], selectedRows: TableDataTypes[] | undefined) => {
    setMySelectedRows(selectedRows!);
    setSelectedRowKeys(selectedRowKeys);
    const selectedRow = listings?.filter((r: ListingData) => r.id === selectedRows![0].id)[0];
    setSelectedRecordData(selectedRow);
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
    const cloneColumns = columns.map((col) => {
      if (col.key === e.target.value) {
        return {
          ...col,
          visible: !col.visible
        };
      } else {
        return col;
      }
    });
    localStorage.setItem('cloneCols', JSON.stringify(cloneColumns));
    setColumns(cloneColumns);
  };

  
  const displayCols = () => {
    const cloneCols = localStorage.getItem('cloneCols');
    if (JSON.parse(cloneCols!)?.length) {
      return JSON.parse(cloneCols!)?.map((col: { title: string; dataIndex: string; key: string; visible: boolean }) => (
        <li key={col.key}>
          <Checkbox className="checkbox" checked={col.visible} value={col.key} onChange={handleCheckBox}>
            {col.title}
          </Checkbox>
        </li>
      ));
    } else {
      return columns.map((col) => (
        <li key={col.key}>
          <Checkbox className="checkbox" checked={col.visible} value={col.key} onChange={handleCheckBox}>
            {col.title}
          </Checkbox>
        </li>
      ));
    }
  };
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
                  <ul className="cols-list">{displayCols()}</ul>
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
                <SuccessBtn handleConfirm={handleApplyChanges}>
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
              <EditSingleListing selectedRecordData={selectedRecordData} />
            </PopupModal>
          )}

          <div className="search-options-area">
            <Search autoFocus placeholder="Search....." onChange={(e) => setSearchTxt(e.target.value)} />
            <ListingsAdvancedSearch
              visible={drawerOpen}
              onClose={handleSideDrawer}
              closable
              setSearchTxt={setSearchTxt}
            />
            <TableActionBtns showColumns handleShowColumns={handleClose} handleSideDrawer={handleSideDrawer}>
              {t('AdvancedSearch')}
            </TableActionBtns>
          </div>

          <StatusBar>
            <StatusBtn
              title={`${t('ActiveListings')}`}
              changeTab={handleChangeTab}
              className={activeTab === 1 ? 'active-tab' : ''}
              id="1"
            />
            <StatusBtn
              title={`${t('PendingListings')}`}
              changeTab={handleChangeTab}
              className={activeTab === 2 ? 'active-tab' : ''}
              id="2"
            />
            <StatusBtn
              title={`${t('TerminatedListings')}`}
              changeTab={handleChangeTab}
              className={activeTab === 3 ? 'active-tab' : ''}
              id="3"
            />
          </StatusBar>

          <DataTable
            page="listing"
            isListingsTable={true}
            handleSingleListingModal={handleSingleListingModal}
            handleBulkListingModal={handleBulkListingModal}
            columns={visibleCols}
            dataSource={filteredData as ListingsStatusType[]}
            rowSelection={rowSelection}
            selectedRows={selectedRowKeys.length}
            totalItems={listings.length}
            pageSize={5}
            showTableInfo={true}
            current={current}
            onChange={setCurrent}
            rowClassName="table-row"
            onRow={(record) => {
              return {
                onClick: () => {
                  setSelectedRecordData(record as ListingData);
                  handleSingleListingModal();
                }
              };
            }}
          />
        </Fragment>
      )}
    </Layout>
  );
};
