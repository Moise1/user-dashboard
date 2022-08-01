import { Col, Row, Divider } from 'antd';
import { CancelBtn, SuccessBtn } from '../../small-components/ActionBtns';
import { t } from '../../utils/transShim';
import '../../sass/product-details.scss';
import { useEffect, useState } from 'react';
import { Product } from './Types';

interface Props {
  imageUrl?: string;
  channelPrice?: number;
  profit?: number;
  sourcePrice?: number;
  handleClose: () => void;
  selectedProductDataDetail: Product;
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cardElementProductDetail: (EventTarget & HTMLDivElement) | (EventTarget & SVGElement) | (EventTarget & HTMLSpanElement) | (EventTarget & Element) | undefined;
  allCatalogProducts: Product[];
}
export const ProductDetails = (props: Props) => {

  const { imageUrl, profit, sourcePrice, channelPrice, handleClose, selectedProductDataDetail
    , setAllProducts, cardElementProductDetail, allCatalogProducts
  } = props;

  console.log('Delete this variable', cardElementProductDetail, allCatalogProducts);
  const [limit, setLimit] = useState<number>(1);
  const [cardInfo, setCardInfo] = useState<
    (EventTarget & HTMLDivElement) | (EventTarget & SVGElement) | (EventTarget & HTMLSpanElement) | (EventTarget & Element) | null
  >();
  useEffect(() => {
    setLimit(1);
    setCardInfo(document.getElementById(JSON.stringify(selectedProductDataDetail.id)));
  }, [selectedProductDataDetail, cardInfo]);

  const addToSelection = () => {
    setLimit(limit + 1);
    limit == 1 && setAllProducts((prevState) => [...prevState, selectedProductDataDetail]);
    cardInfo?.classList.add('selected-product-card');
    // allCatalogProducts.filter((d) => d.id === selectedProductDataDetail.id);
  };

  const removeToSelection = () => {
    cardInfo?.classList.remove('selected-product-card');
    setAllProducts((prevState) => [...prevState].filter((d) => d.id !== selectedProductDataDetail.id));
  };

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
              document.getElementById(JSON.stringify(selectedProductDataDetail.id))?.classList.contains('selected-product-card') ?
                <SuccessBtn
                  handleConfirm={removeToSelection}
                >{t('RemoveFromSelection')}</SuccessBtn>
                :
                <SuccessBtn
                  handleConfirm={addToSelection}
                >{t('AddToSelection')}</SuccessBtn>
            }
            <CancelBtn handleClose={handleClose}>{t('Button.Cancel')}</CancelBtn>
          </div>
        </Col>
      </Row>
    </div>
  );
};
