import { useEffect, useState, useContext } from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import { useHistory } from 'react-router-dom';
import './Sources.css';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import AutoOrdering from './AutoOrdering';
import SourceSettings from './SourceSettings';
import SearchSelect from './SearchSelect';
import ConfigButtons from './ConfigButtons';
import '../../sass/light-theme/sources-table.scss';
import { Layout } from 'antd';

import '../../sass/light-theme/sources-settings.scss';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

const Sources = () => {
  const [isShowSourceSettings, setShowSourceSettings] = useState<boolean>(true);
  const [isShowAutoOrderingSetting, setShowAutoOrderingSetting] = useState<boolean>(false);
  const [showOrdering, setShowOrdering] = useState<boolean>(false);
  const { supplierValue, setSupplierValue } = useContext(SelectSupplierContext) as ContextType;
  const [whatSelect, setWhatSelect] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');

  const history = useHistory();

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

  const handleSourceTabs = () => {
    if (isShowSourceSettings) {
      setShowSourceSettings(false);
      setShowAutoOrderingSetting(true);
    } else if (isShowAutoOrderingSetting) {
      setShowSourceSettings(true);
      setShowAutoOrderingSetting(false);
    }
  };
  return (
    <Layout className="sources-container">
      <div className="sources-table w-100 p-sm-3 ant-layout mt-3 mt-sm-0">
        <div className="d-flex flex-column mt-0 mt-md-3 back-supplier-parent">
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
        {/* SOURCE TABS  */}
        <div className="tab-settings">
          <div
            className={`${isShowSourceSettings ? 'active-tab-bar' : ' '} tab-list-items`}
            onClick={() => handleSourceTabs()}
          >
            <h4>Sources Settings</h4>
          </div>
          <div
            className={`${isShowAutoOrderingSetting ? 'active-tab-bar' : ' '} tab-list-items`}
            onClick={() => handleSourceTabs()}
          >
            <h4>Autoordering Settings</h4>
          </div>
        </div>

        <div className="settings-container-section">
          <div className="auto-ordering-container row">
            {isShowSourceSettings ? <SourceSettings /> : ''}
            {isShowAutoOrderingSetting ? (
              <AutoOrdering
                showOrdering={showOrdering}
                whatSelect={whatSelect}
                setWhatSelect={setWhatSelect}
                setShowOrdering={setShowOrdering}
              />
            ) : (
              ''
            )}

            <div className="col-12 col-sm-4 buttons-config">
              <div className="sticky-btns">
                <div className="supplier-dropdown">
                  <SearchSelect
                    whatSelect={whatSelect}
                    setWhatSelect={setWhatSelect}
                    setShowOrdering={setShowOrdering}
                  />
                </div>
                <ConfigButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sources;
