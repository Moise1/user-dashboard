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
    columns: {title: ReactNode, dataIndex: string, key: string}[];
    dataSource: ListingsTypes[];
    rowSelection: {selectedRowKeys: Key[], onChange: (selectedRowKeys: Key[]) => void}
  }

export const DataTable: React.FC<Props> = ({columns, dataSource, rowSelection}: Props) =>{  
  return <Table  columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>;
};