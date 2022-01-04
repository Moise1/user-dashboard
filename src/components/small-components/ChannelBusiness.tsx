import { Input, Row, Col, Radio } from 'antd';
import { Selector } from '../small-components/Selector';
import { dummyDeliver, dummyDuration } from 'src/dummy-data/dummyData';
import { Switch } from '../small-components/Switch';

export const ChannelBusiness = () => {
  return (
    <>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Use Business Policies</h4>
          <p>
            Use your eBay seller profiles for shipping, returns and payments. If enabled, please configure the values
            for every source under Settings &gt; Sources
          </p>
        </Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Returns</h4>
        </Col>
        <Col span={8}>
          <Selector defaultValue="30 days">{dummyDuration}</Selector>
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Terminate if Out of Stock for too long</h4>
          <p>
            Automatically terminate listings that have been Out Of Stock for a number of consecutive days. It can take
            up to 24h.
          </p>
        </Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Delivery</h4>
        </Col>
        <Col span={8}>
          <Selector defaultValue="Parcelforce 24, 1 day">{dummyDeliver}</Selector>
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col className="description-area" span={12}>
          <h4>Forbidden words in URL</h4>
          <p>Determines whether the system will also look into the Source URL to find any of the fobidden words.</p>
        </Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col className="setting-list-item" span={12}>
          <h4>Dispatch Days</h4>
        </Col>
        <Col span={8}>
          <Input className="blue-input" value="Other test return" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Other test return</h4>
          <p>
            Global Shipping Program (GSP) aims to make international shipping easy for eBay sellers. With GSP you only
            have to ship your product to a warehouse in your own country, then eBay takes over and handles international
            delivery to the buyer.
          </p>
        </Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Location Postcode</h4>
          <p>Postal code to use as the location of your items.</p>
        </Col>
        <Col span={8}>
          <Input className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Location City</h4>
          <p>City to use as the location of your items.</p>
        </Col>
        <Col span={8}>
          <Input value="London" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>eBay Payment method</h4>
        </Col>
        <Col span={8}>
          <Radio>eBay Managed Payments</Radio>
          <Radio>Paypal</Radio>
        </Col>
      </Row>
    </> 
  );
};
