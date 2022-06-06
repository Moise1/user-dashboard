/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Form, Checkbox, Divider, Spin } from 'antd';

import '../../sass/subscriptions/checkout.scss';

import { ArrowRight } from 'react-feather';
import { Selector } from '../../small-components/Selector';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getSubscriptions } from 'src/redux/subscriptions/subsThunk';

import { dummyData } from 'src/dummy-data/dummyData';
//import { Product } from 'src/redux/subscriptions/subsSlice';

const { Item } = Form;

export const Checkout = (/*props: props*/) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [getSubscriptions]);

  const { /*products,*/ loading } = useAppSelector((state) => state.subscriptions);

  return loading ? (
    <Spin />
  ) : (
    <Layout className="checkout-content">
      <div className="title-container">
        <h1>Checkout</h1>
        <h3>Choose to add more to your current order</h3>
      </div>

      <div className="checkout-sections-container">
        <div className="first-section-container">
          <Form className="bulk-form" layout={'vertical'}>
            <Item label="Select your listings amount" name="sourceId">
              <Selector defaultValue="Up to 300 listings">{dummyData}</Selector>
            </Item>
          </Form>
          <div className="extras">
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
          </div>
        </div>
        <div className="second-section-container">
          <h3 className="title-ordersum">Your order:</h3>
          <div className="order-products">
            <div className="order-products-lines">
              <div className="product-order-line">
                <h5 className="title-orderdetails">300 Listings</h5>
              </div>
              <div className="product-order-line">
                <h5 className="title-orderdetails">No api server</h5>
              </div>
              <div className="product-order-line">
                <h5 className="title-orderdetails">10 Listings service</h5>
              </div>
            </div>
            <div className="order-products-price">
              <div className="price-extra">
                <h5>£19.00/month</h5>
              </div>
              <div className="price-extra">
                <h5>£12.99/month</h5>
              </div>
              <div className="price-extra">
                <h5>£9.99</h5>
              </div>
            </div>
          </div>

          <Divider />
          <div className="order-sum">
            <h2>Total to pay:</h2>
            <h1>£41.98</h1>
            <ConfirmBtn htmlType="submit">
              Continue <ArrowRight />
            </ConfirmBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
};
