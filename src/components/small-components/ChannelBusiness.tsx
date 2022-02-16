import { Input, Row, Col, Radio } from 'antd';
import { Selector } from '../small-components/Selector';
import { dummyDeliver, dummyDuration } from 'src/dummy-data/dummyData';
import { Switch } from '../small-components/Switch';

export const ChannelBusiness = () => {
  return (
    <>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Use Business Policies</h2>
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
          <h2>Returns</h2>
        </Col>
        <Col span={8}>
          <Selector defaultValue="30 days">{dummyDuration}</Selector>
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Terminate if Out of Stock for too long</h2>
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
          <h2>Delivery</h2>
        </Col>
        <Col span={8}>
          <Selector defaultValue="Parcelforce 24, 1 day">{dummyDeliver}</Selector>
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col className="description-area" span={12}>
          <h2>Forbidden words in URL</h2>
          <p>Determines whether the system will also look into the Source URL to find any of the fobidden words.</p>
        </Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col className="setting-list-item" span={12}>
          <h2>Dispatch Days</h2>
        </Col>
        <Col span={8}>
          <Input className="blue-input" value="Other test return" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Other test return</h2>
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
          <h2>Location Postcode</h2>
          <p>Postal code to use as the location of your items.</p>
        </Col>
        <Col span={8}>
          <Input className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Location City</h2>
          <p>City to use as the location of your items.</p>
        </Col>
        <Col span={8}>
          <Input value="London" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>eBay Payment method</h2>
        </Col>
        <Col span={8}>
          <Radio>eBay Managed Payments</Radio>
          <Radio>Paypal</Radio>
        </Col>
      </Row>
    </>
  );
};
