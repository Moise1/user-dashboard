import { ReactNode } from 'react';
import { Dropdown, Menu, Pagination, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-configuration/sourceSlice';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { ListingData } from 'src/redux/listings/listingsSlice';
import { OrderData } from 'src/redux/orders/orderSlice';
import { ListingsItems } from '../common/ListingsData';
import { Channel } from '../../redux/channels/channelsSlice';

export type TableDataTypes = ListingsItems | ListingData | OrderData | Rule | SourceConfig | UserAssistant | Channel;
interface Props {
  columns: { title: ReactNode; dataIndex: string; key: string; visible?: boolean }[];
  dataSource: Array<TableDataTypes>;
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
  rowClassName?: string;
  onRow?: (record: TableDataTypes) => { onClick: () => void };
  isListingsTable?: boolean;
}

export const SimpleTable: React.FC<Props> = (props: Props) => {
  const {
    columns,
    dataSource,
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
    rowClassName,
    isListingsTable
  } = props;

  const getData = (current: Props['current'], pageSize: Props['pageSize']) => {
    return dataSource?.slice((current! - 1) * pageSize!, current! * pageSize!);
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
            <div className="action-option" onClick={selectedRows! === 1 ? handleSingleListingModal: handleBulkListingModal}>
              Edit <strong>{selectedRows}</strong> {page}(s)
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
    <div className="data-table">
      {showTableInfo && (
        <div className="table-info">
          <p className="total-selected">
            {' '}
            <strong>{selectedRows}</strong> selected
          </p>
          {isListingsTable ? (
            <Dropdown overlay={actionsDropdownMenu} className="actions-dropdown">
              <Space>
                Bulk Action
                <DownOutlined />
              </Space>
            </Dropdown>
          ) : anyTable  }
          <p className="total-items">
            <strong>
              {totalItems} {page}
            </strong>
          </p>
        </div>
      )}
      <Table
        className="table"
        columns={columns}
        dataSource={getData(current, pageSize)}
        pagination={false}
        rowClassName={rowClassName}
        onRow={onRow}
      />
      <Pagination
        onChange={onChange}
        total={totalItems}
        current={current}
        pageSize={pageSize}
        style={{ paddingBottom: '25px' }}
      />
    </div>
  );
};
