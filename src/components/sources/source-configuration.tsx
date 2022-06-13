//import { useState, useEffect, Key } from 'react';
//import { useHistory, Link } from 'react-router-dom';
//import { Layout, Row, Col, Select, Input, Radio, RadioChangeEvent, Button } from 'antd';
//import { t } from '../../utils/transShim';
//import { CountrySelector } from '../../small-components/CountrySelector';
//import { Switch } from '../../small-components/Switch';
//import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
//import { Selector, SelectorValue } from '../../small-components/form/selector';
//import { LeftOutlined } from '@ant-design/icons';
//import { getSources } from '../../redux/sources/sourcesThunk';
import '../../sass/sources-settings.scss';

export const SourceConfiguration = () => {
  return <></>;
  //const [supplierValue, setSupplierValue] = useState('Supplier');
  //const [, setSelectedAccount] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  //const [to, setTo] = useState<string>('');
  //const dispatch = useAppDispatch();
  //const { templates } = useAppSelector((state) => state.templates);
  //const history = useHistory();
  //const selectedSource = localStorage.getItem('selectedSource');
  //const { sources, sourcesLoading } = useAppSelector((state) => state.sources);

  //// Source Fields
  ////const [userId, setUserId] = useState<string>();
  ////const [sourceId, setSourceId] = useState<number>();
  ////const [sourceName, setSourceName] = useState<string>();
  ////const [markup, setMarkup] = useState<number | null | undefined>();
  ////const [markupSelect, setMarkupSelect] = useState<string | null | undefined>();
  ////const [templateId, setTemplateId] = useState<number | null | undefined>();
  ////const [monitorStock, setMonitorStock] = useState<string | null | undefined>();
  ////const [monitorPrice, setMonitorPrice] = useState<string | null | undefined>();
  ////const [monitorPriceDecrease, setMonitorPriceDecrease] = useState<string | null | undefined>();
  ////const [monitorPriceDecreasePercentage, setmonitorPriceDecreasePercentage] = useState<number | undefined>();
  ////const [returns, setReturns] = useState<string | null | undefined>();
  ////const [dispatchDays, setDispatchDays] = useState<number | null>();
  ////const [globalShippingProgram, setGlobalShippingProgram] = useState<boolean | null>(false);
  ////const [defaultLocationPostcode, setDefaultLocationPostcode] = useState<string | null | undefined>();
  ////const [defaultLocationCity, setDefaultLocationCity] = useState<string | null | undefined>();
  ////const [defaultLocationCountry, setDefaultLocationCountry] = useState<string | null | undefined>();
  ////const [maxDeliveryDays, setMaxDeliveryDays] = useState<number | null | undefined>();
  ////const [primeOnly, setPrimeOnly] = useState<boolean | null | undefined>();

  //const initialStateSourceSettings = () => {
  //  setSelectedAccount('Select Supplier');
  //  setSupplierValue(selectedSource ? selectedSource : '');
  //  history.goBack();
  //  setTo('/sources');
  //};

  //const TempOptions = templates?.map((c: { id: Key | null | undefined; name: string | null | undefined }) => { return { label: c.name, value: c.id };});
  //const sourceOptions = sources?.map((c: { sourceId: Key | null | undefined; sourceName: string | null | undefined }) => { return { label: c.sourceName, value: c.sourceId };});


  //const [disableRadioLimit, setDisableRadioLimit] = useState(true);
  //const [limitValue, setLimitValue] = useState('NoLimit');
  //const onChange = (e: RadioChangeEvent) => {
  //  if (e.target.value == 'NoLimit') {
  //    setDisableRadioLimit(true);
  //  }
  //  else {
  //    setDisableRadioLimit(false);
  //  }
  //  setLimitValue(e.target.value);
  //};

  //const [hideMarkupInput, setHideMarkupInput] = useState(true);
  //const [selectLimit, setSelectLimit] = useState(true);
  //const [hideMonitorStock, setHideMonitorStock] = useState(false);
  //const [hidePriceDecrease, setHidePriceDecrease] = useState(false);
  //const [hideCustomPrice, setHideCustomPrice] = useState(true);
  //const [customPriceDecreaseDRD, setCustomPriceDecreaseDRD] = useState('custom');
  //const handleMarkupChange = (value: SelectorValue) => {
  //  setMarkupSelect(value as string);
  //  if (value === 'custom') {
  //    setHideMarkupInput(false);
  //  }
  //  else {
  //    setHideMarkupInput(true);
  //  }
  //};
  //const handleTemplateChange = (value: SelectorValue) => {
  //  setTemplateId(value as number);
  //};

  //function loadDefault() {

  //  //markup business logic implements
  //  setMarkup(null);

  //  // selected template
  //  setTemplateId(null);
  //  // monitor stock
  //  setMonitorStock(null);

  //  // monitor price
  //  setMonitorPrice(null);

  //  // monitor price decrease
  //  setMonitorPriceDecrease(null);

  //  // monitor price decrease Percentage
  //  setmonitorPriceDecreasePercentage(undefined);

  //  // return days
  //  setReturns(null);

  //  // dispatch days
  //  setDispatchDays(null);

  //  // Global Shipping Program
  //  setGlobalShippingProgram(null);

  //  // Default Location Postcode
  //  setDefaultLocationPostcode(null);

  //  // Default Location City
  //  setDefaultLocationCity(null);

  //  // Default Location City
  //  setDefaultLocationCountry(null);

  //  // Default Location City
  //  setMaxDeliveryDays(null);

  //  // Default Prime Only 
  //  setPrimeOnly(null);

  //}

  //function loadSource(selectedSource: string | null) {
  //  sources.map((c: {
  //    userId: string | undefined;
  //    sourceId: number | null | undefined;
  //    sourceName: string;
  //    markup: number | undefined;
  //    templateId: number | undefined;
  //    monitorStock: boolean | undefined;
  //    monitorPrice: boolean | undefined;
  //    monitorPriceDecrease: boolean | undefined;
  //    monitorPriceDecreasePercentage: number | undefined;
  //    returns: string | undefined;
  //    dispatchDays: number | undefined;
  //    globalShippingProgram: boolean;
  //    defaultLocationPostcode: string | undefined;
  //    defaultLocationCity: string | undefined;
  //    defaultLocationCountry: string | undefined;
  //    maxDeliveryDays: number | undefined;
  //    primeOnly: boolean | undefined;
  //  }) => {

  //    if (c.sourceId === Number(selectedSource) || c.sourceName === selectedSource) {

  //      setSourceId(Number(c.sourceId));

  //      setUserId(c.userId);

  //      setSourceName(c.sourceName);

  //      //markup business logic implements
  //      setMarkup(c.markup ? c.markup : undefined);
  //      setMarkupSelect(c.markup ? 'custom' : 'default');
  //      setHideMarkupInput(c.markup ? false : true);

  //      // selected template
  //      setTemplateId(c.templateId ? c.templateId : undefined);

  //      // monitor stock
  //      if (c.monitorStock === false) {
  //        setMonitorStock('false');
  //      } else if (c.monitorStock === true) {
  //        setMonitorStock('true');
  //      }

  //      // monitor price
  //      if (c.monitorPrice === false) {
  //        setMonitorPrice('false');
  //      } else if (c.monitorStock === true) {
  //        setMonitorPrice('true');
  //      }
  //      // monitor price decrease
  //      if (c.monitorPriceDecrease === false) {
  //        setMonitorPriceDecrease('false');
  //      } else if (c.monitorStock === true) {
  //        setMonitorPriceDecrease('true');
  //      }
  //      // monitor price decrease Percentage
  //      setmonitorPriceDecreasePercentage(c.monitorPriceDecreasePercentage);
  //      if (c.monitorPriceDecreasePercentage) {
  //        setHideCustomPrice(false);
  //        setSelectLimit(true);
  //      }

  //      // return days
  //      setReturns(c.returns?.toString());

  //      // dispatch days
  //      setDispatchDays(c.dispatchDays);

  //      // Global Shipping Program
  //      setGlobalShippingProgram(c.globalShippingProgram);

  //      // Default Location Postcode
  //      setDefaultLocationPostcode(c.defaultLocationPostcode);

  //      // Default Location City
  //      setDefaultLocationCity(c.defaultLocationCity);

  //      // Default Location Country
  //      setDefaultLocationCountry(c.defaultLocationCountry);

  //      // Max Delivery Days
  //      setMaxDeliveryDays(c.maxDeliveryDays);

  //      // Default Prime Only 
  //      setPrimeOnly(c.primeOnly);

  //      setSupplierValue(c.sourceName);
  //    }
  //  });
  //}

  //const onSave = async () => {
  //  //await dispatch(
  //    //saveSources(values)
  //  //);
  //  dispatch(getSources());
  //};

  //function save() {
    
  //}

  //const handleOptionChange = (value: SelectorValue) => {
  //  loadSource(value as string);
  //};

  //const handleMarkupValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setMarkup(Number(event.target.value));
  //};

  //const handleMonitorPriceDecreasePercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setmonitorPriceDecreasePercentage(Number(event.target.value));
  //};

  //const handleMonitorStock = (value: SelectorValue) => {
  //  if (value === 'false') {
  //    setHideMonitorStock(true);
  //  }
  //  else {
  //    setHideMonitorStock(false);
  //  }
  //  setMonitorStock(value as string);
  //};

  //const handlMonitorPrice = (value: SelectorValue) => {
  //  setMonitorPrice(value as string);
  //};

  //const handlePriceChange = (value: string) => {
  //  if (value === 'false') {
  //    setHidePriceDecrease(true);
  //  }
  //  else {
  //    setHidePriceDecrease(false);
  //  }
  //  setMonitorPriceDecrease(value);
  //};

  //const handleCustomPriceChange = (value: string) => {

  //  console.log('handleCustomPriceChange: ' + value);
  //  setCustomPriceDecreaseDRD(value);
  //  if (value === 'custom') {
  //    setHideCustomPrice(false);
  //  }
  //  else {
  //    setHideCustomPrice(true);
  //  }
  //};

  //const handleReturnsChange = (value: string) => {
  //  setReturns(value);
  //};

  //const handleDispatchDays = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setDispatchDays(Number(event.target.value));
  //};

  //const handleGlobalShippingProgram = (value: boolean) => {
  //  setGlobalShippingProgram(Boolean(value));
  //};

  //const handleDefaultLocationPostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setDefaultLocationPostcode(event.target.value);
  //};

  //const handleDefaultLocationCity = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setDefaultLocationCity(event.target.value);
  //};

  //const handleDefaultLocationCountry = (value: string) => {
  //  setDefaultLocationCountry(value);
  //};

  //const handleMaxDeliveryDays = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  setMaxDeliveryDays(Number(event.target.value));
  //};

  //const handlePrimeOnly = (value: boolean) => {
  //  setPrimeOnly(Boolean(value));
  //};

  //useEffect(() => {
  //  dispatch(getSources());
  //  setSupplierValue(selectedSource ? selectedSource : '');
  //  if (selectedSource) {
  //    loadSource(selectedSource);
  //  }
  //}, [getSources]);

  //return (
  //  <Layout className="sources-settings-container">
  //    <div className="sources-description">
  //      <Link to={to} className="back-link" onClick={() => initialStateSourceSettings()}>
  //        <span className="back-arrow">
  //          <LeftOutlined style={{fontSize: '19px'}} />
  //        </span>
  //        Back to suppliers overview
  //      </Link>
  //    </div>

  //    <h1 className="sources-config-name">
  //      Source: <span> {supplierValue}</span>
  //    </h1>

  //    <main className="main-content">

  //      <Row gutter={[{ xs: 32, lg: 50 }, 10]} className="row rowStyle">
  //        <Col xs={16} lg={12} className="description-area">
  //          <h2>Markup %</h2>
  //          <p>
  //            Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
  //            markup means that a product that costs £100 will be on sale for £140.
  //          </p>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <Selector
  //            value={markupSelect ? markupSelect : 'default'}
  //            defaultValue="Defined by Settings(30)"
  //            onChange={handleMarkupChange}>
  //            {
  //              [
  //                { label: 'Defined by Settings(30)', value:'default' },
  //                { label: 'Custom', value:'custom' }
  //              ]
  //            }
  //          </Selector>

  //          <div className="input-control" >
  //            <Input value={markup ? markup : undefined} hidden={hideMarkupInput} type="number" name="markup" onChange={handleMarkupValue} />
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Default template</h2>
  //          <p>
  //            Define the look and feel of your listings. You can see different options under the{' '}
  //            <span className="blue-normal-text">Settings</span>
  //            <span className="blue-normal-text"> &gt; Templates</span>
  //          </p>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <Selector value={templateId ? templateId.toString() : undefined} onChange={handleTemplateChange}>{TempOptions}</Selector>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Monitor stock</h2>
  //          <p>
  //            If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
  //            is available again, we will automatically update your store again.
  //          </p>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <Selector defaultValue="0" onChange={handleMonitorStock} value={monitorStock ? monitorStock : 'Defined by Settings(Yes)'}>
  //            {
  //              [
  //                { label: 'Defined by Settings(Yes)', value: '0' },
  //                { label: 'Yes', value: 'true' },
  //                { label: 'No', value: 'false' }
  //              ]
  //            }
  //          </Selector>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle" hidden={hideMonitorStock}>
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Monitor price</h2>
  //          <p>
  //            If the supplier changes the price of a product, we will automatically update accordingly to keep your
  //            profit with the corresponding markup.
  //          </p>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <Selector defaultValue="0" value={monitorPrice ? monitorPrice : 'Defined by Settings(Yes)'} onChange={handlMonitorPrice}>
  //            {
  //              [
  //                { label: 'Defined by Settings(Yes)', value: '0' },
  //                { label: 'Yes', value: 'true' },
  //                { label: 'No', value: 'false' }
  //              ]
  //            }
  //          </Selector>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 20]} className="row rowStyle" hidden={hideMonitorStock}>
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Price decrease</h2>
  //          <p>
  //            If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this
  //            off, we will only update the price when it goes up in the supplier’s catalog.
  //          </p>
  //          <div className="divPadding" hidden={hidePriceDecrease}>
  //            <p>
  //              No limit: If the price on the supplier goes down, your price will go down too.
  //            </p>
  //          </div>
  //          <div className="divPadding" hidden={hidePriceDecrease}>
  //            <p>
  //              Example: (limit 20%) Your price will be updated only if the price at the source is reduced less than 20%.
  //              If the price at the source lowers 21% or more, your price will not be updated.
  //            </p>
  //          </div>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <br />
  //          <Select defaultValue="0" onChange={handlePriceChange} value={monitorPriceDecrease ? monitorPriceDecrease : 'Defined by Settings(yes)'}>
  //            {
  //              [
  //                { label: 'Defined by Settings(Yes)', value: '0' },
  //                { label: 'Yes', value: 'true' },
  //                { label: 'No', value: 'false' }
  //              ]
  //            }
  //          </Select>
  //          <div className="divPadding" hidden={hidePriceDecrease}>
  //            <Select defaultValue="0" onChange={handleCustomPriceChange} value={customPriceDecreaseDRD ? customPriceDecreaseDRD : ''}>
  //              {
  //                [
  //                  { label: 'Defined by Settings(0)', value: '0' },
  //                  { label: 'custom', value: 'custom' },
  //                ]
  //              }
  //            </Select>
  //          </div>
  //          <div className="input-control divPadding" hidden={hidePriceDecrease || hideCustomPrice}>
  //            <Radio.Group onChange={onChange} value={limitValue}>
  //              <Radio value="NoLimit" key="1">No Limit</Radio>
  //              <br />
  //              <div id="container">
  //                <div id="left">
  //                  <Radio value="Limit" key="2" checked={selectLimit}>Limit % </Radio>
  //                </div>
  //                <div id="right">
  //                  <Input disabled={disableRadioLimit} type="number" size="small" value={monitorPriceDecreasePercentage ? monitorPriceDecreasePercentage : undefined} onChange={handleMonitorPriceDecreasePercentage} />
  //                </div>
  //              </div>
  //            </Radio.Group>
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Returns</h2>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <Select defaultValue="Days_14" value={returns ? returns : 'Select'} onChange={handleReturnsChange}>
  //            {
  //              [
  //                { label: 'Days_14', value: '14 Days' },
  //                { label: 'Days_30', value: '30 Days' },
  //                { label: 'Days_60', value: '60 Days' },
  //                { label: 'No_Returns', value: 'No Return' },
  //              ]
  //            }
  //          </Select>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Shipping</h2>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Dispatch Days</h2>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <div className="input-control" >
  //            <Input type="number" value={dispatchDays ? dispatchDays : undefined} onChange={handleDispatchDays} />
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>GSP</h2>
  //        </Col>
  //        <Col className="switch-container" xs={7} lg={6}>
  //          <div className="input-control">
  //            <Switch checkedChildren="On" unCheckedChildren="Off" checked={globalShippingProgram ? globalShippingProgram : false} onChange={handleGlobalShippingProgram} />
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Overwrite Item Postcode</h2>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <div className="input-control" >
  //            <Input type="text" value={defaultLocationPostcode ? defaultLocationPostcode : undefined} onChange={handleDefaultLocationPostcode} />
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Overwrite Item City</h2>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <div className="input-control" >
  //            <Input type="text" value={defaultLocationCity ? defaultLocationCity : undefined} onChange={handleDefaultLocationCity} />
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Overwrite Item Country Code</h2>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <CountrySelector defaultValue="Default" value={defaultLocationCountry ? defaultLocationCountry : 'Default'} onChange={handleDefaultLocationCountry}></CountrySelector>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Max delivery days</h2>
  //          <p>
  //            If the delivery time exceeds the maximum delivery days, the item will be marked as Out Of Stock
  //          </p>
  //        </Col>
  //        <Col className="selector-container" xs={7} lg={6}>
  //          <div className="input-control" >
  //            <Input type="text" value={maxDeliveryDays ? maxDeliveryDays : undefined} onChange={handleMaxDeliveryDays} />
  //          </div>
  //        </Col>
  //      </Row>

  //      <Row gutter={[{ xs: 32, lg: 50 }, 0]} className="row rowStyle">
  //        <Col className="description-area" xs={16} lg={12}>
  //          <h2>Only Prime</h2>
  //        </Col>
  //        <Col className="switch-container" xs={7} lg={6}>
  //          <div className="input-control" >
  //            <Switch checkedChildren="On" unCheckedChildren="Off" checked={primeOnly ? primeOnly : false} onChange={handlePrimeOnly} />
  //          </div>
  //        </Col>
  //      </Row>
  //    </main>

  //    <div className="control-section">
  //      <Selector defaultValue={selectedSource ? selectedSource : 'Select Supplier'} loading={sourcesLoading} onChange={handleOptionChange}>
  //        {sourceOptions}
  //      </Selector>
  //      <div className="action-btns">
  //        <Button type="primary" onClick={save}>{t('SaveChanges')}</Button>
  //        <Button onClick={loadDefault}>{t('ResetToDefault')}</Button>
  //      </div>
  //    </div>
  //  </Layout>
  //);
};
