import React, { useState } from 'react';
import { LeftBackArrowIcon } from '../common/Icons';
import SearchWithButton from '../common/SearchWithButton';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import AutoOrdering from './AutoOrdering';
import SearchSelect from './SearchSelect';
import { useHistory } from 'react-router-dom';

// interface IProps {
//   showOrdering: boolean;
//   // setShowOrdering?: (value: boolean | (prevVar: boolean) => boolean) => void;

//   setShowOrdering: (value: boolean | ((prevVar: boolean) => boolean)) => void;
// }

const Sources = () => {
  const [showOrdering, setShowOrdering] = useState<boolean>(false);
  const [whatSelect, setWhatSelect] = useState<string>('Select Supplier');

  // const [supplier, setSupplier] = useState<string>();

  // const options = ['one', 'two', 'three'];
  // const defaultOption = options[0];

  // const onSelect = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setSupplier(event.target.value);
  // };

  // const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   console.log(value);
  //   //  setSelectedOption(value);
  // };
  console.log(showOrdering, 'showOrdering');
  const history = useHistory();

  return (
    <>
      <div className="w-100 p-sm-3 ant-layout">
        <SearchWithButton />

        <div className="d-flex flex-column flex-sm-row mt-2 mt-sm-4">
          <h2 className="back-to-supplier-heading d-flex align-items-center" onClick={() => history.goBack()}>
            <span className="left-back-arrow-svg">
              <LeftBackArrowIcon />
            </span>
            Back to suppliers overview
          </h2>

          <div className="beta-bg ml-0 ml-sm-4">
            <h2 className="mb-0 mr-2">Beta:</h2>
            <span>This service is free while in beta</span>
          </div>
        </div>

        <div className="auto-ordering-section my-3">
          <h2 className="auto-ordering-heading-text mb-3 ">
            Autoordering supplier configuration: <span>select a supplier from the list</span>
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
