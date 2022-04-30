import { useState } from 'react';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { ListingMain } from '../../small-components/ListingMain';
import { ListingDescription } from '../../small-components/ListingDescription';
import { ListingDetails } from '../../small-components/ListingDetails';
import { ListingOptions } from '../../small-components/ListingOptions';
import '../../sass/edit-single-listing.scss';
import { ExternalLink } from 'react-feather';
// import { SeletedRowsType } from '../tables/DataTable';
import { ListingData } from 'src/redux/listings/listingsSlice';
interface Props {
  selectedItems: ListingData;
}

// eslint-disable-next-line react/prop-types
export const EditSingleListing: React.FC<Props> = ({ selectedItems }: Props) => {
  // console.log('selected', selectedItems);
  const [index, setIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return <ListingMain selectedItems={selectedItems} />;
    case 1:
      return <ListingDescription />;
    case 2:
      return <ListingDetails />;

    case 3:
      return <ListingOptions />;

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
        <h3>Editing listing: {selectedItems.id}</h3>
        <div className="external-links">
          <a href="#">
            View price Changes{' '}
            <span>
              <ExternalLink size="20" />
            </span>
          </a>
          <a href="#">
            View stock changes{' '}
            <span>
              <ExternalLink size="20" />
            </span>
          </a>
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
        <StatusBtn
          title={`${t('Details')}`}
          changeTab={(e) => handleChangeTab(e, 2)}
          className={activeTab === 2 ? 'active-tab' : ''}
          id="2"
        />
        <StatusBtn
          title={`${t('Options')}`}
          changeTab={(e) => handleChangeTab(e, 3)}
          className={activeTab === 3 ? 'active-tab' : ''}
          id="3"
        />
      </StatusBar>

      <div className="content">{renderContent(index)}</div>
    </>
  );
};
