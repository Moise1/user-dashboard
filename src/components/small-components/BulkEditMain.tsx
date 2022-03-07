import { Row, Col, Form, Input } from 'antd';
import { t } from '../../utils/transShim';
import { SuccessBtn, DeleteBtn } from './ActionBtns';
import { CheckIcon, TrashIcon } from '../common/Icons';

export const BulkEditMain = () => {
  return (
    <Form layout="vertical" className="form">
      <Row gutter={[70, 0]}>
        <Col>
          <Form.Item label="Quantity">
            <Input className="blue-input" value="1" type="number" />
          </Form.Item>

          <Form.Item label="Set Markup">
            <Input className="blue-input" value="Multiple values" />
          </Form.Item>

          <Form.Item label="Increase Markup by">
            <Input className="blue-input" value="Multiple values" />
          </Form.Item>
          <Form.Item label="Decrease Markup by">
            <Input className="blue-input" value="Multiple values" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="Price">
            <Input className="blue-input" value="Multiple values" />
          </Form.Item>

          <Form.Item label="Profit">
            <Input className="blue-input" value="Multiple values" />
          </Form.Item>
        </Col>
      </Row>
      <div className="action-btns">
        <DeleteBtn>
          <TrashIcon />
          {t('TerminateItem')}
        </DeleteBtn>
        <SuccessBtn>
          <CheckIcon />
          {t('SaveChanges')}
        </SuccessBtn>
      </div>
    </Form>
  );
};
