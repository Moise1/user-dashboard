/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Radio, Spin } from 'antd';

import '../../sass/subscriptions/payment-method.scss';

import { OrderSummary } from './OrderSummary';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getSubscriptions } from 'src/redux/subscriptions/subsThunk';
import { useHistory } from 'react-router';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PaymentMethod = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [getSubscriptions]);

  const routeChange = (route: string) => {
    history.push(route);
  };

  const [productId] = useState(localStorage.getItem('productId'));
  const [billingId] = useState(localStorage.getItem('billing'));
  const [currencyId] = useState(localStorage.getItem('currencyId'));

  const { products, loading } = useAppSelector((state) => state.subscriptions);
  console.log({ products });
  return loading ? (
    <Spin />
  ) : (
    <Layout className="paymentmethod-content">
      <div className="title-container">
        <h2>Checkout</h2>
        <h3>Payment method</h3>
      </div>

      <div className="payment-sections-container">
        <div className="payments-container">
          <div className="section-payment">
            <div className="section-container">
              <h3>Select your preferred payment method</h3>
              <div className="cards-payments">
                <Radio className="card-payment-section">
                  <h3>Credit card</h3>
                </Radio>
                <Radio className="card-payment-section">
                  <h3>Paypal</h3>
                </Radio>
              </div>
            </div>
          </div>
          {/*Future functionality*/}
          {/*
          <div className="section-payment">
            <h3 className="title-card">Billing details</h3>
            <div className="section-container">
              <div className="billing-details">
                <div className="address-details">
                  <h3>Address</h3>
                  <h4>John McGregor</h4>
                  <h4>7 Queensway</h4>
                  <h4>WC17 8BQ, London</h4>
                  <h4>United Kingdom</h4>
                </div>
                <div className="address-details">
                  <h3>VAT Number</h3>
                  <h4>466345544</h4>
                </div>
              </div>
            </div>
          </div>
          */}
        </div>
        <div className="order-summary">
          <div className="second-section-container">
            <OrderSummary productId={productId} billingId={billingId} currencyId={currencyId} />
            <div className="order-sum" onClick={() => routeChange('/payment-method')}>
              <ConfirmBtn htmlType="submit">
                Finish Payment <ArrowRightOutlined />
              </ConfirmBtn>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};
