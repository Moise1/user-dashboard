import { Link } from 'react-router-dom';
import { PlusIcon } from '../common/Icons';
import { t } from '../../global/transShim';
import '../../sass/store-list.scss';
import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import { SearchInput } from '../small-components/TableActionBtns';

const StoreList = () => {
  return (
    <div className="store-list-container">
      <div className="store-list-dropdown">
        <div className="store-list-search">
          <SearchInput />
        </div>

        <div className="linked-stores">
          <div className=" lh-1 c-000">{t('lnkst')} </div>
          <img src={flag} className="lh-1 mx-2" height="20" alt="" />
          <img src={amazon} className="pt-1 lh-1" height="20" alt="" />
        </div>

        <Link to="/new-channel" className="new-channel">
          <PlusIcon />
          <span className="mb-0">{t('AddNewChannel')}</span>
        </Link>
      </div>
    </div>
  );
};

export default StoreList;
