import { Input, Row, Col, Radio } from 'antd';
import { Switch } from '../small-components/Switch';

export const ChannelMonitoring = () => {
  return (
    <>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Markup %</h2>
          <p>
            Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
            markup means that a product that costs £100 will be on sale for £140.
          </p>
        </Col>
        <Col span={8} className="input-container">
          <Input value="30" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Monitor stock</h2>
          <p>
            If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
            is available again, we will automatically update your store again.
          </p>
        </Col>
        <Col span={8} className="switch-container">
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Monitor price</h2>
          <p>
            If the supplier changes the price of a product, we will automatically update accordingly to keep your profit
            with the corresponding markup.
          </p>
        </Col>
        <Col span={8} className="switch-container">
          <Switch />
        </Col>
      </Row>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Monitor Price Decrease</h2>
          <p>
            If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this off,
            we will only update the price when it goes up in the supplier&apos;s catalog.
          </p>
          <br />
          <p>
            Example: (limit 20%) Your price will be updated only if the price at the source is reduced less thank 20%.
            If the price at the source lowers 21% or more, your price will not be updated.
          </p>
          <br />
        </Col>
        <Col span={8} className="limit-section">
          <div className="switch-container">
            <Switch />
          </div>
          <div className="limit-area">
            <Radio className="radio">No Limit</Radio>
            <div className="limit">
              <Radio className="radio">Limit %</Radio>
              <Input value="30" className="blue-input limit-input" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Min. Quantity</h2>
          <p>HGR will maintain this minimun quantity while the item is in stock.</p>
        </Col>
        <Col span={8} className="input-container">
          <Input className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Pending Price in .99</h2>
          <p>
            The prices for all the items will end in .99. If set to NO, the price will be the exact result from applying
            the markup to the price in the source.
          </p>
        </Col>
        <Col span={8} className="switch-container">
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Out of stock action</h2>
          <p>
            When an item is Out Of Stock at the source the quantity of the product is set to 0. Setting available
            quantity to 0 requires the “Out of stock” option enabled on eBay settings. If this feature is not enabled on
            your eBay store, you can also choose the option to increase the price to make sure the product is not sold
            if there is no stock available.
          </p>
        </Col>
        <Col span={8} className="stock-container">
          <div className="stock-area">
            <Radio className="radio">Set available quantity to 0</Radio>
            <div className="stock">
              <Radio className="radio">Increase price by</Radio>
              <Input value="30" className="blue-input stock-input" />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
