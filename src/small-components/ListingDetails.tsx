import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import { t } from 'src/utils/transShim';
import { TrashIcon, CheckIcon, RefreshIcon } from '../components/common/Icons';
import '../sass/listing-details.scss';
import { ListingData } from 'src/redux/listings/listingsSlice';
interface Props {
  selectedItems: ListingData;
}

export const ListingDetails: React.FC<Props> = ({ selectedItems }: Props) => {
  return (
    <div className="listing-details">
      <ul>
        <li>
          <p>Create by</p>
          <p>{selectedItems.createdByName}</p>
        </li>
        <li>
          <p>Created on</p>
          <p>{selectedItems.createdOn}</p>
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
