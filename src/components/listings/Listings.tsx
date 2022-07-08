import React, { useState, useEffect, Fragment } from 'react';
import { Card, Row, Layout, Spin } from 'antd';
import { TableActionBtns } from '../../small-components/TableActionBtns';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { PopupModal } from '../modals/PopupModal';
import { SuccessBtn, CancelBtn } from '../../small-components/ActionBtns';
import { CheckIcon } from '../common/Icons';
//import { ListingsAdvancedSearch } from '../../small-components/AdvancedSearchDrawers';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';

import {
  getListings,
  //getListingsSource,
  getPendingListings,
  getTerminatedListings
} from 'src/redux/listings/listingsThunk';
import { ActiveListing, ListingsState, PendingListing, TerminatedListings } from 'src/redux/listings/listingsSlice';
//import { useTableSearch } from '../../custom-hooks/useTableSearch';
import '../../sass/listings.scss';
import { ListNow } from '../list-now/ListNow';
import { ReactUtils } from '../../utils/react-utils';
import { DataTable } from '../tables/DataTable';
import { useRouteMatch } from 'react-router-dom';
import { Links } from '../../links';
import { ActiveListingsColumns } from './Columns/active-columns';
import { ColumnData, ListingsColumns, TableColumnId } from './Columns/columns';
import { PendingListingsColumns } from './Columns/pending-columns';
import { TerminatedListingsColumns } from './Columns/terminated-columns';

type ListingT = ActiveListing | PendingListing | TerminatedListings;//TODO: This is a disaster but I am tired of fixing all your type mess
enum ListingTab {
  active, pending, terminated, import
}

