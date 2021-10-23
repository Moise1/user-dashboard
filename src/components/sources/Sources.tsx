import React, { useEffect, useState } from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import SearchWithButton from '../common/SearchWithButton';
import AutoOrdering from './AutoOrdering';
import SearchSelect from './SearchSelect';
import { useHistory } from 'react-router-dom';
import './Sources.css';
import { SelectSupplierContext } from '../../contexts/SelectSupplierProvider';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

const Sources = () => {
  const [showOrdering, setShowOrdering] = useState<boolean>(false);
  const { supplierValue, setSupplierValue } = React.useContext(SelectSupplierContext) as ContextType;
  const [whatSelect, setWhatSelect] = useState<string>(supplierValue ? supplierValue : 'Select Supplier');

  const history = useHistory();

  useEffect(() => {
    if (supplierValue.length) {
      console.log(supplierValue, 'supplierValue');
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
    <>
      <div className="w-100 p-sm-3 ant-layout mt-3 mt-sm-0">
        <div className="d-none d-md-block">
          <SearchWithButton />
        </div>

        <div className="d-flex flex-column flex-sm-row mt-0 mt-md-4 back-supplier-parent">
          <h2
            className="back-to-supplier-heading d-flex align-items-center"
            onClick={() => initialStateSourceSettings()}
          >
            <span className="left-back-arrow-svg">
              <LeftBackArrowIcon />
            </span>
            Back to suppliers overview
          </h2>

          <div className="beta-bg ml-0 ml-sm-4 d-none d-md-flex">
            <h2 className="mb-0 mr-2">Beta:</h2>
            <span>This service is free while in beta</span>
          </div>
        </div>

        <div className={` ${showOrdering ? '' : 'h-100'} auto-ordering-section my-0 my-md-3`}>
          <h2 className="auto-ordering-heading-text mb-3 ">
            Autoordering supplier configuration:{' '}
            <span> {whatSelect ? whatSelect : 'select a supplier from the list'} </span>
          </h2>

          <div className="supplier-dropdown">
            <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />
          </div>

          {showOrdering ? <AutoOrdering whatSelect={whatSelect} /> : ''}
        </div>
      </div>
    </>
  );
};

export default Sources;
