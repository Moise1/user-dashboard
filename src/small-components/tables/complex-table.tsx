//This table will include search, advanced search, columns customization, etc.

import { Layout, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState, useMemo } from 'react';
import { VisibleColumnsPopup } from '../../components/listings/Listings/visible-columns-popup';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import {
  UIPreferencesState,
  UITablePreference,
  UITablePreferenceL
} from '../../redux/ui-preferences/ui-preferences-state-slice';
import { getPreferences, savePreferences } from '../../redux/ui-preferences/ui-preferences-state-thunk';
import { t } from '../../utils/transShim';
import { TableActionBtns } from '../TableActionBtns';
import { DataTable } from './data-table';
import { SmartSearch } from './filter-data';
import { ColumnData, ColumnId } from './types/columns';

interface Props<RecordType> {
  uiIdentifier: string;
  defaultVisibleColumns?: ColumnId[];
  allColumnData: ColumnData<RecordType>[];
  data: RecordType[];
  hideWhenEmpty?: boolean;
  loadingData?: boolean;
  rowSelection?: TableRowSelection<RecordType>;
  onChangeVisibleRows?: (rows: RecordType[]) => void;
  onRow?: (record: RecordType) => { onClick: () => void };
  actionsDropdownMenu?: JSX.Element;

  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChanged?: (itemsPerPage: number) => void;
  pageSizes?: number[];
}
//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const ComplexTable = <RecordType extends object = any>(props: Props<RecordType>) => {
  const {
    uiIdentifier,
    defaultVisibleColumns,
    allColumnData,
    data,
    hideWhenEmpty,
    loadingData,
    rowSelection,
    onChangeVisibleRows,
    onRow,
    actionsDropdownMenu,

    currentPage,
    onPageChange,
    onPageSizeChanged,
    pageSizes
  } = props;
  const dispatch = useAppDispatch();

  //UI----------------------------------------------------------------------------------------}
  const uiPreferencesS = (() => {
    const preferences = useAppSelector((state) => state.UIPreferences as UIPreferencesState)?.tablePreferences?.[
      uiIdentifier
    ];
    return {
      columns: preferences?.columns,
      pageSize: preferences?.pageSize ?? 10,
      pageNumber: currentPage ?? 1,
      loading: preferences?.loading ?? false
    };
  })();

  const [uiPreferences, setUIPreferences] = useState<UITablePreferenceL>(uiPreferencesS);

  useEffect(() => {
    dispatch(getPreferences(uiIdentifier));
  }, [uiIdentifier]);

  useEffect(() => {
    setUIPreferences(uiPreferencesS);
  }, [uiPreferencesS?.columns, uiPreferencesS?.pageSize, uiPreferencesS?.pageNumber]);

  const SaveUIPreferences = (preferences: UITablePreference) => {
    setUIPreferences({ ...preferences, loading: false });
    dispatch(savePreferences({ uiIdentifier, data: preferences }));
  };
  //------------------------------------------------------------------------------------------
  ///POPUP VISIBLE COLUMNS--------------------------------------------------------------------
  const [visibleColumnsPopupOpened, setVisibleColumnsPopupOpened] = useState<boolean>(false);
  const CloseVisibleColumnsPopup = () => setVisibleColumnsPopupOpened(false);
  const OpenVisibleColumnsPopup = () => setVisibleColumnsPopupOpened(true);
  const SaveVisibleColumns = (columns: ColumnId[]) =>
    SaveUIPreferences({ ...{ ...uiPreferences, loading: undefined }, columns });
  //------------------------------------------------------------------------------------------
  ///PAGE SIZE--------------------------------------------------------------------------------
  const OnPageSizeChange = (pageSize: number) => {
    setUIPreferences((prev) => ({ ...prev, pageSize, loading: false }));
    SaveUIPreferences({ ...{ ...uiPreferences, loading: undefined }, pageSize });
    onPageSizeChanged?.(pageSize);
  };
  //------------------------------------------------------------------------------------------
  ///PAGE Number--------------------------------------------------------------------------------
  const OnPageNumberChange = (pageNumber: number) => {
    onPageChange?.(pageNumber);
  };
  //------------------------------------------------------------------------------------------
  //COLUMNS-----------------------------------------------------------------------------------
  const { columns, visibleColumnsList } = /*useMemo*/ (() => {
    const visibleColumnsList =
      !uiPreferences.columns || uiPreferences.columns.length == 0 ? defaultVisibleColumns : uiPreferences.columns;

    const columns = allColumnData
      .filter((x) => !visibleColumnsList || visibleColumnsList.length == 0 || visibleColumnsList.includes(x.id))
      .map((x) => ({ ...x, title: typeof x.title === 'string' ? t(x.title) : x.title, key: x.id.toString() }));

    return {
      columns,
      visibleColumnsList
    };
  })(/*, [uiPreferences, defaultVisibleColumns, allColumnData]*/);
  //------------------------------------------------------------------------------------------

  //OMNISEARCH--------------------------------------------------------------------------------
  const [smartSearch, setSmartSearch] = useState<string | null>(null);
  const OnChangeSmartSearch = (value: string) => setSmartSearch(value);
  //------------------------------------------------------------------------------------------
  //FILTERING DATA----------------------------------------------------------------------------
  //const filteredData = data && omniSearch ? useTableSearch(omniSearch, data) : data;
  const filteredData = useMemo(() => SmartSearch(smartSearch, data, columns), [smartSearch, data, columns]);
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
  //        <Checkbox className='checkbox' checked={col.visible} value={col.key} onChange={handleCheckBox}>
  //          {col.title}
  //        </Checkbox>
  //      </li>
  //    ));
  //  } else {
  //    return columns.map((col) => (
  //      <li key={col.key}>
  //        <Checkbox className='checkbox' checked={col.visible} value={col.key} onChange={handleCheckBox}>
  //          {col.title}
  //        </Checkbox>
  //      </li>
  //    ));
  //  }
  //};

  const loading = loadingData || uiPreferences.loading;

  return (
    <div className="complex-table">
      {visibleColumnsList && (
        <VisibleColumnsPopup
          isVisible={visibleColumnsPopupOpened}
          onClose={CloseVisibleColumnsPopup}
          allColumns={allColumnData}
          visibleColumns={visibleColumnsList}
          onChange={SaveVisibleColumns}
        />
      )}
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
        <Search autoFocus placeholder="Search....." onChange={(e) => OnChangeSmartSearch(e.target.value)} />
        {/*<ListingsAdvancedSearch*/}
        {/*  visible={drawerOpen}*/}
        {/*  onClose={handleSideDrawer}*/}
        {/*  closable*/}
        {/*  setSearchTxt={setSearchTxt}*/}
        {/*/>*/}
        <TableActionBtns
          showColumns={!uiPreferences.loading}
          handleShowColumns={OpenVisibleColumnsPopup}
          handleSideDrawer={() => ({})}
        >
          {t('Table.AdvancedSearch')}
        </TableActionBtns>
      </div>

      {loading && (
        <Layout className="listings-container">
          <Spin />
        </Layout>
      )}
      {!loading && (
        <>
          {(!hideWhenEmpty || data.length > 0) && (
            <DataTable
              page="listing"
              columns={columns}
              dataSource={filteredData}
              totalItems={data.length}
              showTableInfo={true}
              rowClassName="table-row"
              pageSize={uiPreferences.pageSize}
              onPageSizeChanged={OnPageSizeChange}
              onPageChange={OnPageNumberChange}
              currentPage={currentPage}
              pageSizes={pageSizes}
              rowSelection={rowSelection}
              onChangeVisibleRows={onChangeVisibleRows}
              actionsDropdownMenu={actionsDropdownMenu}
              onRow={onRow}
            />
          )}
        </>
      )}
    </div>
  );
};
