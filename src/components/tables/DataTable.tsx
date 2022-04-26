import { ReactNode } from 'react';
import { Table, Pagination } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { ListingsItems } from '../common/ListingsData';
import { Channel } from '../../redux/channels/channelsSlice';
import { ListingData } from 'src/redux/listings/listingsSlice';

type OrdersTypes = {
  id: number;
  img: JSX.Element;
  sale: string;
  qty: number;
  source: string;
  // title: string;
  sold: number;
  cost: number;
  // fees: number;
  profit: number;
  margin: string;
  orderedOn: Date;
  state: JSX.Element | string;

  reference: string;
  channelItem: number;
  sourceItem: number;
  title: string;
  quantity: number;
  channelPrice: number;
  sourcePrice: number;
  fees: number;
  date: Date;
  status: number;
};

export type TableDataTypes = ListingData | OrdersTypes | Rule | SourceConfig | UserAssistant;
interface Props {
  columns: { title: ReactNode; dataIndex: string; key: string; visible?: boolean }[];
  dataSource: Array<ListingsItems | OrdersTypes | Rule | SourceConfig | UserAssistant | Channel>;
  rowSelection?: { selectedRowKeys: Key[]; onChange: (selectedRowKeys: Key[]) => void };
  selectedRows?: number;
  totalItems?: number;
  handleSingleListingModal?: () => void;
  handleBulkListingModal?: () => void;
  page?: string;
  loading?: boolean | ReactNode;
  showTableInfo?: boolean;
  total?: number;
  current?: number;
  pageSize?: number;
  pagination?: boolean;
  rowClassName?: string;
  onRow?: () => { onClick: () => void };
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
    // onChange,
    // total,
    current,
    pageSize,
    rowClassName,
    onRow
  } = props;
  console.log({ dataSource });
  const getData = (current: Props['current'], pageSize: Props['pageSize']) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return dataSource.slice((current! - 1) * pageSize!, current! * pageSize!);
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
              {totalItems} {page}s
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
      {/* console.log(rowSelection); */}
      <Pagination
        // onChange={rowSelection?.onChange}
        total={totalItems}
        current={current}
        pageSize={pageSize}
        style={{ paddingBottom: '25px' }}
      />
    </div>
  );
};
