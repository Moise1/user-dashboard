import { useState, useEffect, Key } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Row, Col, Select, Input } from 'antd';
import { ChevronLeft } from 'react-feather';
// import AutoOrdering from '../auto-ordering/AutoOrdering';
//import { /*SourcesSettingsContents*/ } from './SourcesSettingsContents';
import { t } from '../../utils/transShim';
import { SuccessBtn, ResetBtn } from '../../small-components/ActionBtns';
import { Selector } from '../../small-components/Selector';
import { SimpleSelect } from '../../small-components/SimpleSelect';
import { dummyData } from 'src/dummy-data/dummyData';
import { Switch } from '../../small-components/Switch';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { getSources } from '../../redux/source-config/sourcesThunk';
//import {ShippingOption} from '../../redux/source-config/sourceSlice';
import '../../sass/sources-settings.scss';

export const SourcesSettings = () => {
  const [supplierValue, setSupplierValue] = useState('Supplier');
  const [, setSelectedAccount] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  const [to, setTo] = useState<string>('');
  const dispatch = useAppDispatch();
  const { shippingOptions, loading } = useAppSelector((state) => state.sources);
  const { templates } = useAppSelector((state) => state.templates);
  const history = useHistory();
  const { Option } = Select;

  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

  const initialStateSourceSettings = () => {
    setSelectedAccount('Select Supplier');
    setSupplierValue('');
    history.goBack();
    setTo('/sources');
  };

  const TempOptions = templates?.map((c: { id: Key | null | undefined; name: string | null | undefined }) => {
    return (
      <Option key={c.id} value={c.id}>
        {c.name}
      </Option>
    );
  });

  const shippings = shippingOptions?.map((c: { id: Key | null | undefined; name: string | null | undefined }) => {
    return (
      <Option key={c.id} value={c.id}>
        {c.name}
      </Option>
    );
  });

  const [hideMarkupInput, setHideMarkupInput] = useState(true);

  const handleOptionChange = (value: string) => setSupplierValue(value);
  const handleMarkupChange = (value: string) => {
    if (value === 'custom') {
      setHideMarkupInput(false);
    }
    else {
      setHideMarkupInput(true);
    }
    console.log('markup value = ' + value);
    console.log('markup value = ' + hideMarkupInput);
  };

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
        <Row gutter={[{ xs: 32, lg: 50 }, 10]} className="row">
          <Col xs={16} lg={12} className="description-area">
            <h2>Markup %</h2>
            <p>
              Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
              markup means that a product that costs £100 will be on sale for £140.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <SimpleSelect defaultValue="Defined by Settings(30)" onChange={handleMarkupChange}>
              <Option value="" key="0">Defined by Settings(30)</Option>
              <Option value="custom" key="1">Custom</Option>
            </SimpleSelect>

            <div className="input-control" >
              <Input value="30" hidden={hideMarkupInput} type="number" />
            </div>
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
            <SimpleSelect defaultValue="Defined by Settings(Plain)">{TempOptions}</SimpleSelect>
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
            <SimpleSelect defaultValue="Defined by Settings(yes)">
              <Option value="" key="0">Defined by Settings(Yes)</Option>
              <Option value="yes" key="1">Yes</Option>
              <Option value="no" key="2">No</Option>
            </SimpleSelect>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Monitor price</h2>
            <p>
              If the supplier changes the price of a product, we will automatically update accordingly to keep your
              profit with the corresponding markup.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <SimpleSelect defaultValue="Defined by Settings(yes)">
              <Option value="" key="0">Defined by Settings(Yes)</Option>
              <Option value="yes" key="1">Yes</Option>
              <Option value="no" key="2">No</Option>
            </SimpleSelect>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Price decrease</h2>
            <p>
              If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this
              off, we will only update the price when it goes up in the supplier’s catalog.
            </p>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <SimpleSelect defaultValue="Defined by Settings(yes)">
              <Option value="" key="0">Defined by Settings(Yes)</Option>
              <Option value="yes" key="1">Yes</Option>
              <Option value="no" key="2">No</Option>
            </SimpleSelect>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Returns</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <SimpleSelect defaultValue="Select">
              <Option value="14" key="0">14 Days</Option>
              <Option value="30" key="1">30 Days</Option>
              <Option value="60" key="2">60 Days</Option>
              <Option value="no" key="3">No Return</Option>
            </SimpleSelect>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Shipping</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <SimpleSelect defaultValue="Select" loading={loading}>{shippings}</SimpleSelect>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Dispatch Days</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <div className="input-control" >
              <Input type="number" />
            </div>
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
            <div className="input-control" >
              <Input type="text" />
            </div>
          </Col>
        </Row>

        <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row">
          <Col className="description-area" xs={16} lg={12}>
            <h2>Overwrite Item City</h2>
          </Col>
          <Col className="selector-container" xs={7} lg={6}>
            <div className="input-control" >
              <Input type="text" />
            </div>
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
