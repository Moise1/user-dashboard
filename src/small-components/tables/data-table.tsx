import { ReactNode } from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../sass/tables/data-table.scss';
import { ColumnType, TableRowSelection } from 'antd/lib/table/interface';
import { SimpleTable } from './simple-table';

export type DataTableKey = React.Key;

interface Props<RecordType> {
  columns: ColumnType<RecordType>[];

  dataSource: RecordType[];
  selectedRows?: number;
  totalItems?: number;
  page?: string;
  loading?: boolean | ReactNode;
  showTableInfo?: boolean;
  total?: number;
  setPostPerPage?: (postPerPage: number) => void;
  setRulesPerPage?: (rulesPerPage: number) => void;
  setListingsPerPage?: (listingsPerPage: number) => void;
  rowClassName?: string;
  onRow?: (record: RecordType) => { onClick: () => void };
  rowSelection?: TableRowSelection<RecordType>;
  isListingsTable?: boolean;

  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChanged?: (itemsPerPage: number) => void;
  pageSizes?: number[];
  hidePagination?: boolean;

  onChangeVisibleRows?: (rows: RecordType[]) => void;

  actionsDropdownMenu?: JSX.Element;
}
//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const DataTable = <RecordType extends object = any>(props: Props<RecordType>) => {

  const {
    columns,
    dataSource,
    rowSelection,
    selectedRows,
    totalItems,
    page,
    showTableInfo,
    onRow,
    rowClassName,
    currentPage,
    pageSize,
    pageSizes,
    onPageChange,
    onPageSizeChanged,
    hidePagination,
    onChangeVisibleRows,
    actionsDropdownMenu
  } = props;

  const pageSizeOptionArray = pageSizes ?? [10, 20, 50, 100];

  return (
    <div className="data-table-container">
      {showTableInfo && (
        <div className="table-info">
          {selectedRows ? <p className="total-selected">
            <strong>{selectedRows}</strong> selected
          </p> : null}
          {actionsDropdownMenu && (
            <Dropdown overlay={actionsDropdownMenu} className="actions-dropdown">
              <Space>
                Bulk Action
                <DownOutlined />
              </Space>
            </Dropdown>
          )}
          <p className="total-items">
            <strong>
              {totalItems ?? dataSource?.length ?? 0} {page} (s)
            </strong>
          </p>
        </div>
      )}

      <SimpleTable
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        rowClassName={rowClassName}
        onRow={onRow}
        currentPage={currentPage}
        pageSize={pageSize}
        hidePagination={hidePagination}
        onPageChange={onPageChange}
        onPageSizeChanged={onPageSizeChanged}
        pageSizes={pageSizeOptionArray}
        onChangeVisibleRows={onChangeVisibleRows}
      />
    </div>
  );
};
