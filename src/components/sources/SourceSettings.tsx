import React, { useState } from 'react';
import SearchSelect from './SearchSelect';
import SourceButtons from './SourceButtons';
import { SourceSettingsListItem } from './SourceSettingsListItem';

interface props {
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

const SourceSettings = (myProps: props) => {
  const { whatSelect, setWhatSelect, setShowOrdering } = myProps;
  const [definedByStateSelect, setDefinedByStateSelect] = useState('Defined by Settings(30)');

  return (
    <>
      <div className=" auto-ordering-section">
        <div className="container-fluid">
          <div className="row justify-content-between flex-column flex-lg-row">
            <div className="col">
              <SourceSettingsListItem
                definedByStateSelect={definedByStateSelect}
                setDefinedByStateSelect={setDefinedByStateSelect}
              />
            </div>

            <div className="col-auto">
              <div className="supplier-dropdown">
                <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />

                <div className="d-flex justify-content-end">
                  <SourceButtons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SourceSettings;
