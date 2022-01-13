import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import { t } from 'src/global/transShim';
import '../../sass/light-theme/listing-details.scss';

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
        <DeleteBtn>{t('TerminateItem')}</DeleteBtn>
        <WarningBtn>{t('ForceRefresh')}</WarningBtn>
        <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
      </div>
    </div>
  );
};
