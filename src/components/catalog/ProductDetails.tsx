import { Col, Row, Divider } from 'antd';
import { CancelBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { t } from '../../utils/transShim';
import '../../sass/product-details.scss';

interface Props {
  imageUrl?: string;
  channelPrice?: number;
  profit?: number;
  sourcePrice?: number;
  handleClose: () => void;
  productId?: unknown;
  selectedProductDataDetail?: {
    channelPrice?: number;
    competition?: number;
    id?: number;
    imageUrl: string;
    options: number;
    priority: number;
    profit: number;
    quantityListed: number;
    sold: number;
    sourceId: number;
    sourcePrice: number;
    title: string;
    url: string;
  }

}
export const ProductDetails = (props: Props) => {
  const { imageUrl, profit, sourcePrice, channelPrice, handleClose, selectedProductDataDetail, productId } = props;
  console.log(selectedProductDataDetail);
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
            {
              productId !== 0 ?
                <SuccessBtn>{t('RemoveFromSelection')}</SuccessBtn>
                :
                <SuccessBtn>{t('AddToSelection')}</SuccessBtn>
            }
            <CancelBtn handleClose={handleClose}>{t('Button.Cancel')}</CancelBtn>
          </div>
        </Col>
      </Row>
    </div>
  );
};
