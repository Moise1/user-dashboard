import { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import { t } from '../../global/transShim';
import '../../sass/light-theme/switch.scss';
import { Switch } from '../small-components/Switch';
import { Selector } from '../small-components/Selector';
import { dummyUsers } from '../../dummy-data/dummyData';
import '../../sass/light-theme/auto-ordering.scss';
import { UserAddOutlined } from '@ant-design/icons';
import hand from '../../assets/hand.svg';
import copy from '../../assets/copy.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};
interface Props {
  showOrdering: boolean;
  setShowOrdering: (arg0: boolean) => void;
}

const AutoOrdering = (props: Props) => {
  const { supplierValue, setSupplierValue } = useContext(SelectSupplierContext) as ContextType;

  const { showOrdering } = props;
  const [checked, setChecked] = useState<boolean>(false);
  const handleSwitch = () => setChecked(!checked);
  const [, setCopied] = useState<boolean>(false);

  const handleOptionChange = (value: string) => setSupplierValue(value);
  return (
    <div className={` ${showOrdering ? '' : 'h-100'} `}>
      <UserAddOutlined />
      <div className="auto-ordering-container">
        <div className="setting-list-item">
          <h4>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</h4>
          <p>Disabling auto-ordering will require you to manually process new orders.</p>
        </div>
        <Switch onChange={handleSwitch} />
      </div>
      {checked && (
        <div className="select-account">
          <p className="account-config">{t('SourceConfigInputs.AccountConfiguration')} : </p>
          <Selector defaultValue="Select or add account" addAccount={true} onChange={handleOptionChange}>
            {dummyUsers}
          </Selector>
        </div>
      )}

      <div className="account-details">
        {supplierValue !== '' ? (
          <Form className="form">
            <Form.Item label="Alias">
              <Input value="Dad acocount" className="account-form-input" />
            </Form.Item>
            <div className="platfrom-creds">
              <Form.Item label="Amazon Login">
                <Input value="dadaccount@gmail.com" className="account-form-input" />
              </Form.Item>

              <Form.Item label="Amazon Password">
                <Input value="12345" className="account-form-input" />
              </Form.Item>
            </div>
            <Form.Item label="OTP Code (2FA)">
              <Input className="account-form-input" value="JJSndfnfgurbgjD935h5gmSKFJASFNFNBGG" />
              <CopyToClipboard text="" onCopy={() => setCopied(true)}>
                <img src={copy} alt="copy-icon" className="copy-icon" />
              </CopyToClipboard>
            </Form.Item>

            <Form.Item label="Phone umber">
              <Input value="(555) 555-5555" className="account-form-input" />
            </Form.Item>

            <div className="disable-account">
              <div className="disable-account-text">
                <h4>
                  Disable account{' '}
                  <span>
                    <img src={hand} className="hand" alt="hand-icon" />
                  </span>
                </h4>
                <p>If you deactivate this account, orders will be placed through the activated accounts.</p>
              </div>
              <Switch />
            </div>

            <div className="remove-account">
              <Button className="remove-account-btn">Remove account</Button>
              <p>
                If you delete this account, you will have to set it up again and no payments will be made through this
                account.
              </p>
            </div>
          </Form>
        ) : null}
      </div>
    </div>
  );
};

export default AutoOrdering;
