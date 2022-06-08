/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Spin } from 'antd';

import '../../sass/subscriptions/payment-method.scss';

import { OrderSummary } from './OrderSummary';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getSubscriptions } from 'src/redux/subscriptions/subsThunk';

export const PaymentMethod = (/*props: props*/) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [getSubscriptions]);

  const { products, loading } = useAppSelector((state) => state.subscriptions);
  console.log({ products });
  return loading ? (
    <Spin />
  ) : (
    <Layout className="checkout-content">
      <div className="title-container">
        <h3>Checkout</h3>
        <h4>Payment method</h4>
      </div>

      <div className="payment-sections-container">
        <div className="billing-container">
          <div className="billing-section-container">
            <h1>Payment method</h1>
          </div>
          <div className="billing-section-container">
            <h1>Billing details</h1>
          </div>
        </div>
        <div className="order-summary">
          <OrderSummary productId={null} billingId={null} currencyId={null} />
        </div>
      </div>
    </Layout>
  );
};
