import { useEffect, useState, useContext } from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import { useHistory } from 'react-router-dom';
import './Sources.css';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import AutoOrdering from './AutoOrdering';
import SourceSettings from './SourceSettings';
import SearchSelect from './SearchSelect';
import SourceButtons from './SourceButtons';
import '../../sass/light-theme/sources-table.scss';
import { SearchInput } from '../../components/SmallComponents/SearchBars';

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
    <div className="sources-table w-100 p-sm-3 ant-layout mt-3 mt-sm-0">
      <p className="all-the-setting-text d-none d-md-block">
        {' '}
        All the settings established under Settings &gt; Sources will prevail over Settings &gt; Channel
      </p>

      <div className="row">
        <div className="col-12 col-md-6">
          <SearchInput />
        </div>
      </div>
      <div className="d-flex flex-column mt-0 mt-md-3 back-supplier-parent">
        <h2 className="back-to-supplier-heading d-flex align-items-center" onClick={() => initialStateSourceSettings()}>
          <span className="left-back-arrow-svg">
            <LeftBackArrowIcon />
          </span>
          Back to suppliers overview
        </h2>

        <h1 className="auto-ordering-heading-text px-3">
          Source:{' '}
          <span>
            {' '}
            {whatSelect && whatSelect !== 'Select Supplier' ? whatSelect : 'select a supplier from the list'}{' '}
          </span>
        </h1>
      </div>
      {/* SOURCE TABS  */}
      <div className="tab-source">
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

      <div className="auto-ordering-section">
        <div className="row justify-content-between flex-column flex-lg-row mt-3">
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

          <div className="col-12 col-sm-4 mt-2 d-flex flex-column align-items-lg-end ">
            <div className="sticky-btns">
              <div className="supplier-dropdown">
                <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />
              </div>
              <SourceButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;
