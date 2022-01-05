import { Editor } from 'react-draft-wysiwyg';
import { t } from 'src/global/transShim';
import { SuccessBtn, WarningBtn, DeleteBtn } from './ActionBtns';
import '../../sass/light-theme/listing-description.scss';

export const ListingDescription = () => {
  return (
    <div className="listing-description">
      <p>Description</p>
      <Editor />

      <div className="btns-container-description">
        <DeleteBtn>{t('TerminateItem')}</DeleteBtn>
        <WarningBtn>{t('ForceRefresh')}</WarningBtn>
        <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
      </div>
    </div>
  );
};
