import { ReactNode } from 'react';
import { Pagination, Table } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { ListingData } from 'src/redux/listings/listingsSlice';
import { OrderData } from 'src/redux/orders/orderSlice';
import { ListingsItems } from '../common/ListingsData';
import { Channel } from '../../redux/channels/channelsSlice';

export type TableDataTypes = ListingsItems | ListingData | OrderData | Rule | SourceConfig | UserAssistant | Channel;
interface Props {
  columns: { title: ReactNode; dataIndex: string; key: string; visible?: boolean }[];
  dataSource: Array<TableDataTypes>;
  rowSelection?: {
    selectedRowKeys: Key[];
    onChange: (selectedRowKeys: Key[], selectedRows?: TableDataTypes[]) => void;
  };
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
}

export const DataTable: React.FC<Props> = (props: Props) => {
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
    rowClassName
  } = props;

  const getData = (current: Props['current'], pageSize: Props['pageSize']) => {
    return dataSource?.slice((current! - 1) * pageSize!, current! * pageSize!);
  };

  return (
    <div className="data-table">
      {showTableInfo && (
        <div className="table-info">
          <p className="total-selected">
            {' '}
            <strong>{selectedRows}</strong> selected
          </p>
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
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
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
      {/* <Pagination onChange={onChange} total={totalItems} current={current} pageSize={pageSize} /> */}
    </div>
  );
};
