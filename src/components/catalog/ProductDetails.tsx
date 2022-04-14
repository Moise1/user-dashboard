import { Col, Row, Divider } from 'antd';
import { CancelBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { t } from '../../utils/transShim';
import '../../sass/product-details.scss';

interface Props {
  img: string;
  details: JSX.Element;
  sell: number;
  cost: number;
  profit: number;
  handleClose: () => void;
}
export const ProductDetails = (props: Props) => {
  const { img, details, sell, cost, profit, handleClose } = props;
  return (
    <div className="product-details">
      <Row gutter={[32, 0]}>
        <Col lg={8}>
          <img src={img} alt="" className="product-img" />
        </Col>
        <Col lg={14}>
          {details}
          <div className="transaction-details">
            <div className="transaction-type">
              <p>
                <strong>Sell</strong>
              </p>
              <p>
                <strong>Cost</strong>
              </p>
              <p>
                <strong>Cost</strong>
              </p>
            </div>
            <div className="transaction-amount">
              <p>
                <strong>
                  <span>&pound;</span> {sell}
                </strong>
              </p>
              <p>
                <strong>
                  <span>&pound;</span> {cost}
                </strong>
              </p>
              <p>
                <strong>
                  {' '}
                  <span>&pound;</span> {profit}
                </strong>
              </p>
            </div>
          </div>
          <Divider />
          <div className="action-btns">
            <CancelBtn handleClose={handleClose}>{t('Cancel')}</CancelBtn>
            <SuccessBtn>{t('AddToSelection')}</SuccessBtn>
          </div>
        </Col>
      </Row>
    </div>
  );
};
