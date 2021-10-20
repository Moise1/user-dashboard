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
        <p className="all-the-setting-text">
          All the settings established under Settings &gt; Sources will prevail over Settings &gt; Channel
        </p>

        <div className="row">
          <div className="col-12 col-md-6">
            <SearchInput />
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-end pb-4">
          <button
            className="btn config-auto-ordering-beta-btn  my-3 my-md-0"
            onClick={() => history.push('/sources-setting')}
          >
            {t('SourceConfigInputs.ConfigureAutoordering')}

            <span className="mx-1">
              <OrdersIcon />{' '}
            </span>
          </button>
          <button className="btn config-supply-btn ml-0 ml-md-3"> {t('SourceConfigInputs.ConfigureSuppliers')}</button>
        </div>

        <SourcesTable tableValue={staticValue} />
      </div>
    </>
  );
};

export default SettingSourceConfig;
