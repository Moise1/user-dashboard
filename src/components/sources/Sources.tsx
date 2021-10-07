import React from 'react';
// import { Dropdown } from 'react-bootstrap';
import { DispatchedOrderIcon, LeftBackArrowIcon } from '../common/Icons';
import SearchWithButton from '../common/SearchWithButton';
import Select from 'react-select';
import AccountsInput from './AccountsInput';
// import { Menu } from 'antd';
// import search_icon from '../../assets/search.svg';
// import HeaderDropDownItem from '../SmallComponents/HeaderDropDownItem';
// import { Dropdown, Button, Space } from 'antd';
// import DropDownMenu from '../SmallComponents/DropDownMenu';

const Sources = () => {
  // const [supplier, setSupplier] = useState({});
  // const [checked, setChecked] = useState(false);
  const options = [
    { value: 'Select supplier', label: 'Select supplier', isDisabled: true },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Flipcart', label: 'Flipcart' },
    { value: 'Ali Express', label: 'Ali Express' }
  ];
  // const handleSupplier = (e: any) => {
  //   console.log(e.target.value);
  //   // setSupplier(e);
  // };
  // console.log(supplier);

  // const handleChange = (: Value) => {
  //   setChecked(e.target.checked);
  // };

  // const [state, setState] = useState({ value: false });

  // const handleChange = (event: ChangeEvent<{ value: boolean }>) => {
  //   setState({ value: event?.currentTarget?.value });
  // };

  // const offstyle = 'btn-danger';
  // const onstyle = 'btn-success';
  // const displayStyle = state ? onstyle : offstyle;

  return (
    <>
      <div className="w-100 p-3">
        <SearchWithButton />

        <div className="d-flex flex-column flex-sm-row mt-4">
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

        <div className="auto-ordering-section my-3">
          <h2 className="auto-ordering-heading-text">
            Autoordering supplier configuration: <span>select a supplier from the list</span>
          </h2>
          <div className="row">
            <div className="col-12 col-sm-4 col-xl-3">
              <Select options={options} defaultValue={options[0]} />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <div className="enable-disable-para ">
                  <p>Enable/Disable Auto-ordering</p>
                  <span>Disabling auto-ordering will require you to manually process new orders.</span>
                </div>

                <span>Toggle button</span>
              </div>

              <h2 className="acc-config-text">
                Account configuration: <span>Select or add account</span>{' '}
              </h2>

              <div className="row">
                <div className="col-7">
                  <Select options={options} defaultValue={options[0]} />
                </div>
              </div>

              <AccountsInput />
            </div>
            <div className="d-flex flex-column">
              <button className="btn save-changes-btn mb-3">
                <DispatchedOrderIcon />
                <span className="ml-2">Save changes</span>
              </button>
              <button className="btn reset-to-default-btn">Reset to default</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sources;
