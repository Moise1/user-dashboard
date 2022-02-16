import { Row, Col } from 'antd';
import { Selector } from '../small-components/Selector';
import { dummyData } from 'src/dummy-data/dummyData';
import { Switch } from '../small-components/Switch';

export const SourcesSettingsContents = () => {
  return (
    <div className="sources-settings-contents">
      <Row gutter={[32,0]} className="row">
        <Col xs={16} lg={10} className="description-area">
          <h4>Markup %</h4>
          <p>
            Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
            markup means that a product that costs £100 will be on sale for £140.
          </p>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Defined by Settings(30)">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Default template</h4>
          <p>
            Define the look and feel of your listings. You can see different options under the{' '}
            <span className="blue-normal-text">Settings</span>
            <span className="blue-normal-text"> &gt; Templates</span>
          </p>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Defined by Settings(Plain)">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Monitor stock</h4>
          <p>
            If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
            is available again, we will automatically update your store again.
          </p>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Defined by Settings(yes)">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Monitor price</h4>
          <p>
            If the supplier changes the price of a product, we will automatically update accordingly to keep your profit
            with the corresponding markup.
          </p>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Defined by Settings(Yes)">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Price descrease</h4>
          <p>
            If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this off,
            we will only update the price when it goes up in the supplier’s catalog.
          </p>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Defined by Settings(Yes)">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Returns</h4>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Select">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Shipping</h4>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Select">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Dispatch Days</h4>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Select">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>GSP</h4>
        </Col>
        <Col className="switch-container" xs={7} lg={6}>
          <Switch />
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Overwrite Item Postcode</h4>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Default">{dummyData}</Selector>
        </Col>
      </Row>

      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Overwrite Item City</h4>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Default">{dummyData}</Selector>
        </Col>
      </Row>
      <Row gutter={[32, 0]} className="row">
        <Col className="description-area" xs={16} lg={10}>
          <h4>Overwrite Item Country Code</h4>
        </Col>
        <Col className="selector-container" xs={7} lg={6}>
          <Selector defaultValue="Default">{dummyData}</Selector>
        </Col>
      </Row>
    </div>
  );
};