import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { LeftBackArrowIcon } from '../common/Icons';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import AutoOrdering from './AutoOrdering';
import { SourceSettings } from './SourceSettings';
import ConfigButtons from './ConfigButtons';
import '../../sass/light-theme/sources-table.scss';
import { Layout } from 'antd';
import '../../sass/light-theme/source-settings.scss';
import { Selector } from '../small-components/Selector';
import { dummyData } from '../../dummy-data/dummyData';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

const Sources = () => {
  const [showOrdering, setShowOrdering] = useState<boolean>(false);
  const { supplierValue, setSupplierValue } = useContext(SelectSupplierContext) as ContextType;
  const [whatSelect, setWhatSelect] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  const history = useHistory();
  const { TabPane } = Tabs;

  useEffect(() => {
    if (supplierValue.length) {
      setShowOrdering(true);
    }
  });

  const initialStateSourceSettings = () => {
    setWhatSelect('Select Supplier');
    setSupplierValue('');
    setShowOrdering(false);
    history.goBack();
  };

  return (
    <Layout className="source-container">
      <div className="source-description">
        <h2 className="back-to-supplier" onClick={() => initialStateSourceSettings()}>
          <span className="back-arrow">
            <LeftBackArrowIcon />
          </span>
          Back to suppliers overview
        </h2>

        <h1 className="surce-configuration-name">
          Source:{' '}
          <span>
            {' '}
            {whatSelect && whatSelect !== 'Select Supplier' ? whatSelect : 'select a supplier from the list'}{' '}
          </span>
        </h1>
      </div>

      <div className="tabs-container">
        <Tabs type="card" className="tabs">
          <TabPane tab="Source Settings" key="1" className="tab-pane">
            <SourceSettings />
          </TabPane>
          <TabPane tab="Auto Ordering" key="2" className="tab-pane">
            <AutoOrdering
              showOrdering={showOrdering}
              whatSelect={whatSelect}
              setWhatSelect={setWhatSelect}
              setShowOrdering={setShowOrdering}
            />
          </TabPane>
        </Tabs>
        <div className="right-section">
          <Selector defaultValue="Select Supplier">{dummyData}</Selector>
          <ConfigButtons className="config-btns" />
        </div>
      </div>
    </Layout>
  );
};

export default Sources;