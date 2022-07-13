import { ColumnType } from "antd/lib/table";

export type ColumnId = number;
//export type RecordField = number | string |boolean | Date | Record<string, any>;
//export type RecordType = { [key: string]: RecordField };

export interface ColumnData<T> extends ColumnType<T> {
  id: ColumnId;
  smartSearch?: SmartSearchOptions;
}

export type SmartSearchOptions = {
  ignore?: boolean;
  customFilter?: (fieldValue: unknown, searchTerm: string) => boolean;
}