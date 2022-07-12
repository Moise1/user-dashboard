import React, { useEffect, Fragment, useState } from 'react';
import { Layout, Spin } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {
  getListings,
  getPendingListings,
  getTerminatedListings
} from 'src/redux/listings/listingsThunk';
import { ActiveListing, ListingsState, PendingListing, TerminatedListings } from 'src/redux/listings/listingsSlice';
import '../../sass/listings.scss';
import '../../sass/tables/complex-table.scss';
import { ListNow } from '../list-now/ListNow';
import { ReactUtils } from '../../utils/react-utils';
import { DataTable } from '../../small-components/tables/data-table';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Links } from '../../links';
import { ActiveListingsColumns, ActiveListingsColumnsVisibleByDefault } from './Listings/active-columns';
import { ColumnData, ListingsColumns, TableColumnId } from './Listings/columns';
import { PendingListingsColumns } from './Listings/pending-columns';
import { TerminatedListingsColumns } from './Listings/terminated-columns';
import { TableActionBtns } from '../../small-components/TableActionBtns';
import { VisibleColumnsPopup } from './Listings/visible-columns-popup';
import { getActiveListingsPreferences, getPendingListingsPreferences, getTerminatedListingsPreferences, saveActiveListingsPreferences, savePendingListingsPreferences, saveTerminatedListingsPreferences } from '../../redux/ui-preferences/ui-preferences-state-thunk';
import { UIPreferencesState, UITablePreference, UITablePreferenceL } from '../../redux/ui-preferences/ui-preferences-state-slice';
import Search from 'antd/lib/input/Search';

type ListingT = ActiveListing | PendingListing | TerminatedListings;//TODO: This is a disaster but I am tired of fixing all your type mess
enum ListingTab {
  active, pending, terminated, import
}

