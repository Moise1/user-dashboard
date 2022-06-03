/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Form, Checkbox } from 'antd';

import '../../sass/subscriptions/checkout.scss';

import { Selector } from '../../small-components/Selector';
import { ConfirmBtn } from '../../small-components/ActionBtns';

import { dummyData } from 'src/dummy-data/dummyData';

const { Item } = Form;

export const Checkout = (/*props: props*/) => {
  return (
    <Layout className="checkout-content">
      <div className="checkout-sections-container">
        <div className="first-section-container">
          <div className="extras">
            <div className="first-extra">
              <div className="extra-explanation">
                <Checkbox className="checkbox">
                  <h4>Add no api server</h4>
                  <p>Your store will be connected to our servers always</p>
                </Checkbox>
              </div>
              <div className="price-extra">
                <h6>£14.99</h6>
              </div>
            </div>
            <div className="second-extra">
              <div className="extra-explanation">
                <Checkbox className="checkbox">
                  <h4>Add 50 listings service</h4>
                  <p>50 hot selling products will be added to your store</p>
                </Checkbox>
              </div>
              <div className="price-extra">
                <h6>£14.99</h6>
              </div>
            </div>
          </div>
          <Form className="bulk-form" layout={'vertical'}>
            <Item label="Select your listings amount" name="sourceId">
              <Selector defaultValue="Up to 300 listings">{dummyData}</Selector>
            </Item>
          </Form>
        </div>
        <div className="second-section-container">
          <h3>Your order:</h3>
          <h4>Listings</h4>
          <h5>300 Listings</h5>
          <ConfirmBtn htmlType="submit">Confirm and checkout</ConfirmBtn>
        </div>
      </div>
    </Layout>
  );
};
