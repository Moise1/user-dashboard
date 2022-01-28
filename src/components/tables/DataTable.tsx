import { Table } from 'antd';
import { Key } from 'antd/lib/table/interface';
import { ReactNode } from 'react';



type ListingsTypes = {
  id: number,
  img: JSX.Element, 
  itemNo: number, 
  title: JSX.Element, 
  sell: number, 
  cost: number, 
  markup: JSX.Element, 
  stock: JSX.Element,
  created: Date, 
  options: JSX.Element,
  checked: boolean 
};


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
}


type pricingRulesTypes = {
  key: string;
  priceFrom: number;
  priceTo: number;
  markup: number;
  status: JSX.Element;
  options: JSX.Element
}



  interface Props{
    columns: {title: ReactNode, dataIndex: string, key: string, visible?: boolean}[];
    dataSource: Array<ListingsTypes| OrdersTypes | pricingRulesTypes>;
    rowSelection?: {selectedRowKeys: Key[], onChange: (selectedRowKeys: Key[]) => void}
    selectedRows?: number;
    totalItems?: number;
    handleSingleListingModal?: () => void;
    handleBulkListingModal?: ()  => void;
    page?: string;
  }

export const DataTable: React.FC<Props> = (props: Props) =>{  
  const {columns, dataSource, rowSelection, selectedRows, totalItems, handleBulkListingModal, handleSingleListingModal, page} = props;
  return(
    <div className="data-table">
      <div className="table-info">
        <p className="total-selected"> <strong>{selectedRows}</strong> selected</p>
        <div className="selected-options">
          <ul className="list">
            <li className="list-item" onClick={selectedRows! > 1 ? handleBulkListingModal : handleSingleListingModal}>Edit <strong>{selectedRows}</strong> {page}(s)</li>
            <li className="list-item">Copy <strong>{selectedRows}</strong> {page}(s)</li>
            <li className="list-item">Optimize <strong>{selectedRows}</strong> {page}(s)</li>
          </ul>
        </div>
        <p className='total-items'><strong>{totalItems} {page}s</strong></p>
      </div>
      <Table  className="table" columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>
    </div>
  );
};