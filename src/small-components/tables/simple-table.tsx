import { useState } from 'react';
import { Pagination, Table } from 'antd';
import { ColumnType, TableRowSelection } from 'antd/lib/table/interface';

interface Props<RecordType> {
  columns: ColumnType<RecordType>[];
  dataSource: RecordType[];
  onRow?: (record: RecordType) => { onClick: () => void };

  rowClassName?: string;

  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  onPageSizeChanged?: (itemsPerPage: number) => void;
  pageSizes?: number[];
  hidePagination?: boolean;
  rowSelection?: TableRowSelection<RecordType>;
}
//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const SimpleTable = <RecordType extends object = any>(props: Props<RecordType>) => {
  const {
    columns,
    dataSource,
    onPageChange: cOnPageChange,
    currentPage: cCurrentPage,
    pageSize: cPageSize,
    onRow,
    rowClassName,
    onPageSizeChanged,
    pageSizes,
    hidePagination,
    rowSelection
  } = props;
  const pageSizeOptionArray = pageSizes ?? [10, 20, 50, 100];

  const [sCurrentPage, setCurrentPage] = useState<number>(1);
  const page = cCurrentPage ?? sCurrentPage;

  const [sPageSize, setPageSize] = useState<number>(pageSizeOptionArray[0]);
  const pageSize = cPageSize ?? sPageSize;


  const getData = (dataSource: RecordType[], currentPage: number, currentPageSize: number) => {
    return dataSource?.slice((currentPage! - 1) * currentPageSize!, currentPage! * currentPageSize!);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    cOnPageChange?.(page);
  };

  const onShowPageSizeChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
    onPageSizeChanged?.(pageSize);
  };

  return (
    <div className="data-table">
      <Table
        className="table"
        columns={columns}
        dataSource={getData(dataSource, page, pageSize)}
        pagination={false}
        rowClassName={rowClassName}
        onRow={onRow}
        rowSelection={rowSelection}
      />
      {!hidePagination && <Pagination
        className="pagination"
        onChange={onPageChange}
        total={dataSource?.length}
        current={page}
        pageSize={pageSize}
        style={{ paddingBottom: '25px' }}
        showSizeChanger
        onShowSizeChange={onShowPageSizeChange}
        pageSizeOptions={pageSizeOptionArray}
      />}
    </div>
  );
};
