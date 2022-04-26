import { useState } from 'react';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { BulkEditMain } from '../../small-components/BulkEditMain';
import { BulkEditDescription } from '../../small-components/BulkEditDescription';
import { AlertCircle } from 'react-feather';
import '../../sass/edit-multiple-listings.scss';

interface Props {
  selectedItems: number;
}
export const BulkEditListings = ({ selectedItems }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return <BulkEditMain />;
    case 1:
      return <BulkEditDescription />;
    default:
      return <></>;
    }
  };
  const handleChangeTab = (e: React.MouseEvent, index: number): void => {
    const id = e.currentTarget.getAttribute('id');
    setActiveTab(parseInt(id!));
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
        <StatusBtn
          title={`${t('Main')}`}
          changeTab={(e) => handleChangeTab(e, 0)}
          className={activeTab === 0 ? 'active-tab' : ''}
          id="0"
        />
        <StatusBtn
          title={`${t('Description')}`}
          changeTab={(e) => handleChangeTab(e, 1)}
          className={activeTab === 1 ? 'active-tab' : ''}
          id="1"
        />
      </StatusBar>

      <div className="content">{renderContent(index)}</div>
    </>
  );
};
