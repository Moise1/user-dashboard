import { useEffect, useMemo, useState } from 'react';
import { Pagination, Table } from 'antd';
import { ColumnType, CompareFn, FilterValue, SorterResult, SortOrder, TablePaginationConfig, TableRowSelection } from 'antd/lib/table/interface';
import { DataIndex } from 'rc-table/lib/interface';
import { isArray, isBoolean, isFunction } from 'util';

interface Props<RecordType> {
  columns: ColumnType<RecordType>[];
  dataSource: RecordType[];
  onRow?: (record: RecordType) => { onClick: () => void };

  rowClassName?: string;

  currentPage?: number;
  onPageChange?: (pageNumber: number) => void;
  pageSize?: number;
  onPageSizeChanged?: (pageSize: number) => void;
  pageSizes?: number[];
  hidePagination?: boolean;
  rowSelection?: TableRowSelection<RecordType>;

  onChangeVisibleRows?: (rows: RecordType[]) => void;
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
    onPageSizeChanged: cOnPageSizeChanged,
    pageSizes,
    hidePagination,
    rowSelection,
    onChangeVisibleRows
  } = props;
  const pageSizeOptionArray = pageSizes ?? [10, 20, 50, 100];

  const [sCurrentPage, setCurrentPage] = useState<number>(1);
  const currentPage = cCurrentPage ?? sCurrentPage;

  const [sPageSize, setPageSize] = useState<number>(pageSizeOptionArray[0]);
  const pageSize = cPageSize ?? sPageSize;
  type SorterState = {
    dataIndex: DataIndex,
    order: SortOrder
  };
  const sort = (dataSource: RecordType[], sorter: SorterState[] | undefined) => {
    if (!sorter || sorter.length == 0)
      return dataSource;

    type AntdSorterTypeObject = {
      compare?: CompareFn<RecordType>;
      /** Config multiple sorter order priority */
      multiple?: number;
    };
    type AntdSorterType = (boolean | CompareFn<RecordType> | AntdSorterTypeObject);
    type functionF = {
      f: AntdSorterType,
      o: SortOrder
    }
    const allSorters: functionF[] = [];

    for (const s of sorter) {
      const c = columns.find(x => x.dataIndex == s.dataIndex);
      if (c && c.sorter && !isBoolean(c.sorter))
        allSorters.push({ f: c.sorter, o: s.order });
    }

    allSorters.sort((aa: functionF, bb: functionF) => {
      const a = aa.f;
      if (isFunction(a)) {
        return 1;
      }
      const b = bb.f;
      if (isFunction(b)) {
        return -1;
      }
      return ((a as AntdSorterTypeObject).multiple ?? 0) - ((b as AntdSorterTypeObject).multiple ?? 0);
    });

    const multipleSort = (compFunctions: functionF[]) => {
      return (a: RecordType, b: RecordType) => {
        for (const ff of compFunctions) {

          const f = ff.f;
          const func = (isFunction(f) ? f : (f as AntdSorterTypeObject).compare) as CompareFn<RecordType>;

          const result = (ff.o === 'descend') ? -1 * func(a, b, ff.o) : func(a, b, ff.o);
          if (result !== 0) {
            return result;
          }
        }
        return 0;
      };
    };

    dataSource.sort(multipleSort(allSorters));
    return dataSource;
  };

  const getData = (dataSource: RecordType[], currentPage: number, currentPageSize: number, sorter: SorterState[] | undefined) => {
    return sort(dataSource, sorter)?.slice((currentPage! - 1) * currentPageSize!, currentPage! * currentPageSize!);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    cOnPageChange?.(page);
  };

  const onShowPageSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
    cOnPageSizeChanged?.(pageSize);
    if (currentPage != current)
      onPageChange?.(current);
  };

  const [sorter, setSorter] = useState<SorterState[] | undefined>();
  const onChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
  ) => {
    if (sorter) {
      const sorterA = isArray(sorter) ? sorter : [sorter];
      setSorter(
        sorterA
          .filter(x => !!x && x.column?.dataIndex && x.order)
          .map(x => (
            {
              dataIndex: x!.column!.dataIndex!,
              order: x!.order!
            } as SorterState)
          )
      );
    }
  };

  const visibleRows = useMemo(() => getData(dataSource, currentPage, pageSize, sorter), [JSON.stringify([dataSource, currentPage, pageSize, sorter])]);
  useEffect(() => onChangeVisibleRows?.(visibleRows), [JSON.stringify(visibleRows)]);

  return (
    <div className="data-table">
      <Table
        className="table"
        columns={columns}
        dataSource={visibleRows}
        pagination={false}
        rowClassName={rowClassName}
        onRow={onRow}
        rowSelection={rowSelection}
        onChange={onChange}
      />
      {!hidePagination && <Pagination
        className="pagination"
        onChange={onPageChange}
        total={dataSource?.length}
        current={currentPage}
        pageSize={pageSize}
        style={{ paddingBottom: '25px' }}
        showSizeChanger
        onShowSizeChange={onShowPageSizeChange}
        pageSizeOptions={pageSizeOptionArray}
      />}
    </div>
  );
};
