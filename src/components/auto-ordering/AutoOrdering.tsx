import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Alert, Select, Spin, Layout, Switch } from 'antd';
import { t } from '../../utils/transShim';
import { dummyUsers } from '../../dummy-data/dummyData';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { saveAutoOrdering } from '../../redux/auto-ordering/autoOrderingThunk';
import '../../sass/switch.scss';
import '../../sass/auto-ordering.scss';
// import hand from '../../assets/icons/hand.svg';
// import copy from '../../assets/icons/copy.svg';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import { Selector, SelectorValue } from '../../small-components/form/selector';
import { PlusCircleOutlined } from '@ant-design/icons';
import { getSourceConfiguration } from 'src/redux/source-configuration/sources.coonfiguration-thunk';
import { SourceConfigurationState } from '../../redux/source-configuration/source-configuration-slice';
import { getSources } from 'src/redux/sources/sourcesThunk';

export interface rawSettingInterface {
  key: number;
  value: string | number | undefined;
}
interface rawSettingValuesTypes {
  first?: string;
  alias?: string | number | undefined;
  userName?: string | number | undefined;
  userPassword?: string | number | undefined;
  otp?: string | number | undefined;
  phone?: string | number | undefined;
  firstName?: string | number | undefined;
  lastName?: string | number | undefined;
  streetLine1?: string | number | undefined;
  streetLine2?: string | number | undefined;
  postCode?: string | number | undefined;
  townCity?: string | number | undefined;
  provinceCountry?: string | number | undefined;
  country?: string | number | undefined;
  cardNumber?: string | number | undefined;
  cvcNumber?: string | number | undefined;
  giftMessage?: string | number | undefined;
  giftFrom?: string | number | undefined;
  ip?: string | number | undefined;
  port?: string | number | undefined;
  credentialsUserName?: string | number | undefined;
  credentialsPassword?: string | number | undefined;
  oPayment?: string | number | undefined;
  oGift?: string | number | undefined;
  saleyeePaymentPassword?: string | number | undefined;
  year?: string | number | undefined;
  month?: string | number | undefined;
  cardName?: string | number | undefined;
}
type LocationProps = {
  state: {
    name: string;
    autoOrderingFee: number | null;
    id: number;
  };
};
export const AutoOrdering = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    getSourceConfiguration();
    dispatch(getSources());
  }, []);

  const { loading } = useAppSelector((state) => state.saveAutoOrdering);
  const deleteLoading = useAppSelector((state) => state.deleteAutoOrders.loading);
  const { sources } = useAppSelector((state) => state.sources);
  const location = useLocation() as unknown as LocationProps;
  const { name, autoOrderingFee, id } = location.state;
  const {
    get: { settings },
  } = useAppSelector((state) => state.sourcesConfiguration as SourceConfigurationState);

  //For API
  const [channelOAuthId] = useState(590881);
  const [supplierId] = useState(-1);
  const [sourceId] = useState(id);
  console.log(sources);
  const rawSettingIntialValues: rawSettingValuesTypes = {
    first: ' ',
    alias: ' ',
    userName: ' ',
    userPassword: ' ',
    otp: ' ',
    phone: ' ',
    firstName: ' ',
    lastName: ' ',
    streetLine1: ' ',
    streetLine2: ' ',
    postCode: ' ',
    townCity: ' ',
    provinceCountry: ' ',
    country: ' ',
    cardNumber: ' ',
    cvcNumber: ' ',
    giftMessage: ' ',
    giftFrom: ' ',
    ip: ' ',
    port: ' ',
    credentialsUserName: ' ',
    credentialsPassword: ' ',
    oPayment: ' ',
    oGift: ' ',
    saleyeePaymentPassword: ' ',
    year: ' ',
    month: ' ',
    cardName: ' ',
  };

  const [rawSettings, setRawSetting] = useState<rawSettingInterface[]>([
    { key: 1, value: rawSettingIntialValues.first },
    { key: 8, value: rawSettingIntialValues.alias },
    { key: 5, value: rawSettingIntialValues.userName },
    { key: 6, value: rawSettingIntialValues.userPassword },
    { key: 7, value: rawSettingIntialValues.otp },
    { key: 4, value: rawSettingIntialValues.phone },
    { key: 12, value: rawSettingIntialValues.firstName },
    { key: 10, value: rawSettingIntialValues.lastName },
    { key: 11, value: rawSettingIntialValues.streetLine1 },
    { key: 13, value: rawSettingIntialValues.streetLine2 },
    { key: 17, value: rawSettingIntialValues.postCode },
    { key: 15, value: rawSettingIntialValues.townCity },
    { key: 16, value: rawSettingIntialValues.provinceCountry },
    { key: 14, value: rawSettingIntialValues.country },
    { key: 2, value: rawSettingIntialValues.cardNumber },
    { key: 22, value: rawSettingIntialValues.giftMessage },
    { key: 23, value: rawSettingIntialValues.giftFrom },
    { key: 26, value: rawSettingIntialValues.ip },
    { key: 27, value: rawSettingIntialValues.port },
    { key: 29, value: rawSettingIntialValues.credentialsUserName },
    { key: 30, value: rawSettingIntialValues.credentialsPassword },
    { key: 21, value: rawSettingIntialValues.oPayment },
    { key: 22, value: rawSettingIntialValues.oGift },
    { key: 32, value: rawSettingIntialValues.saleyeePaymentPassword },
    { key: 3, value: rawSettingIntialValues.cvcNumber },
    { key: 19, value: rawSettingIntialValues.month },
    { key: 20, value: rawSettingIntialValues.year }
  ]);
  const { Option } = Select;
  const [accountConfig, setAccountConfig] = useState<string>(''); //Value for account
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [disable, setDisabled] = useState<boolean>(false); //For disabling the selector 
  const [btnEnableDisable, setBtnEnableDisable] = useState<boolean>(true);
  const [aliasBtnEnableDisable, setAliasEnableDisable] = useState<boolean>(false);
  const [showAccConfig] = useState<boolean>(true); //For opening the accountConfig
  const [showEnabledAccount, setShowEnabledAccount] = useState<boolean>(false); //To display enabled accounts
  const showAccounts = (): void => setShowEnabledAccount(!showEnabledAccount); //To display enabled accounts
  const [trackingNo, setTrackingNo] = useState<boolean>(true); //To display Tracking number
  const trackingNoHandler = (): void => setTrackingNo(!trackingNo);
  const [enableDisable, setEnableDisable] = useState<string>('Enable'); //EnableDisable
  const [enableDisablePhoneNo, setEnableDisablePhoneNo] = useState<string>('Replace customers phone number'); //EnableDisablePhoneNumber
  const toggleEnableDisable = (): void => {
    enableDisable == 'Enable' ? setEnableDisable('Disabled') : setEnableDisable('Enable');
    enableDisable == 'Enable' ? setDisabled(true) : setDisabled(false);
  };
  const toggleEnableDisablePhoneNo = (): void => {
    enableDisablePhoneNo == 'Set customers phone number'
      ? setEnableDisablePhoneNo('Disabled')
      : setEnableDisablePhoneNo('Set customers phone number');
  };
  const [customProxy, setCustomProxy] = useState<boolean>(false); //To display the custom proxy form
  const handleCustomProxy = (): void => setCustomProxy(!customProxy);
  const [credentials, setCredentials] = useState<boolean>(false); //To display the crediential form
  const handleCredential = (): void => setCredentials(!credentials);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newAccount, setNewAccount] = useState({ value: '' });
  // const [, setCopied] = useState<boolean>(false);
  const handleOptionChange = (value: SelectorValue) => {
    setAccountConfig(value as string);
    setBtnEnableDisable(!btnEnableDisable);
    buttonRef.current?.style.backgroundColor === '#228b22';
  };
  const accountData = dummyUsers.filter((user) => user.alias === accountConfig)[0];
  const handleOptionClick = (): void => {
    setShowInput(!showInput);
  };
  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setNewAccount({ value: e?.currentTarget?.value });
  };
  const handleSubmit = () => {
    dummyUsers.push({ id: dummyUsers.length + 1, value: newAccount.value });
    setNewAccount({ value: '' });
  };

  const deleteAutoOrdering = () => {
    throw new Error('Function not implemented.');
  };

  const removeAccount = () => {
    confirm('Are you sure you want to remove this account? ');
    dispatch(deleteAutoOrdering(/*{ channelOAuthId, supplierId }*/));
  };

  const aliasHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[0].value = e.target.value;
    setAliasEnableDisable(!aliasBtnEnableDisable);
  };
  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[1].value = e.target.value;
  };
  const userPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[2].value = e.target.value;
  };
  const userOtpHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[3].value = e.target.value;
  };
  const userPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[4].value = e.target.value;
  };
  const userFirstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[5].value = e.target.value;
  };
  const userLastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[6].value = e.target.value;
  };
  const streetLine1Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[7].value = e.target.value;
  };
  const streetLine2Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[8].value = e.target.value;
  };
  const postCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[9].value = e.target.value;
  };
  const townCityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[10].value = e.target.value;
  };
  const provinceCountryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[11].value = e.target.value;
  };
  const countryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[12].value = e.target.value;
  };
  const cardNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[13].value = e.target.value;
  };
  const giftMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[14].value = e.target.value;
  };
  const giftFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[15].value = e.target.value;
  };
  const ipHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[16].value = e.target.value;
  };
  const portHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[17].value = e.target.value;
  };
  const credentialsUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[18].value = e.target.value;
  };
  const credentialsUserPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[19].value = e.target.value;
  };
  const cvcHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[20].value = e.target.value;
  };
  const monthHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[21].value = e.target.value;
  };
  const yearHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[22].value = e.target.value;
  };
  const cardNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[23].value = e.target.value;
  };
  const saleyeePaymentPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    rawSettings[24].value = e.target.value;
  };

  //Save Button Handler
  const saveAutoOrderHandler = () => {
    setRawSetting([
      { key: 8, value: rawSettingIntialValues.alias },
      { key: 5, value: rawSettingIntialValues.userName },
      { key: 6, value: rawSettingIntialValues.userPassword },
      { key: 7, value: rawSettingIntialValues.otp },
      { key: 4, value: rawSettingIntialValues.phone },
      { key: 12, value: rawSettingIntialValues.firstName },
      { key: 10, value: rawSettingIntialValues.lastName },
      { key: 11, value: rawSettingIntialValues.streetLine1 },
      { key: 13, value: rawSettingIntialValues.streetLine2 },
      { key: 17, value: rawSettingIntialValues.postCode },
      { key: 15, value: rawSettingIntialValues.townCity },
      { key: 16, value: rawSettingIntialValues.provinceCountry },
      { key: 14, value: rawSettingIntialValues.country },
      { key: 2, value: rawSettingIntialValues.cardNumber },
      { key: 22, value: rawSettingIntialValues.giftMessage },
      { key: 23, value: rawSettingIntialValues.giftFrom },
      { key: 26, value: rawSettingIntialValues.ip },
      { key: 27, value: rawSettingIntialValues.port },
      { key: 29, value: rawSettingIntialValues.credentialsUserName },
      { key: 30, value: rawSettingIntialValues.credentialsPassword },
      { key: 21, value: rawSettingIntialValues.oPayment },
      { key: 22, value: rawSettingIntialValues.oGift },
      { key: 32, value: rawSettingIntialValues.saleyeePaymentPassword },
      { key: 3, value: rawSettingIntialValues.cvcNumber },
      { key: 19, value: rawSettingIntialValues.month },
      { key: 20, value: rawSettingIntialValues.year }
    ]);
    console.log('The rawSetting', rawSettings);
    dispatch(saveAutoOrdering({ channelOAuthId, rawSettings, sourceId, supplierId }));
  };

  const btnDisabler = () => {
    if (btnEnableDisable === false && aliasBtnEnableDisable === true) {
      return false;
    } else {
      return true;
    }
  };
  console.log('setting', settings);
  console.log('fee', autoOrderingFee);
  return (
    <Layout className="orders-container">
      {loading || deleteLoading ? (
        <Spin />
      ) : (
        <>
          <h1 className="m-trbl">{name}</h1>
          <div className="auto-ordering-container">
            <div className="auto-ordering-left">
              <p className="auto-ordering-p">
                {autoOrderingFee === 1
                  ? 'The cost of this service is 1% of every sale you make. Billed monthly.'
                  : `${name} autoordering is free`}
              </p>
              {autoOrderingFee === 1 && (
                <a href="#" className="auto-ordering-a">
                  Configure Payment
                </a>
              )}
              <div className={accountConfig ? 'adjusted-main-container' : 'main-container'}>
                <div className="auto-ordering mt-22">
                  <div className="setting-list-item">
                    <h2>{t('AutoOrderingConfiguration.Enable/DisableAuto-ordering')}</h2>
                    <p className="auto-ordering-p-secondary">
                      Disabling auto-ordering will require you to manually process new orders.
                    </p>
                  </div>
                  <Switch onChange={showAccounts} />
                </div>

                <div className="auto-ordering mt-22">
                  <div className="setting-list-item">
                    <h2>{t('AutoOrderingConfiguration.Markasshippedonyourstore')}</h2>
                    <p className="auto-ordering-p-secondary">
                      If you disable this, after purchasing the product it wont be marked as shipped in your store
                    </p>
                  </div>
                  <Switch onChange={trackingNoHandler} defaultChecked />
                </div>
                {trackingNo && (
                  <>
                    <div className="auto-ordering mt-22">
                      <div className="setting-list-item">
                        <h2>{t('AutoOrderingConfiguration.Settrackingnumber')}</h2>
                        <p className="auto-ordering-p-secondary">
                          If you disable this, a generated tracking number wont be set in your store
                        </p>
                      </div>
                      <Switch className="switch" defaultChecked />
                    </div>
                  </>
                )}
                {showAccConfig && (
                  <>
                    <div className="select-account mt-30">
                      <h2>Enabled Accounts:</h2>
                      {showEnabledAccount && (
                        <ul>
                          <li>Test1</li>
                          <li>Test2</li>
                          <li>Test3</li>
                        </ul>
                      )}
                    </div>
                    <div className="select-account  mt-2">
                      <h3 className="account-config" style={{ color: '#262e80' }}>
                        {t('AutoOrderingConfiguration.AccountConfiguration')} :
                        <span className="account-alias">{accountData?.alias}</span>
                      </h3>
                      <Selector
                        size="large"
                        disabled={disable}
                        onChange={handleOptionChange}
                        dropdownRender={(menu: ReactNode) => (
                          <div className="dropdown-content mb-5">
                            <div className="action-ctrl">
                              {showInput ? (
                                <div className="input-container">
                                  <Input
                                    placeholder="Create account..."
                                    value={newAccount.value}
                                    name="newAccount"
                                    onChange={handleChange}
                                  />
                                  <a onClick={handleSubmit}>
                                    <PlusCircleOutlined style={{ fontSize: '19px' }} />
                                  </a>
                                </div>
                              ) : (
                                <ConfirmBtn handleClick={handleOptionClick}>New Account</ConfirmBtn>
                              )}
                            </div>
                            {menu}
                          </div>
                        )}
                      >
                        {dummyUsers.map(x => { return { value: x.id, label: x.value }; })}
                      </Selector>
                    </div>
                  </>
                )}
                <div className="account-details">
                  {showAccConfig && accountConfig && (
                    <>
                      {
                        name == 'Amazon ' &&
                        <Alert
                          className="mtb-20 alert-text "
                          message="Account must be prime or business prime"
                          type="info"
                        />
                      }
                      <Alert
                        className="mtb-20 alert-text"
                        message="We strongly encourage you NOT to use this account for your personal purchases. Our system is connected to this account and any manual intervention could cause issues with your orders."
                        type="info"
                      />
                      <div className="auto-ordering mt-2">
                        <div className="setting-list-item">
                          <h2>{enableDisable}</h2>
                          <p className="auto-ordering-p-secondary">
                            Orders will only be placed using enabled account. This account wont be used if disabled
                          </p>
                        </div>
                        <Switch onChange={toggleEnableDisable} defaultChecked />
                      </div>

                      <Form className="form" layout="vertical">
                        <Form.Item label="Alias" name="alias">
                          <Input
                            defaultValue={rawSettingIntialValues.alias}
                            className="blue-input"
                            name="alias"
                            onChange={aliasHandler}
                          />
                        </Form.Item>

                        <div className="platfrom-creds">
                          <Form.Item label={`${name} username`} name="userName">
                            <Input
                              defaultValue={rawSettingIntialValues.userName}
                              className="blue-input"
                              name="userName"
                              onChange={userNameHandler}
                            />
                          </Form.Item>

                          <Form.Item label={`${name} password`} name="userPassword">
                            <Input
                              defaultValue={rawSettingIntialValues.userPassword}
                              className="blue-input ml-1rem "
                              name="userPassword"
                              onChange={userPasswordHandler}
                            />
                          </Form.Item>
                        </div>
                        {
                          name == 'Amazon ' &&
                          <Form.Item label="OTP Code (2FA)" name="otp">
                            <a href="#" className="auto-ordering-a ">
                              Obtain your otp
                            </a>
                            <Input
                              defaultValue={rawSettingIntialValues.otp}
                              name="otp"
                              className="blue-input  "
                              onChange={userOtpHandler}
                            />
                            {/* <CopyToClipboard text="" onCopy={() => setCopied(true)}>
                          <img src={copy} alt="copy-icon" className="copy-icon" />
                        </CopyToClipboard> */}
                          </Form.Item>
                        }
                        <Form.Item label="Phone" name="phone">
                          <Input
                            defaultValue={rawSettingIntialValues.phone}
                            className="blue-input"
                            name="phone"
                            onChange={userPhoneHandler}
                          />
                        </Form.Item>
                        <div className="auto-ordering mt-2">
                          <div className="setting-list-item">
                            <h2>{enableDisablePhoneNo}</h2>
                            <p className="auto-ordering-p-secondary">
                              If you check this, your customer telephone number will be entered when placing the order.
                              By default it will be your phone number.
                            </p>
                          </div>
                          <Switch onChange={toggleEnableDisablePhoneNo} className="switch" defaultChecked />
                        </div>
                      </Form>
                      {
                        (name == 'VidaXL B2B') &&
                        (
                          <>
                            <h2 className="heading-style">Payment method</h2>
                            <Form.Item name="No" className="mt-4 paymentSelector">
                              <p>
                                Wallet is the only available payment method for VidaXL B2B. More methods will be added in the future.
                              </p>
                              <Select defaultValue="No" >
                                <Option value="No">Wallet </Option>
                              </Select>
                            </Form.Item>
                          </>
                        )
                      }
                      {
                        (name == 'Amazon ' || name == 'VidaXL'
                          || name === 'Banggood COM' || name === 'Banggood UK' || name === 'Banggood '
                        ) &&
                        (
                          <>
                            {
                              (name === 'VidaXL') &&
                              (
                                <Form className="form" layout="vertical">
                                  <Form.Item label="Contact email" name="giftFrom">
                                    <Input
                                      defaultValue={rawSettingIntialValues.giftFrom}
                                      name="giftFrom"
                                      className="blue-input"
                                      onChange={giftFromHandler}
                                    />
                                  </Form.Item>
                                </Form>
                              )
                            }
                            <h2 className="mt-2 heading-style">Billing Address</h2>
                            <Form className="form mt-4" layout="vertical">
                              <div className="platfrom-creds">
                                <Form.Item label="First name" name="firstName">
                                  <Input
                                    name="firstName"
                                    defaultValue={rawSettingIntialValues.firstName}
                                    className="blue-input"
                                    onChange={userFirstNameHandler}
                                  />
                                </Form.Item>

                                <Form.Item label="Last name(s)" name="lastName">
                                  <Input
                                    defaultValue={rawSettingIntialValues.lastName}
                                    name="lastName"
                                    className="blue-input ml-1rem "
                                    onChange={userLastNameHandler}
                                  />
                                </Form.Item>
                              </div>
                              <Form.Item label="Street Line 1" name="streetLine1">
                                <Input
                                  defaultValue={rawSettingIntialValues.streetLine1}
                                  name="streetLine1"
                                  className="blue-input"
                                  onChange={streetLine1Handler}
                                />
                              </Form.Item>

                              <Form.Item label="Street Line 2 (optional)" name="streetLine2">
                                <Input
                                  defaultValue={rawSettingIntialValues.streetLine2}
                                  name="streetLine2"
                                  className="blue-input"
                                  onChange={streetLine2Handler}
                                />
                              </Form.Item>

                              <Form.Item label="Post Code" name="postCode">
                                <Input
                                  defaultValue={rawSettingIntialValues.postCode}
                                  name="postCode"
                                  className="blue-input"
                                  onChange={postCodeHandler}
                                />
                              </Form.Item>

                              <Form.Item label="Town/City" name="townCity">
                                <Input
                                  defaultValue={rawSettingIntialValues.townCity}
                                  name="townCity"
                                  className="blue-input"
                                  onChange={townCityHandler}
                                />
                              </Form.Item>

                              <Form.Item label="Province/Country (if applicable)" name="provinceCountry">
                                <Input
                                  defaultValue={rawSettingIntialValues.provinceCountry}
                                  name="provinceCountry"
                                  className="blue-input"
                                  onChange={provinceCountryHandler}
                                />
                              </Form.Item>

                              <Form.Item label="Country" name="country">
                                <Input
                                  defaultValue={rawSettingIntialValues.country}
                                  name="country"
                                  className="blue-input"
                                  onChange={countryHandler}
                                />
                              </Form.Item>
                            </Form>
                          </>
                        )}
                      {
                        (name == 'Amazon ') &&
                        (
                          <>
                            <h2 className="heading-style">Payment</h2>
                            <Form.Item label="Use gift card " name="No" className="mt-4 paymentSelector">
                              <Select defaultValue="No">
                                <Option value="No">No </Option>
                                <Option value="If Possible">If Possible</Option>
                                <Option value="Ignore bank cards, use gift cards only">
                                  Ignore bank cards, use gift cards only
                                </Option>
                              </Select>
                            </Form.Item>

                            <h2 className="heading-style">Card</h2>
                            <Form.Item label="Card number" name="cardNumber" className="mt-4">
                              <Input
                                onChange={cardNumberHandler}
                                defaultValue={rawSettingIntialValues.cardNumber}
                                name="cardNumber"
                                className="blue-input"
                                placeholder="0000 0000 0000 0000"
                              />
                            </Form.Item>

                            <h2 className="heading-style">Gift</h2>
                            <Form.Item label="Mark as gift" className="giftSelector" name="No">
                              <Select defaultValue="No" >
                                <Option value="No">No</Option>
                                <Option value="Yes">Yes</Option>
                              </Select>
                            </Form.Item>

                            <Form className="form" layout="vertical">
                              <Form.Item label="Gift Message" name="giftMessage">
                                <Input
                                  defaultValue={rawSettingIntialValues.giftMessage}
                                  name="giftMessage"
                                  className="blue-input"
                                  onChange={giftMessageHandler}
                                />
                              </Form.Item>

                              <Form.Item label="Gift From" name="giftFrom">
                                <Input
                                  defaultValue={rawSettingIntialValues.giftFrom}
                                  name="giftFrom"
                                  className="blue-input"
                                  onChange={giftFromHandler}
                                />
                              </Form.Item>
                            </Form>
                          </>
                        )
                      }
                      {(name === 'JD Williams' || name === 'Costco ' || name === 'Costway' || name === 'Robert Dyas' ||
                        name === 'SaleYee' || name === 'Walmart' || name === 'Zavvi' || name === 'VidaXL'
                      ) && (
                        <>
                          <h1>Payment</h1>
                          {name === 'SaleYee'
                              && (
                                <>
                                  <h3>SaleYee payment password</h3>
                                  <Form.Item name="saleyeePaymentPassword" className="mt-4">
                                    <Input
                                      onChange={saleyeePaymentPasswordHandler}
                                      defaultValue={rawSettingIntialValues.saleyeePaymentPassword}
                                      name="saleyeePaymentPassword"
                                      className="blue-input"
                                      placeholder="0000 0000 0000 0000"
                                    />
                                  </Form.Item>
                                </>
                              )
                          }
                          <h4 className="heading-style">Card</h4>
                          {
                            (name === 'Costco ' || name === 'Walmart' || name === 'Zavvi' || name === 'JD Williams') ?
                              <h4>Last 4 digits of your card number (Card must be saved previously on {name})</h4>
                              :
                              <h4>Card number</h4>
                          }
                          <>
                            <Form className="form mt-4" layout="vertical">
                              <Form.Item name="cardNumber" className="mt-4">
                                <Input
                                  onChange={cardNumberHandler}
                                  defaultValue={rawSettingIntialValues.cardNumber}
                                  name="cardNumber"
                                  className="blue-input"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </Form.Item>
                              <Form.Item name="cvcNumber" label="CVV" className="mt-4">
                                <Input
                                  onChange={cvcHandler}
                                  defaultValue={rawSettingIntialValues.cvcNumber}
                                  name="cvcNumber"
                                  className="blue-input"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </Form.Item>
                            </Form>
                          </>
                        </>
                      )
                      }
                      {(name === 'Costway' || name === 'Robert Dyas'
                        || name === 'SaleYee' || name === 'VidaXL'
                      ) &&
                        (
                          <>
                            <Form className="form mt-4" layout="vertical">
                              <Form.Item name="cardName" label="Complete name that appears in the card" className="mt-4">
                                <Input
                                  onChange={cardNameHandler}
                                  defaultValue={rawSettingIntialValues.cardName}
                                  name="cardName"
                                  className="blue-input"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </Form.Item>

                              <div className="platfrom-creds">
                                <Form.Item label='Month' name="month">
                                  <Input
                                    defaultValue={rawSettingIntialValues.month}
                                    className="blue-input"
                                    name="month"
                                    onChange={monthHandler}
                                  />
                                </Form.Item>

                                <Form.Item label='Year' name="year">
                                  <Input
                                    defaultValue={rawSettingIntialValues.year}
                                    className="blue-input ml-1rem "
                                    name="year"
                                    onChange={yearHandler}
                                  />
                                </Form.Item>
                              </div>
                            </Form>
                          </>
                        )
                      }
                      {
                        (name === 'SaleYee') &&
                        (
                          <>
                            <h1>Other Options</h1>
                            <div className="auto-ordering mt-22">
                              <div className="setting-list-item">
                                <h2>Return Protection Service</h2>
                                <p className="auto-ordering-p-secondary">
                                  Enabling protection services could increse order&apos;s cost.
                                </p>
                              </div>
                              <Switch onChange={showAccounts} className="switch" />
                            </div>

                            <div className="auto-ordering mt-22">
                              <div className="setting-list-item">
                                <h2>Logistics Protection Service</h2>
                                <p className="auto-ordering-p-secondary">
                                  Enabling protection services could increse order&apos;s cost.
                                </p>
                              </div>
                              <Switch onChange={showAccounts} className="switch" />
                            </div>
                          </>
                        )
                      }
                      {
                        (name === 'Banggood COM' || name === 'Banggood UK' || name === 'Banggood ')
                        &&
                        (
                          <>
                            <h2 className="heading-style">Payment</h2>
                            <Form.Item label="Use Banggood Com points" name="No" className="mt-4 paymentSelector">
                              <Select defaultValue="No" >
                                <Option value="No">No</Option>
                                <Option value="Yes">Yes</Option>
                              </Select>
                            </Form.Item>

                            <Form.Item label="Payment method" className="giftSelector" name="No">
                              <Select defaultValue="Card" >
                                <Option value="Card">Card</Option>
                                <Option value="Paypal">Paypal</Option>
                              </Select>
                            </Form.Item>

                            <h2 className="heading-style">Card</h2>
                            <h4>Last 4 digits of your card number (Card must be saved previously on Banggood Com)</h4>

                            <Form.Item name="cardNumber">
                              <Input
                                defaultValue={rawSettingIntialValues.cardNumber}
                                name="cardNumber"
                                className="blue-input"
                                onChange={cardNumberHandler}
                              />
                            </Form.Item>
                          </>
                        )
                      }
                      <h1>Proxy</h1>
                      <div className="disable-account mt-4">
                        <div className="disable-account-text">
                          <h2>Custom proxy</h2>
                          <p>Use your own proxy for this supplier account</p>
                        </div>
                        <Switch onChange={handleCustomProxy} />
                      </div>
                      {customProxy && (
                        <>
                          <Form className="form mt-4" layout="vertical">
                            <div className="platfrom-creds">
                              <Form.Item label="Ip" name="ip">
                                <Input
                                  defaultValue={rawSettingIntialValues.ip}
                                  name="ip"
                                  className="blue-input"
                                  placeholder="111.111.11.1"
                                  onChange={ipHandler}
                                />
                              </Form.Item>

                              <Form.Item label="Port" name="port">
                                <Input
                                  placeholder="1234"
                                  defaultValue={rawSettingIntialValues.port}
                                  name="port"
                                  className="blue-input ml-1rem "
                                  onChange={portHandler}
                                />
                              </Form.Item>
                            </div>
                          </Form>

                          <div className="disable-account mt-4">
                            <div className="disable-account-text">
                              <h2 className="mr-4">Credentials</h2>
                            </div>
                            <Switch onChange={handleCredential} />
                          </div>
                          {credentials && (
                            <>
                              <Form className="form mt-4" layout="vertical">
                                <div className="platfrom-creds">
                                  <Form.Item label="Username" name="credentialsUserName">
                                    <Input
                                      defaultValue={rawSettingIntialValues.credentialsUserName}
                                      className="blue-input"
                                      name="credentialsUserName"
                                      onChange={credentialsUserNameHandler}
                                    />
                                  </Form.Item>

                                  <Form.Item label="Password" name="credentialsPassword">
                                    <Input
                                      name="credentialsPassword"
                                      defaultValue={rawSettingIntialValues.credentialsPassword}
                                      className="blue-input ml-1rem"
                                      onChange={credentialsUserPasswordHandler}
                                    />
                                  </Form.Item>
                                </div>
                              </Form>
                            </>
                          )}
                        </>
                      )}
                      <div className="remove-account mt-30">
                        <Button className="remove-account-btn" onClick={removeAccount}>
                          Remove account
                        </Button>
                        <p>
                          If you delete this account, you will have to set it up again and no payments will be made
                          through this account.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="auto-ordering-right">
              <div className="right-btn-wrapper">
                <button
                  onClick={saveAutoOrderHandler}
                  className="auto-ordering-btn"
                  disabled={btnDisabler()}
                  ref={buttonRef}
                  style={{ backgroundColor: '#5ac35a' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default AutoOrdering;
