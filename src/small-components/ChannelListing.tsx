import { Input, Row, Col } from 'antd';
import { Switch } from './Switch';
import { Selector } from './Selector';
import { dummyData, dummyDuration } from '../dummy-data/dummyData';

export const ChannelListing = () => {
  return (
    <>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Forbidden Words</h2>
          <p>
            Prevent any listing from being submitted if it contains any of the words below. Comma separated list. You
            can add words referencing prohibited items. The software will scan the description and title of the listing
            to validate it before submitting it.
          </p>
        </Col>
        <Col span={8}>
          <Input value="30" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Listings Duration</h2>
          <p>Select the default duration of your listings. We recommend GTC if you have an eBay Store subscription.</p>
        </Col>
        <Col span={8}>
          <Selector defaultValue="GTC - Good Till Cancelled">{dummyDuration}</Selector>
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
          <h2>Monitor Price Descrease</h2>
          <p>
            If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this off,
            we will only update the price when it goes up in the supplier’s catalog.
          </p>
          <br />
          <p>
            Example: (limit 20%) Your price will be updated only if the price at the source is reduced less thank 20%.
            If the price at the source lowers 21% or more, your price will not be updated.
          </p>
          <br />
        </Col>
        <Col span={8} className="limit-section">
          <Switch />
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
          <h2>Minimum title length</h2>
          <p>
            Don&apos; t submit any listing whose title has less characters than specified here. Ebay listings can have
            up to 80 characters in the title.
          </p>
        </Col>
        <Col span={8}>
          <Input className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Title Suggestions</h2>
          <p>
            See a list of suggested keywords and titles when creating a new listing, based on the best selling items on
            that category.
          </p>
        </Col>
        <Col span={8}>
          <Switch />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Default Template</h2>
          <p>
            Define the look and feel of your listings. You can see different options under the Settings &gt; Templates
          </p>
        </Col>
        <Col span={8}>
          <Selector defaultValue="Plain">{dummyData}</Selector>
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>EAN/UPC - Default value</h2>
          <p>
            To be used when EAN/UPC is not found automatically when creating a listing. It can also be &quot;Does not
            apply&quot;.
          </p>
        </Col>
        <Col span={8}>
          <Input value="Does not apply" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Quantity - Default value</h2>
          <p>
            Default number of items for sale when creating a listing. This number can still be changed in each
            individual listing.{' '}
          </p>
        </Col>
        <Col span={8}>
          <Input value="1" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h2>Min. Images</h2>
          <p>
            We will generate more images (based on the existing ones) so that your eBay listing has at least the
            specified number of images.{' '}
          </p>
        </Col>
        <Col span={8}>
          <Input value="3" className="blue-input" />
        </Col>
      </Row>
    </>
  );
};
