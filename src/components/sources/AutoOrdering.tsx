import { useState } from 'react';
import AccountsMangage from './AccountsMangage';
import { t } from '../../global/transShim';
import '../../sass/light-theme/switch.scss';
import { Switch } from '../small-components/Switch';

interface props {
  showOrdering: boolean;
  whatSelect: string;
  setWhatSelect: (arg0: string) => void;
  setShowOrdering: (arg0: boolean) => void;
}

const AutoOrdering = (myProps: props) => {
  const { showOrdering, whatSelect } = myProps;
  const [checked] = useState<boolean>(false);

  return (
    <div className="col">
      <div className={` ${showOrdering ? '' : 'h-100'} `}>
        <div className="auto-ordering-container">
          <div className="setting-list-item">
            <h4>{t('SourceConfigInputs.EnableDisableAutoOrdering')}</h4>
            <p className="mr-5">Disabling auto-ordering will require you to manually process new orders.</p>
          </div>

          <Switch />
        </div>
        {showOrdering && <AccountsMangage checked={checked} whatSelect={whatSelect} />}
      </div>
    </div>
  );
};

export default AutoOrdering;
