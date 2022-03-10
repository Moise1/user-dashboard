import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import { ChevronLeft } from 'react-feather';
import AutoOrdering from './AutoOrdering';
import { SourcesSettingsContents } from './SourcesSettingsContents';
import { t } from '../../utils/transShim';
import { Selector } from '../small-components/Selector';
import { dummyData } from '../../dummy-data/dummyData';
import { SuccessBtn, ResetBtn } from '../small-components/ActionBtns';
import '../../sass/sources-settings.scss';

export const SourcesSettings = () => {
  const [supplierValue, setSupplierValue] = useState('Supplier');
  const [, setSelectedAccount] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  const [to, setTo] = useState<string>('');
  const history = useHistory();
  const { TabPane } = Tabs;

  const initialStateSourceSettings = () => {
    setSelectedAccount('Select Supplier');
    setSupplierValue('');
    history.goBack();
    setTo('/sources');
  };

  const handleOptionChange = (value: string) => setSupplierValue(value);

  return (
    <Layout className="sources-container">
      <div className="sources-description">
        <Link to={to} className="back-link" onClick={() => initialStateSourceSettings()}>
          <span className="back-arrow">
            <ChevronLeft />
          </span>
          Back to suppliers overview
        </Link>
      </div>

      <h1 className="sources-configuration-name">
        Source: <span> {supplierValue}</span>
      </h1>

      <div className="tabs-container">
        <Tabs type="card" className="tabs">
          <TabPane tab="Sources Settings" key="1" className="tab-pane">
            <SourcesSettingsContents />
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
