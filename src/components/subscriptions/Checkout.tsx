/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Form, /*(needed for extras) Checkbox, */ Spin } from 'antd';

import '../../sass/subscriptions/checkout.scss';

import { OrderSummary } from './OrderSummary';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getSubscriptions } from 'src/redux/subscriptions/subsThunk';

import { Product } from 'src/redux/subscriptions/subsSlice';
import { Selector } from '../../small-components/form/selector';

const { Item } = Form;

export const Checkout = (/*props: props*/) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [getSubscriptions]);

  const pId = localStorage.getItem('productId');
  const billlingId = localStorage.getItem('billing');
  const currencyId = localStorage.getItem('currencyId');

  console.log(pId + ' -- ' + billlingId + '  --  ' + currencyId); // "bar"

  const { products, loading } = useAppSelector((state) => state.subscriptions);
  console.log({ products });
  return loading ? (
    <Spin />
  ) : (
    <Layout className="checkout-content">
      <div className="title-container">
        <h3>Checkout</h3>
        <h4>Choose to add more to your current order</h4>
      </div>

      <div className="checkout-sections-container">
        <div className="first-section-container">
          <Form className="bulk-form" layout={'vertical'}>
            <Item label="Select your listings amount" name="sourceId">
              <SelectorPlain defaultValue={pId?.toString()} loading={loading}>
                {products?.map(({ name: label, id: value }: Product) => ({ value, label }))}
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
          <OrderSummary />
        </div>
      </div>
    </Layout>
  );
};
