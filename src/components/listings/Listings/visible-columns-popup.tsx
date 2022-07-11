import { Card, Checkbox, Col, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { t } from '../../../utils/transShim';
import { PopupModal } from '../../modals/PopupModal';
import { ListingsColumns, TableColumnId } from './columns';

interface Props {
  onClose: () => void;
  isVisible: boolean;
  allColumns: TableColumnId[];
  visibleColumns: TableColumnId[];
  onChange: (newVisible: TableColumnId[]) => void;
}

export const VisibleColumnsPopup = (props: Props) => {
  const { isVisible, onClose, allColumns, visibleColumns, onChange } = props;
  const dic = new Map(ListingsColumns.map(x => [x.id, x]));

  const handleCheckBox = (e: CheckboxChangeEvent) => {
    const newVisibleC = new Set<number>(visibleColumns);
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      newVisibleC.add(value);
    } else {
      newVisibleC.delete(value);
    }

    const result = Array.from(newVisibleC) as TableColumnId[];
    onChange(result);
  };

  const ColumnRow = (id: TableColumnId) => {
    const col = dic.get(id);
    if (!col)
      return <></>;

    const isVisible = visibleColumns.includes(id);

    return (
      <li key={col.id}>
        <Checkbox className="checkbox" checked={isVisible} value={col.id} onChange={handleCheckBox}>
          {t(col.title)}
        </Checkbox>
      </li>
    );
  };

  return (
    <PopupModal handleClose={onClose} width={900} open={isVisible}>
      <h5 className="cols-display-title">Select columns to display</h5>
      <p className="description">Display columns in the listing table that suit your interests.</p>
      <Card className="listings-card">
        <Row className="listings-cols">
          <Col>
            <ul className="cols-list">
              {allColumns.map(ColumnRow)}
            </ul>
          </Col>
          <Col>
            <div className="cols-amount">
              <p>Amount of columns on your listings table</p>
              <h3>{visibleColumns.length}</h3>
            </div>
          </Col>
        </Row>
        {/* }<div className="show-columns-action-btns">
              <CancelBtn handleClose={handleCancelChanges}>{t('Button.Cancel')}</CancelBtn>!
              <SuccessBtn handleConfirm={handleApplyChanges}>
                <CheckIcon />
                {t('Button.ApplyChanges')}
              </SuccessBtn>
            </div>*/}
      </Card>
    </PopupModal>
  );
};