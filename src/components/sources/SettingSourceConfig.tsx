import React from 'react';
import SearchInput from '../SmallComponents/SearchInput';
import SourcesTable from './SourcesTable';


interface props {
  staticValue: boolean;
}

const SettingSourceConfig = (myProps: props) => {
  const { staticValue } = myProps;

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
          <SourcesTable tableValue={staticValue} />
        </div>
      </div>
    </>
  );
};

export default SettingSourceConfig;
