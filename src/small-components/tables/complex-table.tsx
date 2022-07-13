//This table will include search, advanced search, columns customization, etc.

import { Layout, Spin } from 'antd';
import Search from 'antd/lib/input/Search';
import { useEffect, useState } from 'react';
import { VisibleColumnsPopup } from '../../components/listings/Listings/visible-columns-popup';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { UIPreferencesState, UITablePreference, UITablePreferenceL } from '../../redux/ui-preferences/ui-preferences-state-slice';
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
  columnList: ColumnId[];
  data: RecordType[],
  hideWhenEmpty?: boolean;
  loadingData?: boolean;
}

export const ComplexTable = <RecordType extends Record<string, unknown>>(props: Props<RecordType>) => {
  const { uiIdentifier, defaultVisibleColumns, allColumnData, columnList, data, hideWhenEmpty, loadingData } = props;
  const dispatch = useAppDispatch();

  //UI----------------------------------------------------------------------------------------}
  const uiPreferencesS = (() => {
    const preferences = useAppSelector((state) => state.UIPreferences as UIPreferencesState)?.tablePreferences?.[uiIdentifier];
    return { columns: preferences?.columns, pageSize: preferences?.pageSize ?? 10, loading: preferences?.loading ?? false };
  })();

  const [uiPreferences, setUIPreferences] = useState<UITablePreferenceL>(uiPreferencesS);

  useEffect(() => {
    dispatch(getPreferences(uiIdentifier));
  }, [uiIdentifier]);

  useEffect(() => {
    setUIPreferences(uiPreferencesS);
  }, [uiPreferencesS?.columns, uiPreferencesS?.pageSize]);


  const SaveUIPreferences = (preferences: UITablePreference) => {
    setUIPreferences({ ...preferences, loading: false });
    dispatch(savePreferences({ uiIdentifier, data: preferences }));
  };
  //------------------------------------------------------------------------------------------
  ///POPUP VISIBLE COLUMNS--------------------------------------------------------------------
  const [visibleColumnsPopupOpened, setVisibleColumnsPopupOpened] = useState<boolean>(false);
  const CloseVisibleColumnsPopup = () => setVisibleColumnsPopupOpened(false);
  const OpenVisibleColumnsPopup = () => setVisibleColumnsPopupOpened(true);
  const SaveVisibleColumns = (columns: ColumnId[]) => SaveUIPreferences({ ...{ ...uiPreferences, loading: undefined }, columns });
  //------------------------------------------------------------------------------------------
  ///PAGE SIZE--------------------------------------------------------------------------------
  const OnPageSizeChange = (pageSize: number) => SaveUIPreferences({ ...{ ...uiPreferences, loading: undefined }, pageSize });
  //------------------------------------------------------------------------------------------
  //COLUMNS-----------------------------------------------------------------------------------
  const { columns, allVisibleColumns, allColumnsList, visibleColumnsList } = (() => {

    const allColumns = columnList.map(x => allColumnData.find(y => y.id == x)).filter(x => !!x) as ColumnData<RecordType>[];
    const visibleColumnsList = (!uiPreferences.columns || uiPreferences.columns.length == 0) ? defaultVisibleColumns : uiPreferences.columns;

    const columns = allColumns
      .filter(x => columnList.includes(x.id) && (!visibleColumnsList || visibleColumnsList.length == 0 || visibleColumnsList.includes(x.id)))
      .map(x => ({ ...x, title: typeof(x.title) === 'string' ? t(x.title) : x.title, key: x.id.toString() }));

    return {
      columns,
      allVisibleColumns: allColumns.filter(x => !!columns.find(y => y.id == x.id)),
      allColumnsList: columnList,
      visibleColumnsList
    };

  })();
  //------------------------------------------------------------------------------------------

  //OMNISEARCH--------------------------------------------------------------------------------
  const [smartSearch, setSmartSearch] = useState<string | null>(null);
  const OnChangeSmartSearch = (value: string) => setSmartSearch(value);
  //------------------------------------------------------------------------------------------
  //FILTERING DATA----------------------------------------------------------------------------
  //const filteredData = data && omniSearch ? useTableSearch(omniSearch, data) : data;
  const filteredData = SmartSearch(smartSearch, data, allVisibleColumns);
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
    <div className='complex-table'>
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

      <div className='search-options-area'>
        <Search autoFocus placeholder='Search.....' onChange={(e) => OnChangeSmartSearch(e.target.value)} />
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
        <Layout className='listings-container'>
          <Spin />
        </Layout>
      )}
      {!loading && <>
        {(!hideWhenEmpty || data.length > 0) &&
          <DataTable
            page='listing'
            isListingsTable={true}
            columns={columns}
            dataSource={filteredData}
            totalItems={data.length}
            showTableInfo={true}
            rowClassName='table-row'
            pageSize={uiPreferences.pageSize}
            onPageSizeChanged={OnPageSizeChange}
          />
        }
      </>}
    </div>
  );
};