import { Editor } from 'react-draft-wysiwyg';
import { t } from 'src/utils/transShim';
import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import { TrashIcon, CheckIcon, RefreshIcon } from '../components/common/Icons';
import '../sass/listing-description.scss';

export const ListingDescription = () => {
  return (
    <div className="listing-description">
      <p>Description</p>
      <Editor />

      <div className="btns-container-description">
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
