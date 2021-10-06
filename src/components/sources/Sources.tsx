import React from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import SearchWithButton from '../common/SearchWithButton';

const Sources = () => {
  return (
    <>
      <div className="w-100 p-3">
        <SearchWithButton />

        <div className="d-flex mt-4">
          <h2 className="back-to-supplier-heading d-flex align-items-center">
            <span>
              <LeftBackArrowIcon />
            </span>
            Back to suppliers overview
          </h2>

          <div className="beta-bg ml-4">
            <h2 className="mb-0 mr-2">Beta:</h2>
            <span>This service is free while in beta</span>
          </div>
        </div>

        <div className="auto">
          <h2 className="auto-ordering-heading-text">
            Autoordering supplier configuration: <span>select a supplier from the list</span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Sources;
