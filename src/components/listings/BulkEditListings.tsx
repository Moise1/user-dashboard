import { useState } from 'react';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { BulkEditMain } from '../small-components/BulkEditMain';
import { BulkEditOptions } from '../small-components/BulkEditOptions';
import { AlertCircle } from 'react-feather';
import '../../sass/light-theme/edit-multiple-listings.scss';

interface Props {
  selectedItems: number;
}
export const BulkEditListings = ({ selectedItems }: Props) => {
  const [index, setIndex] = useState<number>(0);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return <BulkEditMain />;
    case 1:
      return <BulkEditOptions />;
    default:
      return <></>;
    }
  };
  const handleChangeTab = (e: React.MouseEvent, index: number): void => {
    document.querySelector('.actve-tab')?.classList.remove('actve-tab');
    (e.target as Element).classList.add('actve-tab');
    setIndex(index);
  };

  return (
    <>
      <div className="upper-section">
        <h3>Edit {selectedItems} listings</h3>
        <div className="warning">
          <AlertCircle />{' '}
          <span>Be careful, by editing these values you will set this to all the selected listings.</span>
        </div>
      </div>

      <StatusBar>
        <StatusBtn title={`${t('Main')}`}  changeTab={(e) => handleChangeTab(e, 0)} className="actve-tab" />
        <StatusBtn title={`${t('Description')}`}  changeTab={(e) => handleChangeTab(e, 1)}/>
      </StatusBar>

      <div className="content">{renderContent(index)}</div>
    </>
  );
};
