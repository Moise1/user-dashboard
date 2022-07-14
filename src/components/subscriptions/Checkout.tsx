/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Form, /*(needed for extras) Checkbox, */ Spin } from 'antd';

import '../../sass/subscriptions/checkout.scss';

import { OrderSummary } from './OrderSummary';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getSubscriptions } from 'src/redux/subscriptions/subsThunk';
import { useHistory } from 'react-router-dom';

import { Product } from 'src/redux/subscriptions/subsSlice';
import { Selector, SelectorValue } from '../../small-components/form/selector';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Links } from '../../links';

const { Item } = Form;

//interface props {
//  productId: string | null;
//  billlingId: string | null;
//  currencyId: string | null;
//}

export const Checkout = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [getSubscriptions]);

  const routeChange = (route: string) => {
    history.push(route);
  };
  const [productId, setProductId] = useState(localStorage.getItem('productId'));
  const [billingId, setBillingId] = useState(localStorage.getItem('billing'));
  const [currencyId, setCurrencyId] = useState(localStorage.getItem('currencyId'));

  const handleProductChange = (value: SelectorValue) => {
    setProductId(value as string);
    localStorage.setItem('productId', value as string);
  };

  const handleBillingChange = (value: SelectorValue) => {
    setBillingId(value as string);
    localStorage.setItem('billing', value as string);
  };

  const handleCurrencyChange = (value: SelectorValue) => {
    setCurrencyId(value as string);
    localStorage.setItem('currencyId', value as string);
  };

  const { products, loading } = useAppSelector((state) => state.subscriptions);
  const billings = [
    { label: 'Per Month', value: 0 },
    { label: 'Per 6 Months - 20% OFF', value: 1 },
    { label: 'Per Year - 40% OFF', value: 2 }
  ];
  const currency = [
    { label: 'EUR \u20AC', value: 1 },
    { label: 'USD \u0024', value: 2 },
    { label: 'GBP \u00A3', value: 3 }
  ];
  console.log({ products });
  return loading ? (
    <Spin />
  ) : (
    <Layout className="checkout-content">
      <div className="title-container">
        <h2>Checkout</h2>
        <h3>Listings amount</h3>
      </div>

      <div className="checkout-sections-container">
        <div className="first-section-container">
          <Form className="bulk-form" layout={'vertical'}>
            <Item label="Select your listings amount" name="sourceId">
              <Selector defaultValue={productId?.toString()} loading={loading} onChange={handleProductChange}>
                {products?.map(({ name: label, id: value }: Product) => ({ value, label }))}
              </Selector>
            </Item>
            <Item label="Select your Billing Cycle" name="billingId">
              <Selector defaultValue={billingId?.toString()} loading={loading} onChange={handleBillingChange}>
                {billings}
              </Selector>
            </Item>
            <Item label="Select your Preferred Currency" name="currencyId">
              <Selector defaultValue={currencyId?.toString()} loading={loading} onChange={handleCurrencyChange}>
                {currency}
              </Selector>
            </Item>
          </Form>

          {/*        NOT FOR NOW */}
          {/*     <div className="extras">
            <div className="extra-container">
              <div className="extra-explanation">
                <Checkbox className="checkbox">
                  <h4>Add no api server</h4>
                  <p>Your store will be connected to our servers always</p>
                </Checkbox>
              </div>
              <div className="price-extra">
                <h5>+£12.99</h5>
              </div>
            </div>
            <div className="extra-container">
              <div className="extra-explanation">
                <Checkbox className="checkbox">
                  <h4>Add 10 listings service</h4>
                  <p>10 hot selling products will be added to your store</p>
                </Checkbox>
              </div>
              <div className="price-extra">
                <h5>+£9.99</h5>
              </div>
            </div>
          </div> */}
        </div>
        <div className="order-summary">
          <div className="second-section-container">
            <OrderSummary productId={productId} billingId={billingId} currencyId={currencyId} />
            <div className="order-sum" onClick={() => routeChange(Links.PaymentMethod)}>
              <ConfirmBtn htmlType="submit">
                Payment method <ArrowRightOutlined />
              </ConfirmBtn>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
