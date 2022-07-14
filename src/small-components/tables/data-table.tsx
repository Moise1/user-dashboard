import { ReactNode } from 'react';
import { Dropdown, Menu, Space } from 'antd';
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
  handleSingleListingModal?: () => void;
  handleBulkListingModal?: () => void;
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
}
//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const DataTable = <RecordType extends object = any>(props: Props<RecordType>) => {

  const {
    columns,
    dataSource,
    rowSelection,
    selectedRows,
    totalItems,
    handleBulkListingModal,
    handleSingleListingModal,
    page,
    showTableInfo,
    onRow,
    rowClassName,
    isListingsTable,
    currentPage,
    pageSize,
    pageSizes,
    onPageChange,
    onPageSizeChanged,
    hidePagination
  } = props;

  const pageSizeOptionArray = pageSizes ?? [10, 20, 50, 100];

  const anyTable = (
    <div className="selected-options">
      <ul className="list">
        <li className="list-item" onClick={selectedRows! > 1 ? handleBulkListingModal : handleSingleListingModal}>
          Edit <strong>{selectedRows}</strong> {page}(s)
        </li>
        <div className="horizontal-divider" />
        <li className="list-item">
          Copy <strong>{selectedRows}</strong> {page}(s)
        </li>
        <div className="horizontal-divider" />
        <li className="list-item">
          Optimize <strong>{selectedRows}</strong> {page}(s)
        </li>
      </ul>
    </div>
  );

  const actionsDropdownMenu = (
    <Menu
      items={[
        {
          type: 'group',
          label: (
            <div
              className="action-option"
              onClick={selectedRows! === 1 ? handleSingleListingModal : handleBulkListingModal}
            >
              Edit  <strong>{selectedRows}</strong> {page}(s)
            </div>
          )
        },
        {
          type: 'group',
          label: (
            <div className="action-option">
              Copy <strong>{selectedRows}</strong> {page}(s)
            </div>
          )
        },
        {
          type: 'group',
          label: (
            <div className="action-option">
              Optimize <strong>{selectedRows}</strong> {page}(s)
            </div>
          )
        }
      ]}
    />
  );
  return (
    <div className="data-table-container">
      {showTableInfo && (
        <div className="table-info">
          <p className="total-selected">
            <strong>{selectedRows}</strong> selected
          </p>
          {isListingsTable ? (
            <Dropdown overlay={actionsDropdownMenu} className="actions-dropdown">
              <Space>
                Bulk Action
                <DownOutlined />
              </Space>
            </Dropdown>
          ) : (
            anyTable
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
      />
    </div>
  );
};
