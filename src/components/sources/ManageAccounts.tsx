import { t } from '../../global/transShim';
import { Selector } from '../small-components/Selector';
import { dummyUsers } from '../../dummy-data/dummyData';

interface props {
  whatSelect: string;
  checked: boolean;
}

export const ManageAccounts = ({checked}: props) => {

  return (
    <>
      {checked && (
        <div className="d-flex flex-column flex-lg-row justify-content-between">
          <div className="d-flex flex-column mb-3 mb-lg-0">
            <h2 className="acc-config-text py-3">
              {t('SourceConfigInputs.AccountConfiguration')} : <span>{null} </span>{' '}
            </h2>
            <Selector defaultValue="Select or add account" addAccount={true}>
              {dummyUsers}
            </Selector>
            
          </div>
        </div>
      )}
    </>
  );
};
