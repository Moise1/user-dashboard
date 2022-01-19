import { Table } from 'antd';
import { ReactNode } from 'react';


interface Props{
    columns: {title: ReactNode, dataIndex: string, key: string}[];
    dataSource: {id: number, img: JSX.Element, itemNo: number, source: string, title: JSX.Element, sell: number, cost: number, markup: JSX.Element, stock: JSX.Element, created: Date, options: JSX.Element, checked: boolean  }[]

}
export const DataTable: React.FC<Props> = ({columns, dataSource}: Props) =>{

  return <Table  columns={columns} dataSource={dataSource}/>;
};