export const Listings = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();

  const [listingsPerPage, setListingsPerPage] = useState<number>(10);
  //const { Search } = Input;

  //const [selectedRowKeys, setSelectedRowKeys] = useState<DataTableKey[]>([]);
  //const [searchTxt, setSearchTxt] = useState<null | string>(null);
  const [showColumns, setShowColumns] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [bulkEditOpen, setBulkEditOpen] = useState<boolean>(false);
  const [singleEditOpen, setSingleEditOpen] = useState<boolean>(false);


  const tab = (() => {
    if (useRouteMatch(Links.ProductsPending))
      return ListingTab.pending;
    if (useRouteMatch(Links.ProductsTerminated))
      return ListingTab.terminated;
    //if (useRouteMatch(Links.ProductsImport))
    //return ListingTab.import;
    return ListingTab.active;
  })();

  const { listings, loading } = (() => {
    const { activeListings, loadingActive, terminatedListings, pendingListings, loadingPending, loadingTerminated } = useAppSelector((state) => state.listings as ListingsState);
    switch (tab) {
      default:
      case ListingTab.active:
        return { listings: activeListings as ListingT[], loading: loadingActive };
      case ListingTab.pending:
        return { listings: pendingListings as ListingT[], loading: loadingPending };
      case ListingTab.terminated:
        return { listings: terminatedListings as ListingT[], loading: loadingTerminated };
    }
  })();
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [, setMySelectedRows] = useState<ListingT[]>([]);

  const dispatch = useAppDispatch();

  //const [selectedRecordData, setSelectedRecordData] = useState({} as ListingT);

  useEffect(() => {
    switch (tab) {
      case ListingTab.active:
        dispatch(getListings());
        break;
      case ListingTab.pending:
        dispatch(getPendingListings());
        break;
      case ListingTab.terminated:
        dispatch(getTerminatedListings());
        break;
    }
  }, [getPendingListings, getTerminatedListings, getListings, selectedChannel?.id]);

  useEffect(() => {
    if (listings)
      return;
    switch (tab) {
      case ListingTab.active:
        dispatch(getListings());
        break;
      case ListingTab.pending:
        dispatch(getPendingListings());
        break;
      case ListingTab.terminated:
        dispatch(getTerminatedListings());
        break;
    }
  }, [tab]);

  //const history = useHistory();
  const handleChangeTab = (e: React.MouseEvent): void => {
    console.log(e);
    //switch (parseInt(e.currentTarget.getAttribute('id') ?? '0')) {
    //  default:
    //  case ListingTab.active:
    //    history.push(Links.Products);
    //    dispatch(getListings());
    //    break;
    //  case ListingTab.pending:
    //    history.push(Links.ProductsPending);
    //    dispatch(getPendingListings());
    //    break;
    //  case ListingTab.terminated:
    //    history.push(Links.ProductsTerminated);
    //    dispatch(getTerminatedListings());
    //    break;
    //}
  };

  //const onSelectChange = (selectedRowKeys: DataTableKey[], selectedRows: ListingT[] | undefined) => {
  //  setMySelectedRows(selectedRows!);
  //  setSelectedRowKeys(selectedRowKeys);
  //  const selectedRow = (listings as (ActiveListing | PendingListing)[])?.filter(x => x.id === selectedRows![0].id)[0];
  //  setSelectedRecordData(selectedRow);
  //};

  //const rowSelection = {
  //  selectedRowKeys,
  //  onChange: onSelectChange
  //};

  const handleClose = () => {
    //setColumns(tableColumns);
    setShowColumns(!showColumns);
  };

  const handleApplyChanges = () => setShowColumns(!showColumns);

  const handleCancelChanges = () => {
    //setColumns(tableColumns);
    setShowColumns(!showColumns);
  };

  const columns = (() => {
    const GetColumns = (cs: ColumnData[], ids: TableColumnId[]) => ListingsColumns.filter(x => ids.includes(x.id)).map(x => ({ ...x, title: t(x.title), key: x.id.toString() }));

    switch (tab) {
      default:
      case ListingTab.active:
        return GetColumns(ListingsColumns, ActiveListingsColumns);
      case ListingTab.pending:
        return GetColumns(ListingsColumns, PendingListingsColumns);
      case ListingTab.terminated:
        return GetColumns(ListingsColumns, TerminatedListingsColumns);
    }
  }) ();

  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const handleSingleListingModal = () => setSingleEditOpen(!singleEditOpen);
  const handleBulkListingModal = () => setBulkEditOpen(!bulkEditOpen);

  //const handleCheckBox = (e: CheckboxChangeEvent): void => {
  //  const cloneColumns = columns.map((col) => {
  //    if (col.key === e.target.value) {
  //      return {
  //        ...col,
  //        visible: !col.visible
  //      };
  //    } else {
  //      return col;
  //    }
  //  });
  //  localStorage.setItem('cloneCols', JSON.stringify(cloneColumns));
  //  //setColumns(cloneColumns);
  //};

  //const displayCols = () => {
  //  const cloneCols = localStorage.getItem('cloneCols');
  //  if (JSON.parse(cloneCols!)?.length) {
  //    return JSON.parse(cloneCols!)?.map((col: { title: string; dataIndex: string; key: string; visible: boolean }) => (
  //      <li key={col.key}>
  //        <Checkbox className="checkbox" checked={col.visible} value={col.key} onChange={handleCheckBox}>
  //          {col.title}
  //        </Checkbox>
  //      </li>
  //    ));
  //  } else {
  //    return columns.map((col) => (
  //      <li key={col.key}>
  //        <Checkbox className="checkbox" checked={col.visible} value={col.key} onChange={handleCheckBox}>
  //          {col.title}
  //        </Checkbox>
  //      </li>
  //    ));
  //  }
  //};

  const filteredData = listings /*? useTableSearch(searchTxt, () => listings) : listings*/;
  console.log('0tx');
  return (
    <Layout className="listings-container">
      <Fragment>
        <PopupModal open={showColumns} handleClose={handleClose} width={900}>
          <h5 className="cols-display-title">Select columns to display</h5>
          <p className="description">Display columns in the listing table that suit your interests.</p>
          <Card className="listings-card">
            <Row className="listings-cols">
              {/*<Col>
                <ul className="cols-list">{displayCols()}</ul>
              </Col>
              <Col>
                <div className="cols-amount">
                  <p>Amount of columns on your listings table</p>
                    <h3>{visibleCols.length}</h3>
                </div>
              </Col>*/}
            </Row>
            <div className="show-columns-action-btns">
              <CancelBtn handleClose={handleCancelChanges}>{t('Button.Cancel')}</CancelBtn>
              <SuccessBtn handleConfirm={handleApplyChanges}>
                <CheckIcon />
                {t('Button.ApplyChanges')}
              </SuccessBtn>
            </div>
          </Card>
        </PopupModal>
        {/*
        {selectedRowKeys.length > 1 ? (
          <PopupModal open={bulkEditOpen} width={900} handleClose={handleBulkListingModal}>
            <BulkEditListings selectedItems={selectedRowKeys.length} />
          </PopupModal>
        ) : (
          <PopupModal open={singleEditOpen} width={900} handleClose={handleSingleListingModal}>
            <EditSingleListing selectedRecordData={selectedRecordData as ActiveListing} />
          </PopupModal>
        )}
        */}

        <div className="search-options-area">
          {/*<Search autoFocus placeholder="Search....." onChange={(e) => setSearchTxt(e.target.value)} />
          <ListingsAdvancedSearch
            visible={drawerOpen}
            onClose={handleSideDrawer}
            closable
            setSearchTxt={setSearchTxt}
          />*/}
          <TableActionBtns showColumns handleShowColumns={handleClose} handleSideDrawer={handleSideDrawer}>
            {t('Table.AdvancedSearch')}
          </TableActionBtns>
        </div>

        <StatusBar>
          <StatusBtn
            title={`${t('ActiveListings')}`}
            changeTab={handleChangeTab}
            className={tab === ListingTab.active ? 'active-tab' : ''}
            id={ListingTab.active.toString()}
          />
          <StatusBtn
            title={`${t('PendingListings')}`}
            changeTab={handleChangeTab}
            className={tab === ListingTab.pending ? 'active-tab' : ''}
            id={ListingTab.pending.toString()}
          />
          <StatusBtn
            title={`${t('TerminatedListings')}`}
            changeTab={handleChangeTab}
            className={tab === ListingTab.terminated ? 'active-tab' : ''}
            id={ListingTab.terminated.toString() }
          />
        </StatusBar>

        {loading && (
          <Layout className="listings-container">
            <Spin />
          </Layout>
        )}
        {!loading && <>
          {(listings?.length ?? 0) > 0 &&
            <DataTable
              page="listing"
              isListingsTable={true}
              handleSingleListingModal={handleSingleListingModal}
              handleBulkListingModal={handleBulkListingModal}
              columns={columns}
              dataSource={filteredData as ListingT[]}
              //rowSelection={rowSelection}
              //selectedRows={selectedRowKeys.length}
              totalItems={listings?.length}
              pageSize={listingsPerPage}
              setListingsPerPage={setListingsPerPage}
              showTableInfo={true}
              current={currentPage}
              onChange={setCurrentPage}
              rowClassName="table-row"
              //onRow={(record) => {
              //  return {
              //    onClick: () => {
              //      //setSelectedRecordData(record);
              //      handleSingleListingModal();
              //    }
              //  };
              //}}
            />
          }
          {tab == ListingTab.active && listings?.length == 0 && <ListNow />}
        </>}
      </Fragment>
    </Layout>
  );
};