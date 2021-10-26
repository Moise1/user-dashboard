import React, { useEffect, useState, ChangeEvent } from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import SearchWithButton from '../common/SearchWithButton';
import AutoOrdering from './AutoOrdering';
import SearchSelect from './SearchSelect';
import { useHistory } from 'react-router-dom';
import './Sources.css';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';
import { t } from '../../global/transShim';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

const Sources = () => {
  const [showOrdering, setShowOrdering] = useState<boolean>(false);
  const { supplierValue, setSupplierValue } = React.useContext(SelectSupplierContext) as ContextType;
  const [whatSelect, setWhatSelect] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');
  const [checked, setChecked] = useState<boolean>(false);

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

  // FOR GET VALUE OF TOGGLE SWITCH
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
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

        <div className={` ${showOrdering ? '' : 'h-100'} auto-ordering-section my-0 my-md-3`}>
          {/* <h2 className="auto-ordering-heading-text mb-3 ">
            Autoordering supplier configuration:{' '}
            <span> {whatSelect ? whatSelect : 'select a supplier from the list'} </span>
          </h2> */}
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex">
              <div className="enable-disable-para ">
                <p>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</p>
                <span className="mr-5">Disabling auto-ordering will require you to manually process new orders.</span>
              </div>

              <div className="custom-control  d-flex align-items-center switchbox custom-switch px-2">
                <label className="switch-toggle mb-0 " htmlFor="checkbox-2">
                  <input className="input-toggle-switch" onChange={handleChange} type="checkbox" id="checkbox-2" />
                  <div className="slider-toggle round"></div>
                </label>
              </div>
            </div>

            <div className="supplier-dropdown">
              <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />
            </div>
          </div>

          {showOrdering ? <AutoOrdering checked={checked} whatSelect={whatSelect} /> : ''}
        </div>
      </div>
    </>
  );
};

export default Sources;
