import React from 'react';
import DefinedBySettingsSelect from './DefinedBySettingsSelect';

interface propsList {
  definedByStateSelect: string;
  setDefinedByStateSelect: (arg0: string) => void;
}

export const SourceSettingsListItem = (PropsSource: propsList) => {
  const { definedByStateSelect, setDefinedByStateSelect } = PropsSource;

  return (
    <>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-6">
          <div className="source-setting-list-item">
            <h4>Price descrease</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur
              libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariatur
              ipsa doloremque?
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect
            definedByStateSelect={definedByStateSelect}
            setDefinedByStateSelect={setDefinedByStateSelect}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-6">
          <div className="source-setting-list-item">
            <h4>Price descrease</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur
              libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariatur
              ipsa doloremque?
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect
            definedByStateSelect={definedByStateSelect}
            setDefinedByStateSelect={setDefinedByStateSelect}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-6">
          <div className="source-setting-list-item">
            <h4>Price descrease</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur
              libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariatur
              ipsa doloremque?
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect
            definedByStateSelect={definedByStateSelect}
            setDefinedByStateSelect={setDefinedByStateSelect}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-6">
          <div className="source-setting-list-item">
            <h4>Price descrease</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur
              libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariatur
              ipsa doloremque?
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect
            definedByStateSelect={definedByStateSelect}
            setDefinedByStateSelect={setDefinedByStateSelect}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-0 mb-sm-3 justify-content-between">
        <div className="col-12 col-xl-6">
          <div className="source-setting-list-item">
            <h4>Price descrease</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur
              libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariatur
              ipsa doloremque?
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 mt-3 mt-xl-5 d-flex justify-content-end">
          <DefinedBySettingsSelect
            definedByStateSelect={definedByStateSelect}
            setDefinedByStateSelect={setDefinedByStateSelect}
          />
        </div>
      </div>
    </>
  );
};
