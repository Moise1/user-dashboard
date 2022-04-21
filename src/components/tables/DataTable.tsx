import { ReactNode } from 'react';
import { Pagination, Table } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import { UserAssistant } from 'src/redux/va-profiles/vaProfilesSlice';
import { ListingData } from 'src/redux/listings/listingsSlice';

type OrdersTypes = {
  id: number;
  img: JSX.Element;
  sale: string;
  qty: number;
  source: string;
  title: string;
  sold: number;
  cost: number;
  fees: number;
  profit: number;
  margin: string;
  orderedOn: Date;
  state: JSX.Element | string;
};

export type SeletedRowsType = (ListingData | OrdersTypes | Rule | SourceConfig | UserAssistant | undefined)[];

interface Props {
  columns: { title: ReactNode; dataIndex: string; key: string; visible?: boolean }[];
  dataSource: Array<ListingData | OrdersTypes | Rule | SourceConfig | UserAssistant>;
  rowSelection?: { selectedRowKeys: Key[]; onChange: (selectedRowKeys: Key[],selectedRows: SeletedRowsType) => void };
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
  pagination?: boolean;
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
    // total,
    current,
    pageSize
  } = props;
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
      />
      <Pagination onChange={onChange} total={totalItems} current={current} pageSize={pageSize} />
    </div>
  );
};
