import {  Form, Drawer, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import '../../../sass/advanced-search.scss';
import { t } from '../../../utils/transShim';
import { ColumnData, FieldType } from '../types/columns';

export type AdvancedFilter = {
  columnId: number;
  value: string[];
}

interface Props<RecordType> {
  visible: boolean;
  onClose: () => void;
  closable: boolean;
  columns: ColumnData<RecordType>[];
  currentFilter: AdvancedFilter[];
  onChangeFilter: (f: AdvancedFilter[]) => void;
}

//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const AdvancedSearch = <RecordType extends object = any>(props: Props<RecordType>) => {
  const { visible, onClose, closable, columns, onChangeFilter, currentFilter } = props;

  const RenderField = (column: ColumnData<RecordType>) => {
    const { advancedSearch, dataIndex } = column;
    const title = t(column.title?.toString() ?? '') as string;
    const name = dataIndex?.toString() ?? '';
    const currentValue = currentFilter.find(x => x.columnId == column.id)?.value;

    const OnChange = (newValue: string[] | null | undefined) => {
      const newFilter = [...currentFilter];

      const Remove = () => {
        for (let i = 0; i < newFilter.length; i++) {
          const c = newFilter[i];
          if (c.columnId == column.id) {
            newFilter.splice(i, 1);
            return;
          }
        }
        return;
      };

      const Add = (newValue: string[]) => {
        for (let i = 0; i < newFilter.length; i++) {
          const c = newFilter[i];
          if (c.columnId == column.id) {
            newFilter[i] = {
              ...c, value: newValue
            };
            return;
          }
        }
        newFilter.push({
          columnId: column.id,
          value: newValue
        });
      };

      if (newValue)
        Add(newValue);
      else
        Remove();

      onChangeFilter(newFilter);
    };

    const OnStringChanged = (e: React.FormEvent<HTMLInputElement>) => OnChange([e.currentTarget?.value ?? '']);
    const OnBooleanChanged = (e: CheckboxChangeEvent) => OnChange(e.target.checked ? [e.target.value] : null);

    const RenderInput = () => {
      switch (advancedSearch?.type) {
        default:
        case FieldType.String:
          return <Input className="blue-input" name={name} onChange={OnStringChanged} value={currentValue?.[0] ?? ''} />;
        case FieldType.Date:
          return <Input name={name} />;
        case FieldType.Boolean:
          return (
            <div className="max-min-section">
              <Checkbox name={name} value="1" checked={currentValue?.[0] === '1'} onChange={OnBooleanChanged}/>
              <label>{t('Setting.Yes')}</label>
              <Checkbox name={name} value="0" checked={currentValue?.[0] === '0'} onChange={OnBooleanChanged} />
              <label>{t('Setting.No')}</label>
            </div>
          );
        case FieldType.Number:
          return (
            <div className="max-min-section">
              <Input className="blue-input" placeholder="Min" name={name} />
              <Input className="blue-input" placeholder="Max" name={name} />
            </div>
          );
      }
    };

    return (
      <Form.Item label={title} htmlFor={name}>
        {RenderInput()}
      </Form.Item>
    );
  };

  return (
    <Drawer
      className="advanced-search"
      title="Advanced Search"
      visible={visible}
      placement="right"
      onClose={onClose}
      closable={closable}
    >
      <div className="advanced-form-container">
        <Form layout="vertical" className="advanced-search-form">
          <div className="search-inputs">
            {columns.filter(c => !c.advancedSearch?.ignore).map(c => RenderField(c))}
          </div>
        </Form>
      </div>
    </Drawer>
  );
};
