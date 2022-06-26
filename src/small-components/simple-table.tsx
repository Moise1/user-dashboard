import { ReactNode } from 'react';
import { Pagination, Table } from 'antd';

interface Props<T> {
  columns: { title: ReactNode; dataIndex: string; key: string; visible?: boolean }[];
  dataSource: T[];
  onPageChange?: (page:number) => void;
  currentPage?: number;
  rowClassName?: string;
  onRow?: (record: T) => { onClick: () => void };
  pageSize?: number;
  onPageSizeChanged?: (itemsPerPage: number) => void;
  pageSizes?: number[];
  hidePagination?: boolean;
}

export const SimpleTable = <T extends Record<string, unknown>>(props: Props<T>) => {
  const {
    columns,
    dataSource,
    onPageChange,
    currentPage,
    pageSize: cPageSize,
    onRow,
    rowClassName,
    onPageSizeChanged,
    pageSizes
  } = props;
  const pageSizeOptionArray = pageSizes ?? [10, 20, 50, 100];
  const pageSize = cPageSize ?? pageSizeOptionArray[0];
  const page = currentPage ?? 1;

  const getData = (dataSource: T[], currentPage: number, currentPageSize: number) => {
    return dataSource?.slice((currentPage! - 1) * currentPageSize!, currentPage! * currentPageSize!);
  };

  const onShowPageSizeChange = (current: number, pageSize: number) => {
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
      />
      {!props.hidePagination && <Pagination
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
