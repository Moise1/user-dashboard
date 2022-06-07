/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Divider } from 'antd';
import '../../sass/subscriptions/order-summary.scss';
import { ArrowRight } from 'react-feather';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useHistory } from 'react-router-dom';

export const OrderSummary = (/*props: props*/) => {
  const history = useHistory();

  const routeChange = (route: string) => {
    history.push(route);
  };

  return (
    <div className="second-section-container">
      <h3 className="title-ordersum">Your order:</h3>
      <div className="order-products">
        <div className="order-products-lines">
          <div className="product-order-line">
            <h5 className="title-orderdetails">Up to 300 active listings</h5>
          </div>
          {/*           <div className="product-order-line">
            <h5 className="title-orderdetails">No api server</h5>
          </div>
          <div className="product-order-line">
            <h5 className="title-orderdetails">10 Listings service</h5>
          </div> */}
        </div>
        <div className="order-products-price">
          <div className="price-extra">
            <h5>£19.00/month</h5>
          </div>
          {/*           <div className="price-extra">
            <h5>£12.99/month</h5>
          </div>
          <div className="price-extra">
            <h5>£9.99</h5>
          </div> */}
        </div>
      </div>

      <Divider />
      <div className="order-sum" onClick={() => routeChange('/payment-method')}>
        <h2>Total to pay:</h2>
        <h1>£19.00</h1>
        <ConfirmBtn htmlType="submit">
          Payment method <ArrowRight />
        </ConfirmBtn>
      </div>
    </div>
  );
};
