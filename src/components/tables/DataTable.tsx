import { ReactNode } from 'react';
import { Dropdown, Menu, Pagination, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../sass/data-table.scss';
import { TableRowSelection } from 'antd/lib/table/interface';

export type DataTableKey = React.Key;

interface Props<T> {
  columns: {
    //title: ReactNode;
    //dataIndex: string;
    //id: number;
    //visible?: boolean;
    key: string;
  }[];
  dataSource?: Array<T>;
  selectedRows?: number;
  totalItems?: number;
  handleSingleListingModal?: () => void;
  handleBulkListingModal?: () => void;
  page?: string;
  loading?: boolean | ReactNode;
  showTableInfo?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
  current?: number;
  pageSize?: number;
  setPostPerPage?: (postPerPage: number) => void;
  setRulesPerPage?: (rulesPerPage: number) => void;
  setListingsPerPage?: (listingsPerPage: number) => void;
  rowClassName?: string;
  onRow?: (record: T) => { onClick: () => void };
  rowSelection?: TableRowSelection<T>;
  isListingsTable?: boolean;
}

export const DataTable = <T extends Record<string, unknown>>(props: Props<T>) => {

  const pageSizeOptionArray = [2, 10, 20, 50, 100];

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
    onChange,
    current,
    pageSize,
    onRow,
    setPostPerPage,
    setListingsPerPage,
    rowClassName,
    isListingsTable
  } = props;
  const onShowSizeChange = (current: number, pageSize: number) => {
    setPostPerPage?.(pageSize);
    setListingsPerPage?.(pageSize);
    setListingsPerPage?.(pageSize);
  };

  const getData = (current: number | undefined, pageSize: number | undefined) => {
    if (dataSource?.length) return dataSource?.slice(((current ?? 1) - 1) * (pageSize ?? 1), (current ?? 1) * (pageSize ?? 1));
  };

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
              {totalItems} {page} (s)
            </strong>
          </p>
        </div>
      )}

      <Table
        className="table"
        columns={columns}
        dataSource={getData(current, pageSize)}
        rowSelection={rowSelection}
        pagination={false}
        rowClassName={rowClassName}
        onRow={onRow}
      />

      <Pagination
        className="pagination"
        onChange={onChange}
        total={totalItems}
        current={current}
        pageSize={pageSize}
        style={{ paddingBottom: '25px' }}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={pageSizeOptionArray}
      />
    </div>
  );
};
