import React from 'react';
import SearchSelect from './SearchSelect';
import SourceButtons from './SourceButtons';
import { SourceSettingsListItem } from './SourceSettingsListItem';

interface props {
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

const SourceSettings = (myProps: props) => {
  const { whatSelect, setWhatSelect, setShowOrdering } = myProps;

  // const sourceSettingData = [
  //   {
  //     heading: 'Markup %',
  //     description:
  //       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariaturipsa doloremque?',
  //     id: 101
  //   },
  //   {
  //     heading: 'Default template',
  //     description:
  //       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariaturipsa doloremque?',
  //     id: 102
  //   },
  //   {
  //     heading: 'Monitor stock',
  //     description:
  //       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariaturipsa doloremque?',
  //     id: 103
  //   },
  //   {
  //     heading: 'Monitor price',
  //     description:
  //       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariaturipsa doloremque?',
  //     id: 104
  //   },
  //   {
  //     heading: 'Price descrease',
  //     description:
  //       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id vero aliquid autem quisquam consequuntur libero facilis a. Sed asperiores adipisci, magnam neque blanditiis eaque, perferendis non cum pariaturipsa doloremque?',
  //     id: 105
  //   }
  // ];

  return (
    <>
      <div className=" auto-ordering-section">
        <div className="container-fluid">
          <div className="row justify-content-between flex-column flex-lg-row">
            <div className="col">
              <SourceSettingsListItem
                whatSelect={whatSelect}
                setWhatSelect={setWhatSelect}
                setShowOrdering={setShowOrdering}
              />
            </div>

            <div className="col-auto">
              <div className="supplier-dropdown">
                <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />

                <div className="d-flex justify-content-end">
                  <SourceButtons />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SourceSettings;
