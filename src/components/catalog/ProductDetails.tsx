import { Col, Row, Divider } from 'antd';
import { CancelBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { t } from '../../utils/transShim';
import '../../sass/product-details.scss';

interface Props {
  imageUrl: string;
  channelPrice: number;
  profit: number;
  sourcePrice: number;
  handleClose: () => void;
}
export const ProductDetails = (props: Props) => {
  const { imageUrl, profit, sourcePrice, channelPrice, handleClose } = props;
  return (
    <div className="product-details">
      <Row gutter={[32, 0]}>
        <Col lg={8}>
          <img src={imageUrl} alt="" className="product-img" />
        </Col>
        <Col lg={14}>
          {/* {title} */}
          <div className="transaction-details">
            <div className="transaction-type">
              <p>
                <strong>Sell</strong>
              </p>
              <p>
                <strong>Cost</strong>
              </p>
              <p>
                <strong>Profit</strong>
              </p>
            </div>
            <div className="transaction-amount">
              <p>
                <strong>
                  <span>&pound;</span> {channelPrice}
                </strong>
              </p>
              <p>
                <strong>
                  <span>&pound;</span> {sourcePrice}
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
