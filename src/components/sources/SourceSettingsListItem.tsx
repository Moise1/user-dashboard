import React from 'react';
import DefinedBySettingsSelect from './DefinedBySettingsSelect';

interface propsList {
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

export const SourceSettingsListItem = (PropsSource: propsList) => {
  const { whatSelect, setWhatSelect, setShowOrdering } = PropsSource;

  return (
    <>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-3 justify-content-between">
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
            whatSelect={whatSelect}
            setWhatSelect={setWhatSelect}
            setShowOrdering={setShowOrdering}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-3 justify-content-between">
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
            whatSelect={whatSelect}
            setWhatSelect={setWhatSelect}
            setShowOrdering={setShowOrdering}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-3 justify-content-between">
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
            whatSelect={whatSelect}
            setWhatSelect={setWhatSelect}
            setShowOrdering={setShowOrdering}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-3 justify-content-between">
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
            whatSelect={whatSelect}
            setWhatSelect={setWhatSelect}
            setShowOrdering={setShowOrdering}
          />
        </div>
      </div>
      {/* SOURCE SETTING LIST  */}
      <div className="row mb-3 justify-content-between">
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
            whatSelect={whatSelect}
            setWhatSelect={setWhatSelect}
            setShowOrdering={setShowOrdering}
          />
        </div>
      </div>
    </>
  );
};
