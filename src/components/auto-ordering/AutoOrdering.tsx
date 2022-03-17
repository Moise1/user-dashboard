import { ReactNode, useState } from 'react';
import { Form, Input, Button, Tooltip } from 'antd';
import { t } from '../../utils/transShim';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PlusCircle } from 'react-feather';
import { Switch } from '../small-components/Switch';
import { Selector } from '../small-components/Selector';
import { dummyUsers } from '../../dummy-data/dummyData';
import { ConfirmBtn } from '../small-components/ActionBtns';
import hand from '../../assets/hand.svg';
import copy from '../../assets/copy.svg';
import '../../sass/switch.scss';
import '../../sass/auto-ordering.scss';

const AutoOrdering = () => {
  const [accountConfig, setAccountConfig] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [activeAccount, setActiveAccount] = useState<boolean>(true);
  const [, setCopied] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newAccount, setNewAccount] = useState({ value: '' });

  const showAccountConfig = (): void => setChecked(!checked);

  const handleActiveAccount = (): void => setActiveAccount(!activeAccount);

  const handleOptionChange = (value: string) => setAccountConfig(value);

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
    <div className={accountConfig ? 'adjusted-main-container' : 'main-container'}>
      <div className="auto-ordering">
        <div className="setting-list-item">
          <h2>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</h2>
          <p>Disabling auto-ordering will require you to manually process new orders.</p>
        </div>
        <Switch onChange={showAccountConfig} className="switch" />
      </div>
      {checked && (
        <div className="select-account">
          <p className="account-config">
            {t('SourceConfigInputs.AccountConfiguration')} :<span className="account-alias">{accountData?.alias}</span>
          </p>
          <Selector
            defaultValue="Select or add account"
            addAccount={true}
            onChange={handleOptionChange}
            dropdownRender={(menu: ReactNode) => (
              <div className="dropdown-content">
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
      )}

      <div className="account-details">
        {checked && accountConfig && (
          <>
            <fieldset disabled={!activeAccount}>
              <Form className="form" layout="vertical">
                <Form.Item label="Alias" name="alias">
                  <Tooltip
                    placement="topRight"
                    title={!activeAccount && 'Disabled'}
                    trigger={!activeAccount ? ['hover'] : ''}
                  >
                    <Input value={accountData?.alias} className="account-form-input" />
                  </Tooltip>
                </Form.Item>
                <div className="platfrom-creds">
                  <Form.Item label="Amazon Login" name="value">
                    <Tooltip
                      placement="topRight"
                      title={!activeAccount && 'Disabled'}
                      trigger={!activeAccount ? ['hover'] : ''}
                    >
                      <Input value={accountData?.value} className="account-form-input" />
                    </Tooltip>
                  </Form.Item>

                  <Form.Item label="Amazon Password">
                    <Tooltip
                      placement="topRight"
                      title={!activeAccount && 'Disabled'}
                      trigger={!activeAccount ? ['hover'] : ''}
                    >
                      <Input value={accountData?.password} className="account-form-input" />
                    </Tooltip>
                  </Form.Item>
                </div>
                <Form.Item label="OTP Code (2FA)">
                  <Tooltip
                    placement="topRight"
                    title={!activeAccount && 'Disabled'}
                    trigger={!activeAccount ? ['hover'] : ''}
                  >
                    <Input className="account-form-input" value={accountData?.otp} />
                    <CopyToClipboard text="" onCopy={() => setCopied(true)}>
                      <img src={copy} alt="copy-icon" className="copy-icon" />
                    </CopyToClipboard>
                  </Tooltip>
                </Form.Item>

                <Form.Item label="Phone umber">
                  <Tooltip
                    placement="topRight"
                    title={!activeAccount && 'Disabled'}
                    trigger={!activeAccount ? ['hover'] : ''}
                  >
                    <Input value={accountData?.phone} className="account-form-input" />
                  </Tooltip>
                </Form.Item>
              </Form>
            </fieldset>
            <div className="disable-account">
              <div className="disable-account-text">
                <h2>
                  Disable account{' '}
                  <span>
                    <img src={hand} className={activeAccount ? 'hand' : 'gray-hand'} />
                  </span>
                </h2>
                <p>If you deactivate this account, orders will be placed through the activated accounts.</p>
              </div>
              <Switch onChange={handleActiveAccount} />
            </div>

            <div className="remove-account">
              <Button className="remove-account-btn">Remove account</Button>
              <p>
                If you delete this account, you will have to set it up again and no payments will be made through this
                account.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AutoOrdering;
