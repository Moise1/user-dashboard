/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Checkbox, Row, Col, Layout, Input } from 'antd';
import { TableActionBtns } from '../small-components/TableActionBtns';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { DataTable } from '../tables/DataTable';
import { ListingData } from '../../redux/listings/listingsSlice';
import { Key } from 'antd/lib/table/interface';
import { PopupModal } from '../modals/PopupModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SuccessBtn, CancelBtn } from '../small-components/ActionBtns';
import { EditSingleListing } from '../listings/EditSingleListing';
import { BulkEditListings } from '../listings/BulkEditListings';
import { CheckIcon } from '../common/Icons';
import { ListingsAdvancedSearch } from '../small-components/AdvancedSearchDrawers';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { getListings, getListingsSource } from 'src/redux/listings/listingsThunk';
import '../../sass/listings.scss';
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
  const { listingSources } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // console.log({ listings });
  // console.log('the state', listingSources);

  const [source, setSource] = useState([]);
  const [searchedArray, setSearchedArray] = useState([]);
  useEffect(() => {
    dispatch(getListings());
    dispatch(getListingsSource());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = listingSources?.sourceListings.length && listingSources?.sourceListings.map((item: any) => item.name);
    setSource(t);
    // console.log('yes', t);
  }, [getListings, getListingsSource]);

  const tableColumns = [
    {
      title: t('Listings.Column.Img'),
      dataIndex: 'img',
      key: '1',
      visible: false
    },

    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'id',
      key: '2',
      visible: true
    },

    {
      title: t('Listings.Column.Source'),
      dataIndex: 'source',
      key: '3',
      visible: true
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
      visible: true
    },
    {
      title: t('Listings.Column.Profit'),
      dataIndex: 'price',
      key: '7',
      visible: true
    },
    {
      title: t('Listings.Column.Markup'),
      dataIndex: 'sourceId',
      key: '8',
      visible: true
    },

    {
      title: t('Listings.Column.Stock'),
      dataIndex: 'sourceQuantity',
      key: '9',
      visible: true
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
  };

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
    console.log(e.target.checked);
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
          <EditSingleListing />
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
          changeTab={handleChangeTab}
          className={activeTab === 1 ? 'active-tab' : ''}
          id="1"
        />
        <StatusBtn
          title={`${t('TerminatedListings')}`}
          changeTab={handleChangeTab}
          className={activeTab === 2 ? 'active-tab' : ''}
          id="2"
        />
      </StatusBar>

      <DataTable
        page="listing"
        handleSingleListingModal={handleSingleListingModal}
        handleBulkListingModal={handleBulkListingModal}
        columns={visibleCols}
        dataSource={searchedArray.length > 0 ? searchedArray : listings}
        rowSelection={rowSelection}
        selectedRows={selectedRowKeys.length}
        totalItems={listings.length}
        pageSize={5}
        showTableInfo={true}
        current={current}
        onChange={setCurrent}
        pagination={false}
      />
    </Layout>
  );
};
