import { ReactNode } from 'react';
import { Dropdown, Menu, Pagination, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Key } from 'antd/lib/table/interface';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-configuration/sourceSlice';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { ListingData } from 'src/redux/listings/listingsSlice';
import { OrderData } from 'src/redux/orders/orderSlice';
import { ListingsItems } from '../common/ListingsData';
import { Channel } from '../../redux/channels/channelsSlice';
import { AutoOrderingData } from '../../redux/auto-ordering/autoOrderingSlice';
import { ListingsStatusType } from 'src/custom-hooks/useTableSearch';
import '../../sass/data-table.scss';

export type TableDataTypes =
  | ListingsItems
  | ListingData
  | OrderData
  | Rule
  | SourceConfig
  | UserAssistant
  | Channel
  | AutoOrderingData
  | ListingsStatusType;

interface Props {
  columns: { title: ReactNode; dataIndex: string; key: string; visible?: boolean }[];
  dataSource?: Array<TableDataTypes>;
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
  onRow?: (record: TableDataTypes) => { onClick: () => void };
  rowSelection?: {
    selectedRowKeys: Key[];
    type?: 'checkbox';
    onChange: (selectedRowKeys: Key[], selectedRows?: TableDataTypes[]) => void;
  };
  isListingsTable?: boolean;
}

export const DataTable: React.FC<Props> = (props: Props) => {

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

  const getData = (current: Props['current'], pageSize: Props['pageSize']) => {
    if (dataSource?.length) return dataSource?.slice((current! - 1) * pageSize!, current! * pageSize!);
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
              Edit <strong>{selectedRows}</strong>
              {page}(s)
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
