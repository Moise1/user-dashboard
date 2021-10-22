import React from 'react';
import SearchInput from '../SmallComponents/SearchInput';
import { OrdersIcon } from '../common/Icons';
import SourcesTable from './SourcesTable';
import { useHistory } from 'react-router-dom';
import { t } from '../../global/transShim';

interface props {
  staticValue: boolean;
}

const SettingSourceConfig = (myProps: props) => {
  const { staticValue } = myProps;
  const history = useHistory();

  return (
    <>
      <div className="setting-source-config-wrapper ant-layout">
        <p className="all-the-setting-text d-none d-md-block">
          {' '}
          All the settings established under Settings &gt; Sources will prevail over Settings &gt; Channel
        </p>

        <div className="row">
          <div className="col-12 col-md-6">
            <SearchInput />
          </div>
        </div>

        <div className="bg-white mt-3 br-10">
          <div className="d-flex justify-content-end my-2 mt-0 mb-sm-4">
            <button className="btn config-auto-ordering-beta-btn" onClick={() => history.push('/sources-setting')}>
              {t('SourceConfigInputs.ConfigureAutoordering')}

              <span className="mx-1">
                <OrdersIcon />{' '}
              </span>
            </button>
            <button className="btn config-supply-btn ml-3"> {t('SourceConfigInputs.ConfigureSuppliers')}</button>
          </div>

          <SourcesTable tableValue={staticValue} />
        </div>
      </div>
    </>
  );
};

export default SettingSourceConfig;
