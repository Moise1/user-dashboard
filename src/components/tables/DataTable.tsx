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

  interface Props{
    columns: {title: ReactNode, dataIndex: string, key: string, visible: boolean}[];
    dataSource: ListingsTypes[];
    rowSelection: {selectedRowKeys: Key[], onChange: (selectedRowKeys: Key[]) => void}
    selectedRows: number;
    totalItems: number;
  }

export const DataTable: React.FC<Props> = (props: Props) =>{  
  const {columns, dataSource, rowSelection, selectedRows, totalItems} = props;
  return(
    <>
      <div className="table-info">
        <p className="total-selected"> <strong>{selectedRows}</strong> selected</p>
        <div className="selected-options">
          <ul className="list">
            <li className="list-item">Edit <strong>{selectedRows}</strong> listings</li>
            <li className="list-item">Copy <strong>{selectedRows}</strong> listings</li>
            <li className="list-item">OPtimize <strong>{selectedRows}</strong> listings</li>
          </ul>
        </div>
        <p className='total-items'><strong>{totalItems} listings</strong></p>
      </div>
      <Table  columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>
    </>
  );
};