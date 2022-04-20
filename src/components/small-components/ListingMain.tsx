import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { t } from '../../utils/transShim';
import { SuccessBtn, DeleteBtn, WarningBtn } from './ActionBtns';
import { TrashIcon, CheckIcon, RefreshIcon } from '../common/Icons';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';

interface Props {
  selectedItems: unknown | string;
}

// eslint-disable-next-line react/prop-types
export const ListingMain : React.FC<Props> = ({selectedItems}) => {
  console.log('first', selectedItems);
  const { listings } = useAppSelector((state) => state.listings);
  console.log('Model Open', listings[2]);
  const { TextArea } = Input;
  return (
    <Form layout="vertical" className="form">
      <Row gutter={[70, 0]} className="row">
        <Col>
          <Form.Item label="Title">
            <Input className="blue-input" value={listings[5].title} />

          </Form.Item>

          <Form.Item label="Quantity">
            <Input className="blue-input" value="1" type="number" />
          </Form.Item>

          <Form.Item label="Notes">
            <TextArea rows={6} />
          </Form.Item>
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
        </Col>
      </Row>
      <div className="btns-container">
        <DeleteBtn>
          <TrashIcon />
          {t('TerminateItem')}
        </DeleteBtn>
        <WarningBtn>
          <RefreshIcon />
          {t('ForceRefresh')}
        </WarningBtn>
        <SuccessBtn>
          <CheckIcon />
          {t('SaveChanges')}
        </SuccessBtn>
      </div>
    </Form>
  );
};
