import React from 'react';
import { DispatchedOrderIcon } from '../common/Icons';
import { t } from '../../global/transShim';

const ConfigButtons = () => {
  return (
    <>
      <div className="d-flex flex-row flex-sm-column ">
        <button className="btn save-changes-btn mb-0 mb-sm-3">
          <DispatchedOrderIcon />
          <span className="ml-2">{t('SourceConfigInputs.SaveChanges')} </span>
        </button>
        <button className="ml-3 ml-sm-0 btn reset-to-default-btn"> {t('SourceConfigInputs.ResetToDefault')}</button>
      </div>
    </>
  );
};

export default ConfigButtons;
