import { ColumnData } from '../types/columns';

//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const SmartSearchFilter = <DataType extends object = any>(
  searchTerm: string | null | undefined,
  data: DataType[],
  columns: ColumnData<DataType>[]
) => {
  if (!data || !searchTerm || !columns || columns.length == 0 || searchTerm.trim().length == 0)
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

      if (((f as { toString?: () => string })?.toString?.()?.trim()?.toLocaleLowerCase().indexOf(searchTerm.trim().toLocaleLowerCase()) ?? -1) >= 0) {
        filtered.push(d);
      }
    }
  }

  return filtered;
};