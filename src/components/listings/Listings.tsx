import React, { useState, useMemo } from 'react';
import { Card, Checkbox, Row, Col, Layout } from 'antd';
import { TableActionBtns } from '../small-components/TableActionBtns';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { DataTable } from '../tables/DataTable';
import '../../sass/light-theme/listings.scss';
import { listingsData } from '../common/ListingsData';
import { Key } from 'antd/lib/table/interface';
import { PopupModal } from '../modals/PopupModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SuccessBtn, CancelBtn } from '../small-components/ActionBtns';
import { EditSingleListing } from '../listings/EditSingleListing';
import { BulkEditListings } from '../listings/BulkEditListings';
import { SearchOptions } from '../small-components/SearchOptions';
import { CheckIcon } from '../common/Icons';

export const Listings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const tableColumns = [
    {
      title: t('Listings.Column.Img'),
      dataIndex: 'img',
      key: 'img',
      visible: false
    },

    {
      title: t('Listings.Column.Item no.'),
      dataIndex: 'itemNo',
      key: 'itemNo',
      visible: true
    },

    {
      title: t('Listings.Column.Source'),
      dataIndex: 'source',
      key: 'source',
      visible: true
    },

    {
      title: t('Listings.Column.Title'),
      dataIndex: 'title',
      key: 'title',
      visible: false
    },

    {
      title: t('Listings.Column.Sell'),
      dataIndex: 'sell',
      key: 'sell',
      visible: true
    },
    {
      title: t('Listings.Column.Cost'),
      dataIndex: 'cost',
      key: 'cost',
      visible: true
    },
    {
      title: t('Listings.Column.Profit'),
      dataIndex: 'profit',
      key: 'profit',
      visible: true
    },
    {
      title: t('Listings.Column.Markup'),
      dataIndex: 'markup',
      key: 'markup',
      visible: false
    },

    {
      title: t('Listings.Column.Stock'),
      dataIndex: 'stock',
      key: 'stock',
      visible: false
    },
    {
      title: t('Listings.Column.Options'),
      dataIndex: 'options',
      key: 'options',
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

  return (
    <Layout className="listings">
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

      <h3 className="listings-title">Listings</h3>
      <div className="search-options-area">
        <SearchOptions visible={drawerOpen} onClose={handleSideDrawer} showSearchInput />
        <TableActionBtns showColumns handleShowColumns={handleClose} handleSideDrawer={handleSideDrawer} />
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
        dataSource={listingsData}
        rowSelection={rowSelection}
        selectedRows={selectedRowKeys.length}
        totalItems={listingsData.length}
      />
    </Layout>
  );
};
