import { ReactNode, useState } from 'react';
import { Table, Pagination } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { Rule } from '../../redux/pricing-rules/rulesSlice';
import { SourceConfig } from '../../redux/source-config/sourceSlice';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { ListingsItems } from '../common/ListingsData';
import { Channel } from '../../redux/channels/channelsSlice';

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
    total,
    pageSize
  } = props;
  
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);

  const getData = (currentPage: Props['current'], pageSize: Props['pageSize'] ) => {
    return dataSource.slice((currentPage! - 1) * pageSize!, currentPage! * pageSize!);
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
        dataSource={getData(defaultCurrent, pageSize)}
        rowSelection={rowSelection}
        pagination={false}
      />
      <Pagination 
        onChange={setDefaultCurrent} 
        total={total} 
        defaultCurrent={defaultCurrent} 
        defaultPageSize={pageSize}/>
    </div>
  );
};
