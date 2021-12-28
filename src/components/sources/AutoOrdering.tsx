import { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import { t } from '../../global/transShim';
import '../../sass/light-theme/switch.scss';
import { Switch } from '../small-components/Switch';
import { Selector } from '../small-components/Selector';
import { dummyUsers } from '../../dummy-data/dummyData';
import '../../sass/light-theme/auto-ordering.scss';

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

  const handleOptionChange = (value: string) => setSupplierValue(value);
  return (
    <div className={` ${showOrdering ? '' : 'h-100'} `}>
      <div className="auto-ordering-container">
        <div className="setting-list-item">
          <h4>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</h4>
          <p className="mr-5">Disabling auto-ordering will require you to manually process new orders.</p>
        </div>
        <Switch onChange={handleSwitch} />
      </div>
      {checked && (
        <>
          <div className="d-flex flex-column flex-lg-row justify-content-between">
            <div className="d-flex flex-column mb-3 mb-lg-0">
              <h2 className="acc-config-text py-3">
                {t('SourceConfigInputs.AccountConfiguration')} : <span>{null} </span>{' '}
              </h2>
              <Selector defaultValue="Select or add account" addAccount={true} onChange={handleOptionChange}>
                {dummyUsers}
              </Selector>
            </div>
          </div>
        </>
      )}

      <div className="account-details">
        {supplierValue !== '' ? (
          <Form className="form">
            <Form.Item label="Alias">
              <Input />
            </Form.Item>
            <div className="platfrom-creds">
              <Form.Item label="Amazon Login">
                <Input />
              </Form.Item>

              <Form.Item label="Amazon Password">
                <Input />
              </Form.Item>
            </div>
            <Form.Item label="OTP Code (2FA)">
              <Input />
            </Form.Item>

            <Form.Item label="Phone umber">
              <Input />
            </Form.Item>

            <div className="disable-account">
              <div className="disable-account-text">
                <h4>
                  Disable account <span></span>
                </h4>
                <p>If you deactivate this account, orders will be placed through the activated accounts.</p>
              </div>
              <Switch />
            </div>

            <div className="delete-account">
              <Button>Remove account</Button>
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