export const Listings = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const dispatch = useAppDispatch();

  //TAB--------------------------------------------------------------------------------------
  const tab = (() => {
    if (useRouteMatch(Links.ProductsPending))
      return ListingTab.pending;
    if (useRouteMatch(Links.ProductsTerminated))
      return ListingTab.terminated;
    //if (useRouteMatch(Links.ProductsImport))
    //return ListingTab.import;
    return ListingTab.active;
  })();
  //------------------------------------------------------------------------------------------


  //UI----------------------------------------------------------------------------------------}
  const uiPreferencesS = (() => {
    const { activeListingsPreferences, pendingListingsPreferences, terminatedListingsPreferences } = useAppSelector((state) => state.UIPreferences as UIPreferencesState);

    switch (tab) {
      default:
      case ListingTab.active:
        return { columns: activeListingsPreferences?.columns, pageSize: activeListingsPreferences?.pageSize ?? 10 , loading: activeListingsPreferences?.loading ?? false };
      case ListingTab.pending:
        return { columns: pendingListingsPreferences?.columns, pageSize: pendingListingsPreferences?.pageSize ?? 10, loading: pendingListingsPreferences?.loading ?? false };
      case ListingTab.terminated:
        return { columns: terminatedListingsPreferences?.columns, pageSize: terminatedListingsPreferences?.pageSize ?? 10 , loading: terminatedListingsPreferences?.loading ?? false };
    }
  })();

  const [uiPreferences, setUIPreferences] = useState<UITablePreferenceL>(uiPreferencesS);
  useEffect(() => {
    setUIPreferences(uiPreferencesS);
  }, [uiPreferencesS?.columns, uiPreferencesS?.pageSize]);

  const SaveUIPreferences = (preferences: UITablePreference) => {
    setUIPreferences({ ...preferences, loading: false });
    switch (tab) {
      case ListingTab.active:
        dispatch(saveActiveListingsPreferences(preferences));
        break;
      case ListingTab.pending:
        dispatch(savePendingListingsPreferences(preferences));
        break;
      case ListingTab.terminated:
        dispatch(saveTerminatedListingsPreferences(preferences));
        break;
    }
  };

  ///POPUP VISIBLE COLUMNS--------------------------------------------------------------------
  const [visibleColumnsPopupOpened, setVisibleColumnsPopupOpened] = useState<boolean>(false);
  const CloseVisibleColumnsPopup = () => setVisibleColumnsPopupOpened(false);
  const OpenVisibleColumnsPopup = () => setVisibleColumnsPopupOpened(true);
  const SaveVisibleColumns = (columns: TableColumnId[]) => SaveUIPreferences({ ...{ ...uiPreferences, loading: undefined }, columns });
  //------------------------------------------------------------------------------------------
  ///PAGE SIZE--------------------------------------------------------------------------------
  const OnPageSizeChange = (pageSize: number) => SaveUIPreferences({ ...{ ...uiPreferences, loading: undefined }, pageSize });
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------


  //COLUMNS AND DATA--------------------------------------------------------------------------

  
  const { listings, loading } = (() => {
    const { activeListings, loadingActive, terminatedListings, pendingListings, loadingPending, loadingTerminated } = useAppSelector((state) => state.listings as ListingsState);

    switch (tab) {
      default:
      case ListingTab.active:
        return { listings: activeListings as ListingT[], loading: loadingActive || uiPreferences.loading };
      case ListingTab.pending:
        return { listings: pendingListings as ListingT[], loading: loadingPending };
      case ListingTab.terminated:
        return { listings: terminatedListings as ListingT[], loading: loadingTerminated };
    }
  })();

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
  }, [getPendingListings, getTerminatedListings, getListings, getActiveListingsPreferences, selectedChannel?.id]);

  useEffect(() => {
    if (uiPreferences)
      return;

    switch (tab) {
      case ListingTab.active:
        dispatch(getActiveListingsPreferences());
        break;
      case ListingTab.pending:
        dispatch(getPendingListingsPreferences());
        break;
      case ListingTab.terminated:
        dispatch(getTerminatedListingsPreferences());
        break;
    }
  }, [tab]);

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

  const history = useHistory();
  const handleChangeTab = (e: React.MouseEvent): void => {
    switch (parseInt(e.currentTarget.getAttribute('id') ?? '0')) {
      default:
      case ListingTab.active:
        history.push(Links.Products);
        break;
      case ListingTab.pending:
        history.push(Links.ProductsPending);
        break;
      case ListingTab.terminated:
        history.push(Links.ProductsTerminated);
        break;
    }
  };

  const { columns, allColumnsList, visibleColumnsList } = (() => {

    const GetColumns = (cs: ColumnData[], ids: TableColumnId[], visibleColumns?: TableColumnId[]) => (
      {
        columns: cs
          .filter(x => ids.includes(x.id) && (!visibleColumns || visibleColumns.length == 0 || visibleColumns.includes(x.id)))
          .map(x => ({ ...x, title: t(x.title), key: x.id.toString() })),
        allColumnsList: ids,
        visibleColumnsList: visibleColumns
      }
    );

    switch (tab) {
      default:
      case ListingTab.active: {
        const vc = (!uiPreferences.columns || uiPreferences.columns.length == 0) ? ActiveListingsColumnsVisibleByDefault : uiPreferences.columns;
        return GetColumns(ListingsColumns, ActiveListingsColumns, vc);
      }
      case ListingTab.pending: {
        const vc = (!uiPreferences.columns || uiPreferences.columns.length == 0) ? PendingListingsColumns : uiPreferences.columns;
        return GetColumns(ListingsColumns, PendingListingsColumns, vc);
      }
      case ListingTab.terminated: {
        const vc = (!uiPreferences.columns || uiPreferences.columns.length == 0) ? TerminatedListingsColumns : uiPreferences.columns;
        return GetColumns(ListingsColumns, TerminatedListingsColumns, vc);
      }
    }

  })();
  //------------------------------------------------------------------------------------------

  //FILTERING DATA----------------------------------------------------------------------------
  const filteredData = listings /*? useTableSearch(searchTxt, () => listings) : listings*/;
  //------------------------------------------------------------------------------------------

  //const { filteredData } = useTableSearch({ searchTxt, listings });

  //const onSelectChange = (selectedRowKeys: DataTableKey[], selectedRows: ListingsT[] | undefined) => {
  //  setMySelectedRows(selectedRows!);
  //  setSelectedRowKeys(selectedRowKeys);
  //  const selectedRow = listings?.filter((r: ListingData) => r.id === selectedRows![0].id)[0];
  //  setSelectedRecordData(selectedRow);
  //};

  //const rowSelection = {
  //  selectedRowKeys,
  //  onChange: onSelectChange
  //};

  //const handleClose = () => {
  //  //setColumns(tableColumns);
  //  setShowColumns(!showColumns);
  //};

  //const handleApplyChanges = () => setShowColumns(!showColumns);

  //const handleCancelChanges = () => {
  //  //setColumns(tableColumns);
  //  setShowColumns(!showColumns);
  //};

  //const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  //const handleSingleListingModal = () => setSingleEditOpen(!singleEditOpen);
  //const handleBulkListingModal = () => setBulkEditOpen(!bulkEditOpen);

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

  const OnChangeOmniSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Layout className="listings-container">
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
          id={ListingTab.terminated.toString()}
        />
      </StatusBar>
      <Fragment>
        <div className="complex-table">
          {visibleColumnsList &&
            <VisibleColumnsPopup
              isVisible={visibleColumnsPopupOpened}
              onClose={CloseVisibleColumnsPopup}
              allColumns={allColumnsList}
              visibleColumns={visibleColumnsList}
              onChange={SaveVisibleColumns}
            />
          }
          {/*{selectedRowKeys.length > 1 ? (*/}
          {/*  <PopupModal open={bulkEditOpen} width={900} handleClose={handleBulkListingModal}>*/}
          {/*    <BulkEditListings selectedItems={selectedRowKeys.length} />*/}
          {/*  </PopupModal>*/}
          {/*) : (*/}
          {/*  <PopupModal open={singleEditOpen} width={900} handleClose={handleSingleListingModal}>*/}
          {/*    <EditSingleListing selectedRecordData={selectedRecordData} />*/}
          {/*  </PopupModal>*/}
          {/*)}*/}

          <div className="search-options-area">
            <Search autoFocus placeholder="Search....." onChange={(e) => OnChangeOmniSearch(e.target.value)} />
            {/*<ListingsAdvancedSearch*/}
            {/*  visible={drawerOpen}*/}
            {/*  onClose={handleSideDrawer}*/}
            {/*  closable*/}
            {/*  setSearchTxt={setSearchTxt}*/}
            {/*/>*/}
            <TableActionBtns showColumns={!uiPreferences.loading} handleShowColumns={OpenVisibleColumnsPopup} handleSideDrawer={() => ({})}>
              {t('Table.AdvancedSearch')}
            </TableActionBtns>
          </div>

          {loading && (
            <Layout className="listings-container">
              <Spin />
            </Layout>
          )}
          {!loading && <>
            {(tab != ListingTab.active || (listings?.length ?? 0) > 0) &&
              <DataTable
                page="listing"
                isListingsTable={true}
                columns={columns}
                dataSource={filteredData as ListingT[]}
                totalItems={listings?.length}
                showTableInfo={true}
                rowClassName="table-row"
                pageSize={uiPreferences.pageSize}
                onPageSizeChanged={OnPageSizeChange}
              />
            }
            {tab == ListingTab.active && listings?.length == 0 && <ListNow />}
          </>}
        </div>
      </Fragment>
    </Layout>
  );
};