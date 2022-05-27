import { ReactNode, useState, useRef } from 'react';
import { Form, Input, Button, Alert, Select } from 'antd';
import { t } from '../../utils/transShim';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PlusCircle } from 'react-feather';
import { Switch } from '../../small-components/Switch';
import { Selector } from '../../small-components/Selector';
import { dummyUsers } from '../../dummy-data/dummyData';
import { ConfirmBtn } from '../../small-components/ActionBtns';
// import hand from '../../assets/hand.svg';
// import copy from '../../assets/copy.svg';
import '../../sass/switch.scss';
import '../../sass/auto-ordering.scss';

export const AutoOrdering = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { Option } = Select;

  const [disable, setDisabled] = useState<boolean>(false); //For disabling the selector
  const [btnEnableDisable, setBtnEnableDisable] = useState<boolean>(false);
  const [accountConfig, setAccountConfig] = useState<string>('');
  const [showAccConfig] = useState<boolean>(true); //For opening the accountConfig

  console.log('The value of showAccConfig', showAccConfig);
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

  const handleOptionChange = (value: string) => {
    setAccountConfig(value);
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
  return (
    <>
      <h1 className="m-trbl">Amazon</h1>
      <div className="auto-ordering-container">
        <div className="auto-ordering-left">
          <p className="auto-ordering-p">The cost of order will come from api as it is dynamic.</p>{' '}
          <a href="#" className="auto-ordering-a">
            Configure password
          </a>
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
                    addAccount={true}
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
                    {dummyUsers}
                  </Selector>
                </div>
              </>
            )}
            <div className="account-details">
              {showAccConfig && accountConfig && (
                <>
                  <Alert className="mtb-20 alert-text " message="Account must be prime or business prime" type="info" />
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
                      <Input value={accountData?.alias} className="  blue-input" />
                    </Form.Item>

                    <div className="platfrom-creds">
                      <Form.Item label="Amazon username" name="value">
                        <Input value={accountData?.value} className="blue-input" />
                      </Form.Item>

                      <Form.Item label="Amazon password ">
                        <Input value={accountData?.password} className="blue-input ml-1rem " />
                      </Form.Item>
                    </div>
                    <Form.Item label="OTP Code (2FA)">
                      <a href="" className="auto-ordering-a ">
                        Obtain your otp
                      </a>
                      <Input className="blue-input" value={accountData?.otp} />
                      {/* <CopyToClipboard text="" onCopy={() => setCopied(true)}>
                          <img src={copy} alt="copy-icon" className="copy-icon" />
                        </CopyToClipboard> */}
                    </Form.Item>

                    <Form.Item label="Phone">
                      <Input value={accountData?.phone} className="blue-input" />
                    </Form.Item>
                    <div className="auto-ordering mt-2">
                      <div className="setting-list-item">
                        <h2>{enableDisablePhoneNo}</h2>
                        <p className="auto-ordering-p-secondary">
                          If you check this, your customer telephone number will be entered when placing the order. By
                          default it will be your phone number.
                        </p>
                      </div>
                      <Switch onChange={toggleEnableDisablePhoneNo} className="switch" />
                    </div>
                  </Form>
                  <h2 className="mt-2 heading-style">Billing Address</h2>
                  <Form className="form mt-4" layout="vertical">
                    <div className="platfrom-creds">
                      <Form.Item label="First name" name="value">
                        <Input value={accountData?.value} className="blue-input" />
                      </Form.Item>

                      <Form.Item label="Last name(s)">
                        <Input value={accountData?.password} className="blue-input ml-1rem " />
                      </Form.Item>
                    </div>
                    <Form.Item label="Street Line 1">
                      <Input value={accountData?.password} className="blue-input" />
                    </Form.Item>

                    <Form.Item label="Street Line 2 (optional)">
                      <Input value={accountData?.password} className="blue-input" />
                    </Form.Item>

                    <Form.Item label="Post Code">
                      <Input value={accountData?.password} className="blue-input" />
                    </Form.Item>

                    <Form.Item label="Town/City">
                      <Input value={accountData?.password} className="blue-input" />
                    </Form.Item>

                    <Form.Item label="Province/Country (if applicable)" name="alias">
                      <Input value={accountData?.alias} className="blue-input" />
                    </Form.Item>

                    <Form.Item label="Country" name="alias">
                      <Input value={accountData?.alias} className="blue-input" />
                    </Form.Item>
                  </Form>

                  <h2 className="heading-style">Payment</h2>
                  <Form.Item label="Use gift card " name="value" className="mt-4 paymentSelector">
                    <Select placeholder="no">
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>

                  <h2 className="heading-style">Card</h2>
                  <Form.Item label="Card number" name="value" className="mt-4">
                    <Input value={accountData?.value} className="blue-input" placeholder="0000 0000 0000 0000" />
                  </Form.Item>

                  <h2 className="heading-style">Gift</h2>
                  <Form.Item label="Mark as gift" className="giftSelector" name="value">
                    <Select placeholder="no">
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>

                  <Form className="form" layout="vertical">
                    <Form.Item label="Gift Message" name="value">
                      <Input value={accountData?.value} className="blue-input" />
                    </Form.Item>

                    <Form.Item label="Gift From" name="value">
                      <Input value={accountData?.value} className="blue-input" />
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
                          <Form.Item label="Ip" name="value">
                            <Input value={accountData?.value} className="blue-input" placeholder="111.111.11.1" />
                          </Form.Item>

                          <Form.Item label="Port">
                            <Input value={accountData?.password} className="blue-input ml-1rem " placeholder="1234" />
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
                              <Form.Item label="Username" name="value">
                                <Input value={accountData?.value} className="blue-input" />
                              </Form.Item>

                              <Form.Item label="Password">
                                <Input value={accountData?.password} className="blue-input ml-1rem" />
                              </Form.Item>
                            </div>
                          </Form>
                        </>
                      )}
                    </>
                  )}
                  <div className="remove-account mt-30">
                    <Button className="remove-account-btn">Remove account</Button>
                    <p>
                      If you delete this account, you will have to set it up again and no payments will be made through
                      this account.
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
              className="auto-ordering-btn"
              disabled={btnEnableDisable}
              ref={buttonRef}
              style={{ backgroundColor: '#5ac35a' }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoOrdering;
