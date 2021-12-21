import { ChangeEvent, useState } from 'react';
import AccountsMangage from './AccountsMangage';
import { t } from '../../global/transShim';
import '../../sass/light-theme/switch.scss';

interface props {
  showOrdering: boolean;
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

const AutoOrdering = (myProps: props) => {
  const { showOrdering, whatSelect } = myProps;
  const [checked, setChecked] = useState<boolean>(false);

  // FOR GET VALUE OF TOGGLE SWITCH
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div className="col">
        <div className={` ${showOrdering ? '' : 'h-100'} `}>
          <div className="auto-ordering-container">
            <div className="setting-list-item">
              <h4>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</h4>
              <p className="mr-5">Disabling auto-ordering will require you to manually process new orders.</p>
            </div>

            {/* changetodo Put this Switch on different component */}
            <div className="switch-container">
              <label className="switch-toggle" htmlFor="checkbox-2">
                <input className="input-toggle-switch" onChange={handleChange} type="checkbox" id="checkbox-2" />
                <div className="slider-toggle round"></div>
              </label>
            </div>

            {/* <div className="supplier-dropdown">
            <SearchSelect whatSelect={whatSelect} setWhatSelect={setWhatSelect} setShowOrdering={setShowOrdering} />
          </div> */}
          </div>

          {showOrdering ? <AccountsMangage checked={checked} whatSelect={whatSelect} /> : ''}
        </div>
      </div>
    </>
  );
};

export default AutoOrdering;
