import React from 'react';
import DefinedBySettingsSelect from './DefinedBySettingsSelect';

export const SourceSettingsListItem = () => {
  return (
    <>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-5">
          <div className="source-setting-list-item">
            <h4>Markup %</h4>
            <p>
              Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
              markup means that a product that costs £100 will be on sale for £140.
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect value="Defined by Settings(30)" />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-5">
          <div className="source-setting-list-item">
            <h4>Default template</h4>
            <p>
              Define the look and feel of your listings. You can see different options under the{' '}
              <span className="blue-normal-text">Settings</span>
              <span className="blue-normal-text"> &gt; Templates</span>
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect value="Defined by Settings(plain)" />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-5">
          <div className="source-setting-list-item">
            <h4>Monitor stock</h4>
            <p>
              If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
              is available again, we will automatically update your store again.
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect value="Defined by Settings(yes)" />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-5">
          <div className="source-setting-list-item">
            <h4>Monitor price</h4>
            <p>
              If the supplier changes the price of a product, we will automatically update accordingly to keep your
              profit with the corresponding markup.
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect value="Defined by Settings(yes)" />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-5">
          <div className="source-setting-list-item">
            <h4>Price descrease</h4>
            <p>
              If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this
              off, we will only update the price when it goes up in the supplier’s catalog.
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect value="Defined by Settings(yes)" />
        </div>
      </div>
    </>
  );
};
