import { isArray, isObject } from 'util';
import { AdvancedSearchOptions, ColumnData, FieldType } from '../types/columns';
import { AdvancedFilter } from './advanced-search';

type AdvancedFilterExtended = {
  columnId: number;
  fieldName: string | number | readonly (string | number)[] | undefined;
  value: string[];
  options?: AdvancedSearchOptions;
}

//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const AdvancedSearchFilter = <DataType extends object = any>(
  filter: AdvancedFilter[],
  data: DataType[],
  columns: ColumnData<DataType>[]
) => {
  if (!data || !filter || !columns || columns.length == 0 || filter.length == 0)
    return data;

  const filterA: AdvancedFilterExtended[] = [];
  for (const f of filter) {
    const c = columns.find(x => x.id == f.columnId);
    if (!c)//This should never happen
      continue;
    filterA.push({ ...f, fieldName: c.dataIndex, options: c.advancedSearch });
  }

  const filteredData: DataType[] = [...data];

  for (let i = filteredData.length; i-- > 0;) {
    const d = filteredData[i];
    for (const f of filterA) {
      if (!f.fieldName || !f.value || f.value[0].length == 0)
        continue;

      let fieldValue: unknown | undefined;
      if (isArray(f.fieldName)) {
        fieldValue = d;
        for (const fn of f.fieldName as (string | number)[]) {
          if (!fieldValue || !isObject(fieldValue))
            break;
          const k = fn as keyof typeof fieldValue;
          fieldValue = (fieldValue as Record<string, never>)[k];
        }
      } else {
        const k = f.fieldName as keyof typeof d;
        fieldValue = d[k];
      }

      if (f.options?.customFilter) {
        if (!f.options.customFilter(fieldValue as unknown, f.value))
          filteredData.splice(i, 1);
        continue;
      }

      if (!fieldValue)
        continue;

      switch (f.options?.type) {
        default:
        case FieldType.String:

          if (!(fieldValue as { toString?: () => string }).toString)
            continue;

          if (f.value[0]?.trim()?.length == 0)
            continue;

          if (((fieldValue as { toString?: () => string })?.toString?.()?.trim()?.toLocaleLowerCase().indexOf(f.value[0]?.trim()?.toLocaleLowerCase()) ?? -1) >= 0)
            continue;

          filteredData.splice(i,1);
          break;
        case FieldType.Boolean:
          break;
        case FieldType.Date:
          break;
        case FieldType.Number:
          break;
      }
    }
  }

  return filteredData;
};