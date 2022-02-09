import { Editor } from 'react-draft-wysiwyg';
import { t } from 'src/global/transShim';
import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import '../../sass/light-theme/listing-description.scss';
import { TrashIcon, CheckIcon, RefreshIcon } from '../common/Icons';

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
