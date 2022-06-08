import React, { ReactNode, useState, useRef } from 'react';
import { Form, Input, Button, Alert, Select, Spin, Layout } from 'antd';
import { t } from '../../utils/transShim';
import { PlusCircle } from 'react-feather';
import { Switch } from '../../small-components/Switch';
import { dummyUsers } from '../../dummy-data/dummyData';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { saveAutoOrdering } from '../../redux/auto-ordering/autoOrderingThunk';
import '../../sass/switch.scss';
import '../../sass/auto-ordering.scss';
// import hand from '../../assets/hand.svg';
// import copy from '../../assets/copy.svg';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import { Selector, SelectorValue } from '../../small-components/form/selector';

export interface rawSettingInterface {
  key: number;
  value: string | number | undefined;
}

interface rawSettingValuesTypes {
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
  giftMessage?: string | number | undefined;
  giftFrom?: string | number | undefined;
  ip?: string | number | undefined;
  port?: string | number | undefined;
  credentialsUserName?: string | number | undefined;
  credentialsPassword?: string | number | undefined;
  oPayment?: string | number | undefined;
  oGift?: string | number | undefined;
}

type LocationProps = {
  state: {
    name: Location;
    fee: number;
  };
};

export const AutoOrdering = () => {
  const { loading } = useAppSelector((state) => state.saveAutoOrdering);
  const deleteLoading = useAppSelector((state) => state.deleteAutoOrders.loading);
  const location = useLocation() as unknown as LocationProps;
  const { name, fee } = location.state;

  const dispatch = useAppDispatch();
  //For API
  const [channelOAuthId] = useState(590881);
  const [supplierId] = useState(-1);
  const [sourceId] = useState(1);

  const rawSettingIntialValues: rawSettingValuesTypes = {
    alias: '',
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
    giftMessage: ' ',
    giftFrom: ' ',
    ip: ' ',
    port: ' ',
    credentialsUserName: ' ',
    credentialsPassword: ' ',
    oPayment: ' ',
    oGift: ' '
  };

  const [rawSettings, setRawSetting] = useState<rawSettingInterface[]>([
    { key: 1, value: rawSettingIntialValues.alias },
    { key: 2, value: rawSettingIntialValues.userName },
    { key: 3, value: rawSettingIntialValues.userPassword },
    { key: 4, value: rawSettingIntialValues.otp },
    { key: 5, value: rawSettingIntialValues.phone },
    { key: 6, value: rawSettingIntialValues.firstName },
    { key: 7, value: rawSettingIntialValues.lastName },
    { key: 8, value: rawSettingIntialValues.streetLine1 },
    { key: 9, value: rawSettingIntialValues.streetLine2 },
    { key: 10, value: rawSettingIntialValues.postCode },
    { key: 11, value: rawSettingIntialValues.townCity },
    { key: 12, value: rawSettingIntialValues.provinceCountry },
    { key: 13, value: rawSettingIntialValues.country },
    { key: 14, value: rawSettingIntialValues.cardNumber },
    { key: 15, value: rawSettingIntialValues.giftMessage },
    { key: 16, value: rawSettingIntialValues.giftFrom },
    { key: 17, value: rawSettingIntialValues.ip },
    { key: 18, value: rawSettingIntialValues.port },
    { key: 19, value: rawSettingIntialValues.credentialsUserName },
    { key: 20, value: rawSettingIntialValues.credentialsPassword },
    { key: 21, value: rawSettingIntialValues.oPayment },
    { key: 22, value: rawSettingIntialValues.oGift }
  ]);

  //Form States For Toggle
  const { Option } = Select;
  const [accountConfig, setAccountConfig] = useState<string>('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [disable, setDisabled] = useState<boolean>(false); //For disabling the selector
  const [btnEnableDisable, setBtnEnableDisable] = useState<boolean>(true);
  const [aliasBtnEnableDisable, setAliasEnableDisable] = useState<boolean>(false);
  const [showAccConfig] = useState<boolean>(true); //For opening the accountConfig
  const [showEnabledAccount, setShowEnabledAccount] = useState<boolean>(false); //To display enabled accounts
  const showAccounts = (): void => setShowEnabledAccount(!showEnabledAccount); //To display enabled accounts
  const [trackingNo, setTrackingNo] = useState<boolean>(false); //To display Tracking number
  const trackingNoHandler = (): void => setTrackingNo(!trackingNo);
  const [enableDisable, setEnableDisable] = useState<string>('Enable'); //EnableDisable
  const [enableDisablePhoneNo, setEnableDisablePhoneNo] = useState<string>('Set customers phone number'); //EnableDisablePhoneNumber
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
    console.log('The vaulues of showAccConfig', showAccConfig);
    console.log('The value of accountConfig', accountConfig);
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
  const paymentHandler = (e: string) => {
    rawSettings[20].value = e;
  };
  const giftHandler = (e: string) => {
    rawSettings[21].value = e;
  };

  //Save Button Handler
  const saveAutoOrderHandler = () => {
    setRawSetting([
      { key: 1, value: rawSettingIntialValues.alias },
      { key: 2, value: rawSettingIntialValues.userName },
      { key: 3, value: rawSettingIntialValues.userPassword },
      { key: 4, value: rawSettingIntialValues.otp },
      { key: 5, value: rawSettingIntialValues.phone },
      { key: 6, value: rawSettingIntialValues.firstName },
      { key: 7, value: rawSettingIntialValues.lastName },
      { key: 8, value: rawSettingIntialValues.streetLine1 },
      { key: 9, value: rawSettingIntialValues.streetLine2 },
      { key: 10, value: rawSettingIntialValues.postCode },
      { key: 11, value: rawSettingIntialValues.townCity },
      { key: 12, value: rawSettingIntialValues.provinceCountry },
      { key: 13, value: rawSettingIntialValues.country },
      { key: 14, value: rawSettingIntialValues.cardNumber },
      { key: 15, value: rawSettingIntialValues.giftMessage },
      { key: 16, value: rawSettingIntialValues.giftFrom },
      { key: 17, value: rawSettingIntialValues.ip },
      { key: 18, value: rawSettingIntialValues.port },
      { key: 19, value: rawSettingIntialValues.credentialsUserName },
      { key: 20, value: rawSettingIntialValues.credentialsPassword },
      { key: 21, value: rawSettingIntialValues.oPayment },
      { key: 22, value: rawSettingIntialValues.oGift }
    ]);
    console.log('The rawSetting before using saveAutoOrdering Dispatch', rawSettings);
    dispatch(saveAutoOrdering({ channelOAuthId, supplierId, sourceId, rawSettings }));
  };

  const btnDisabler = () => {
    if (btnEnableDisable === false && aliasBtnEnableDisable === true) {
      return false;
    } else {
      return true;
    }
  };
  console.log('The value of btnDisabler', btnDisabler());
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
                {fee === 1
                  ? 'The cost of this service is 1% of every sale you make. Billed monthly.'
                  : `${name} autoordering is free`}
              </p>
              {fee === 1 && (
                <a href="#" className="auto-ordering-a">
                  Configure password
                </a>
              )}
              <div className={accountConfig ? 'adjusted-main-container' : 'main-container'}>
                <div className="auto-ordering mt-22">
                  <div className="setting-list-item">
                    <h2>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</h2>
                    <p className="auto-ordering-p-secondary">
                      Disabling auto-ordering will require you to manually process new orders.
                    </p>
                  </div>
                  <Switch onChange={showAccounts} className="switch" />
                </div>

                <div className="auto-ordering mt-22">
                  <div className="setting-list-item">
                    <h2>{t('SourceConfigInputs.MarkAsShippedOnYourStore')}</h2>
                    <p className="auto-ordering-p-secondary">
                      If you disable this, after purchasing the product it wont be marked as shipped in your store
                    </p>
                  </div>
                  <Switch onChange={trackingNoHandler} className="switch" />
                </div>
                {trackingNo && (
                  <>
                    <div className="auto-ordering mt-22">
                      <div className="setting-list-item">
                        <h2>{t('SourceConfigInputs.SetTrackingNumber')}</h2>
                        <p className="auto-ordering-p-secondary">
                          If you disable this, a generated tracking number wont be set in your store
                        </p>
                      </div>
                      <Switch className="switch" />
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
                        {t('SourceConfigInputs.AccountConfiguration')} :
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
                                    <PlusCircle className="add-icon" size="35" />
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
                      <Alert
                        className="mtb-20 alert-text "
                        message="Account must be prime or business prime"
                        type="info"
                      />
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
                        <Switch onChange={toggleEnableDisable} className="switch" />
                      </div>
                      {/* <fieldset disabled={!activeAccount}> */}
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
                          <Switch onChange={toggleEnableDisablePhoneNo} className="switch" />
                        </div>
                      </Form>
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

                      <h2 className="heading-style">Payment</h2>
                      <Form.Item label="Use gift card " name="No" className="mt-4 paymentSelector">
                        <Select defaultValue="No" onChange={paymentHandler}>
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
                        <Select defaultValue="No" onChange={giftHandler}>
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

                      {/* </fieldset> */}
                      <h2 className="heading-style">Proxy</h2>
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
