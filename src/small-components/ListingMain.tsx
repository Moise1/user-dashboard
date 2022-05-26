import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { t } from '../../src/utils/transShim';
import { SuccessBtn, DeleteBtn, WarningBtn } from './ActionBtns';
import { TrashIcon, CheckIcon, RefreshIcon } from '../components/common/Icons';
import { ListingData } from 'src/redux/listings/listingsSlice';
interface Props {
  selectedRecordData: ListingData;
}

export const ListingMain: React.FC<Props> = ({ selectedRecordData }: Props) => {
  const { TextArea } = Input;
  return (
    <Form layout="vertical" className="form">
      <Row gutter={[70, 0]} className="row">
        <Col>
          <Form.Item label="Title">
            <Input className="blue-input" value={selectedRecordData.title} />
          </Form.Item>

          <Form.Item label="Quantity">
            <Input className="blue-input" value={selectedRecordData.sourceQuantity} type="number" />
          </Form.Item>

          <Form.Item label="Notes">
            <TextArea rows={6} />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="Markup">
            <Input className="blue-input" value={selectedRecordData.sourceId} />
          </Form.Item>

          <Form.Item label="Your Price">
            <Input className="blue-input" value={selectedRecordData.sourcePrice} />
          </Form.Item>

          <Form.Item label="Mark up %">
            <Input className="blue-input" value="30" />
          </Form.Item>

          <Form.Item label="Profit">
            <Input className="blue-input" value={selectedRecordData.price} />
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
