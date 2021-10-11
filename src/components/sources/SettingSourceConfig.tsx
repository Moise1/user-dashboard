import React from 'react';
import SearchInput from '../SmallComponents/SearchInput';
import { OrdersIcon } from '../common/Icons';
import SourcesTable from './SourcesTable';

interface props {
  staticValue: boolean;
}
const SettingSourceConfig = (myProps: props) => {
  const { staticValue } = myProps;

  return (
    <>
      <div className="setting-source-config-wrapper ant-layout">
        <p>All the settings established under Settings &gt; Sources will prevail over Settings &gt; Channel</p>

        <div className="row">
          <div className="col-12 col-md-6">
            <SearchInput />
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-end pb-4">
          <button className="btn config-auto-ordering-beta-btn  my-3 my-md-0">
            Configure Autoordering (Beta)
            <OrdersIcon />{' '}
          </button>
          <button className="btn config-supply-btn ml-0 ml-md-3">Configure suppliers</button>
        </div>

        <SourcesTable tableValue={staticValue} />
      </div>
    </>
  );
};

export default SettingSourceConfig;
