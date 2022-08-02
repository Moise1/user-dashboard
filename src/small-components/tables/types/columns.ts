import { ColumnType } from 'antd/es/table';

export type ColumnId = number;

export type SmartSearchOptions = {
  ignore?: boolean;
  customFilter?: (fieldValue: unknown, searchTerm: string) => boolean;
}
export enum FieldType {
  String, Number, Date, Boolean
}
export type AdvancedSearchOptions = {
  ignore?: boolean;
  type?: FieldType;
  customFilter?: (fieldValue: unknown, filter: string[]) => boolean;
}

export interface ColumnData<T> extends ColumnType<T> {
  id: ColumnId;
  smartSearch?: SmartSearchOptions;
  advancedSearch?: AdvancedSearchOptions
}
