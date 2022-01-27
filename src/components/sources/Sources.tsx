import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { LeftBackArrowIcon } from '../common/Icons';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import AutoOrdering from './AutoOrdering';
import { SourceSettings } from './SourceSettings';
import { t } from '../../global/transShim';
import '../../sass/light-theme/sources-table.scss';
import { Layout } from 'antd';
import '../../sass/light-theme/sources-setting.scss';
import { Selector } from '../small-components/Selector';
import { dummyData } from '../../dummy-data/dummyData';
import { SuccessBtn, ResetBtn } from '../small-components/ActionBtns';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

export const Sources = () => {
  const { supplierValue, setSupplierValue } = useContext(SelectSupplierContext) as ContextType;
  const [, setSelectedAccount] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  const history = useHistory();
  const { TabPane } = Tabs;

  const initialStateSourceSettings = () => {
    setSelectedAccount('Select Supplier');
    setSupplierValue('');
    history.goBack();
  };

  const handleOptionChange = (value: string) => setSupplierValue(value);

  return (
    <Layout className="source-container">
      <div className="source-description">
        <h2 className="back-to-supplier" onClick={() => initialStateSourceSettings()}>
          <span className="back-arrow">
            <LeftBackArrowIcon />
          </span>
          Back to suppliers overview
        </h2>

        <p className="beta-area">
          <span className="beta">Beta:</span> This service is free while in beta
        </p>
      </div>

      <h1 className="surce-configuration-name">
        Source: <span> {supplierValue}</span>
      </h1>

      <div className="tabs-container">
        <Tabs type="card" className="tabs">
          <TabPane tab="Source Settings" key="1" className="tab-pane">
            <SourceSettings />
          </TabPane>
          <TabPane tab="Auto Ordering" key="2" className="tab-pane">
            <AutoOrdering />
          </TabPane>
        </Tabs>
        <div className="right-section">
          <Selector defaultValue="Select Supplier" onChange={handleOptionChange}>
            {dummyData}
          </Selector>
          <div className="action-btns">
            <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
            <ResetBtn>{t('ResetToDefault')}</ResetBtn>
          </div>
        </div>
      </div>
    </Layout>
  );
};
