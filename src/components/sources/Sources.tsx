import React, { useEffect, useState } from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import SearchWithButton from '../common/SearchWithButton';
import { useHistory } from 'react-router-dom';
import './Sources.css';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import AutoOrdering from './AutoOrdering';
import SourceSettings from './SourceSettings';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

const Sources = () => {
  const [isShowSourceSettings, setShowSourceSettings] = useState<boolean>(true);
  const [isShowAutoOrderingSetting, setShowAutoOrderingSetting] = useState<boolean>(false);
  const [showOrdering, setShowOrdering] = useState<boolean>(false);
  const { supplierValue, setSupplierValue } = React.useContext(SelectSupplierContext) as ContextType;
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
    <>
      <div className="w-100 p-sm-3 ant-layout mt-3 mt-sm-0">
        <div className="d-none d-md-block">
          <SearchWithButton />
        </div>

        <div className="d-flex flex-column mt-0 mt-md-3 back-supplier-parent">
          <h2
            className="back-to-supplier-heading d-flex align-items-center"
            onClick={() => initialStateSourceSettings()}
          >
            <span className="left-back-arrow-svg">
              <LeftBackArrowIcon />
            </span>
            Back to suppliers overview
          </h2>

          <h2 className="auto-ordering-heading-text px-3">
            Source:{' '}
            <span>
              {' '}
              {whatSelect && whatSelect !== 'Select Supplier' ? whatSelect : 'select a supplier from the list'}{' '}
            </span>
          </h2>
          {/* <div className="beta-bg ml-0 ml-sm-4 d-none d-md-flex">
            <h2 className="mb-0 mr-2">Beta:</h2>
            <span>This service is free while in beta</span>
          </div> */}
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

        {isShowSourceSettings ? (
          <SourceSettings whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />
        ) : (
          ''
        )}
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
      </div>
    </>
  );
};

export default Sources;
