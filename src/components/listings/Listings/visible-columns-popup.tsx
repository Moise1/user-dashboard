import { Card, Checkbox, Col, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ColumnData, ColumnId } from '../../../small-components/tables/types/columns';
import { t } from '../../../utils/transShim';
import { PopupModal } from '../../modals/PopupModal';

interface Props<RecordType> {
  onClose: () => void;
  isVisible: boolean;
  allColumns: ColumnData<RecordType>[];
  visibleColumns: ColumnId[];
  onChange: (newVisible: ColumnId[]) => void;
}
//eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const VisibleColumnsPopup = <RecordType extends object = any>(props: Props<RecordType>) => {
  const { isVisible, onClose, allColumns, visibleColumns, onChange } = props;

  const handleCheckBox = (e: CheckboxChangeEvent) => {
    const newVisibleC = new Set<number>(visibleColumns);
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      newVisibleC.add(value);
    } else {
      newVisibleC.delete(value);
    }

    const result = Array.from(newVisibleC) as ColumnId[];
    onChange(result);
  };

  const ColumnRow = (col: ColumnData<RecordType>) => {
    const isVisible = visibleColumns.includes(col.id);

    return (
      <li key={col.id}>
        <Checkbox className="checkbox" checked={isVisible} value={col.id} onChange={handleCheckBox}>
          {typeof (col.title) === 'string' ? t(col.title) : col.title}
        </Checkbox>
      </li>
    );
  };

  return (
    <PopupModal handleClose={onClose} width={900} open={isVisible}>
      <h5 className="cols-display-title">{t('VisibleColumnsPopup.Title')}</h5>
      <p className="description">{t('VisibleColumnsPopup.Description')}</p>
      <Card className="listings-card">
        <Row className="listings-cols">
          <Col>
            <ul className="cols-list">
              {allColumns.map(ColumnRow)}
            </ul>
          </Col>
          <Col>
            <div className="cols-amount">
              <p>{t('VisibleColumnsPopup.Amount')}</p>
              <h3>{visibleColumns.length}</h3>
            </div>
          </Col>
        </Row>
      </Card>
    </PopupModal>
  );
};