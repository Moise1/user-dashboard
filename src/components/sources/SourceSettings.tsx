import React, { useState } from 'react';

import { SourceSettingsListItem } from './SourceSettingsListItem';

// interface props {
//   whatSelect: string;
//   setWhatSelect: (arg0: string) => void;
//   setShowOrdering: (arg0: boolean) => void;
// }

const SourceSettings = () => {
  // const { whatSelect, setWhatSelect, setShowOrdering } = myProps;
  const [definedByStateSelect, setDefinedByStateSelect] = useState('Defined by Settings(30)');

  return (
    <>
      <div className="col">
        <SourceSettingsListItem
          definedByStateSelect={definedByStateSelect}
          setDefinedByStateSelect={setDefinedByStateSelect}
        />
      </div>
    </>
  );
};

export default SourceSettings;
