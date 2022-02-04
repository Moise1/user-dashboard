import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import { t } from 'src/global/transShim';
import '../../sass/light-theme/listing-details.scss';
import { TrashIcon, CheckIcon, RefreshIcon } from '../common/Icons';


export const ListingDetails = () => {
  return (
    <div className="listing-details">
      <ul>
        <li>
          <p>Create by</p>
          <p>Admin</p>
        </li>
        <li>
          <p>Created on</p>
          <p>07/13/2021 12:55 PM</p>
        </li>
        <li>
          <p>Monitored on</p>
          <p>08/23/2021 10:08 PM</p>
        </li>
        <li>
          <p>Source URL</p>
          <a href="#">Source Url</a>
        </li>
        <li>
          <p>My URL</p>
          <a href="#">My Url</a>
        </li>
      </ul>
      <div className="btns-container-details">
        <DeleteBtn>
          <TrashIcon />
          {t('TerminateItem')}
        </DeleteBtn>
        <WarningBtn>
          <RefreshIcon />
          {t('ForceRefresh')}
        </WarningBtn>
        <SuccessBtn>
          <CheckIcon />
          {t('SaveChanges')}
        </SuccessBtn>
      </div>
    </div>
  );
};
