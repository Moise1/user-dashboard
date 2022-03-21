import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { ChevronLeft } from 'react-feather';
// import AutoOrdering from '../auto-ordering/AutoOrdering';
// import { SourcesSettingsContents } from './SourcesSettingsContents';
import { t } from '../../utils/transShim';
import { SuccessBtn, ResetBtn } from '../small-components/ActionBtns';
import { Selector } from '../small-components/Selector';
import { dummyData } from 'src/dummy-data/dummyData';
import { Switch } from '../small-components/Switch';
import '../../sass/sources-settings.scss';

export const SourcesSettings = () => {
  const [supplierValue, setSupplierValue] = useState('Supplier');
  const [, setSelectedAccount] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  const [to, setTo] = useState<string>('');
  const history = useHistory();

  const initialStateSourceSettings = () => {
    setSelectedAccount('Select Supplier');
    setSupplierValue('');
    history.goBack();
    setTo('/sources');
  };

  const handleOptionChange = (value: string) => setSupplierValue(value);

  return (
    <Layout className="sources-settings-container">
      <div className="sources-description">
        <Link to={to} className="back-link" onClick={() => initialStateSourceSettings()}>
          <span className="back-arrow">
            <ChevronLeft />
          </span>
          Back to suppliers overview
        </Link>
      </div>

      <h1 className="sources-config-name">
        Source: <span> {supplierValue}</span>
      </h1>

      <main className="main-content">
        <Row gutter={[{ xs: 32, lg: 50}, 10]} className="row">
          <Col xs={16} lg={12} className="description-area">
            <h2>Markup %</h2>
            <p>
            Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
            markup means that a product that costs £120 will be on sale for £140.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Defined by Settings(30)">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Default template</h2>
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

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Monitor stock</h2>
            <p>
            If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
            is available again, we will automatically update your store again.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Defined by Settings(yes)">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Monitor price</h2>
            <p>
            If the supplier changes the price of a product, we will automatically update accordingly to keep your profit
            with the corresponding markup.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Defined by Settings(Yes)">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Price descrease</h2>
            <p>
            If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this off,
            we will only update the price when it goes up in the supplier’s catalog.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Defined by Settings(Yes)">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Returns</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Select">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Shipping</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Select">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Dispatch Days</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Select">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>GSP</h2>
          </Col>
          <Col className="switch-container" xs={7} lg={6}>
            <Switch />
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Overwrite Item Postcode</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Default">{dummyData}</Selector>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Overwrite Item City</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Default">{dummyData}</Selector>
          </Col>
        </Row>
        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Overwrite Item Country Code</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <Selector defaultValue="Default">{dummyData}</Selector>
          </Col>
        </Row>
      </main>
      
      <div className="control-section">
        <Selector defaultValue="Select Supplier" onChange={handleOptionChange}>
          {dummyData}
        </Selector>
        <div className="action-btns">
          <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
          <ResetBtn>{t('ResetToDefault')}</ResetBtn>
        </div>
      </div>
    </Layout>
  );
};
