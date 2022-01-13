import { Row, Col, Radio, Input } from 'antd';
import { Switch } from './Switch';
import { SuccessBtn, DeleteBtn } from './ActionBtns';
import { t } from 'src/global/transShim';
import '../../sass/light-theme/listing-options.scss';

export const BulkEditOptions = () => {
  return (
    <div className="listing-options">
      <Row className="description-and-controls">
        <Col xs={24} xl={8} className="description-area">
          <h4>Monitor stock</h4>
          <p>
            If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
            is available again, we will automatically update your store again.
          </p>
        </Col>
        <Col xs={24} xl={8} className="controls-area">
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col xs={24} xl={8} className="description-area">
          <h4>Monitor price</h4>
          <p>
            If the supplier changes the price of a product, we will automatically update accordingly to keep your profit
            with the corresponding markup.
          </p>
        </Col>
        <Col xs={24} xl={8} className="controls-area">
          <Switch />
        </Col>
      </Row>
      <Row className="description-and-controls">
        <Col xs={24} xl={8} className="description-area">
          <h4>Monitor Price Descrease</h4>
          <p>
            If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this off,
            we will only update the price when it goes up in the supplier’s catalog.
          </p>
          <br />
          <p>
            Example: (limit 20%) Your price will be updated only if the price at the source is reduced less thank 20%.
            If the price at the source lowers 21% or more, your price will not be updated.
          </p>
          <br />
        </Col>
        <Col xs={24} xl={8} className="limit-section controls-area">
          <Switch />
          <div className="limit-area">
            <Radio className="radio">No Limit</Radio>
            <div className="limit">
              <Radio className="radio">Limit %</Radio>
              <Input value="30" className="blue-input" />
            </div>
          </div>
        </Col>
      </Row>

      <div className="btns-container-options">
        <DeleteBtn>{t('TerminateItem')}</DeleteBtn>
        <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
      </div>
    </div>
  );
};
