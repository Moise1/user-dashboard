import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { t } from '../../global/transShim';
import {SuccessBtn, DeleteBtn, WarningBtn} from './ActionBtns';


export const ListingMain = () => {
  const { TextArea } = Input;
  return (
    <Form layout="vertical" className="form">
      <Row gutter={[70, 0]}>
        <Col>
          <Form.Item label="Title">
            <Input className="blue-input" value="2021 New Stylish Simplicity Print..." />
          </Form.Item>

          <Form.Item label="Quantity">
            <Input className="blue-input" value="1" type="number" />
          </Form.Item>

          <Form.Item label="Notes">
            <TextArea rows={4}/>
          </Form.Item>
          <div className="btns-container">
            <DeleteBtn>{t('TerminateItem')}</DeleteBtn>
            <WarningBtn>{t('ForceRefresh')}</WarningBtn>
          </div>
        </Col>

        <Col>
          <Form.Item label="Markup">
            <Input className="blue-input" value="Defined by settings(30)" />
          </Form.Item>

          <Form.Item label="Your Price">
            <Input className="blue-input" value="30.67" />
          </Form.Item>

          <Form.Item label="Mark up %">
            <Input className="blue-input" value="30" />
          </Form.Item>

          <Form.Item label="Profit">
            <Input className="blue-input" value="3.09" />
          </Form.Item>

          <p>
            <strong>Your</strong> fee percentage <strong>is set to 13%</strong>. <Link to="/change"> Change</Link>
          </p>

          <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
        </Col>
      </Row>
    </Form>
  );
};
