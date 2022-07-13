import { ColumnData } from './types/columns';

export const SmartSearch = <DataType extends Record<string, unknown>>(
  searchTerm: string | null | undefined,
  data: DataType[],
  columns: ColumnData<DataType>[]
) => {
  if (!data || !searchTerm || !columns || columns.length == 0)
    return data;

  const filtered: DataType[] = [];
  for (const d of data) {
    for (const c of columns) {
      if ((c.smartSearch?.ignore ?? false))
        continue;

      const f = d[c.dataIndex as keyof DataType];
      if (!f)
        continue;

      if (c.smartSearch?.customFilter) {
        if (c.smartSearch.customFilter(f, searchTerm)) {
          filtered.push(d);
        }
        continue;
      }

      if (!(f as { toString?: () => string })?.toString)
        continue;

      if (((f as { toString?: () => string })?.toString?.()?.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) ?? -1) >= 0) {
        filtered.push(d);
      }
    }
  }

  return filtered;
};