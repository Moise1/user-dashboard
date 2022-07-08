import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import moment from 'moment';
import { t } from 'src/utils/transShim';
import { TrashIcon, CheckIcon, RefreshIcon } from '../components/common/Icons';
import '../sass/listing-details.scss';
import { ActiveListing } from '../redux/listings/listingsSlice';
interface Props {
  selectedRecordData: ActiveListing;
}

export const ListingDetails: React.FC<Props> = ({ selectedRecordData }: Props) => {

  return (
    <div className="listing-details">
      <ul>
        <li>
          <p>Create by</p>
          <p>{selectedRecordData.createdByName}</p>
        </li>
        <li>
          <p>Created on</p>
          <p>{moment(selectedRecordData.createdOn).format('YYYY-MM-DD | h:mm A')}</p>
        </li>
        <li>
        
          <p>Monitored on</p>
          <p>{moment(selectedRecordData.lastTimeInStock).format('YYYY-MM-DD | h:mm A')}</p>
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
