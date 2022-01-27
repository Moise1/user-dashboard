import { useState } from 'react';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { ListingMain } from '../small-components/ListingMain';
import { ListingDescription } from '../small-components/ListingDescription';
import { ListingDetails } from '../small-components/ListingDetails';
import { ListingOptions } from '../small-components/ListingOptions';
import '../../sass/light-theme/edit-single-listing.scss';
import { ExternalLink } from 'react-feather';

export const EditSingleListing = () => {
  const [index, setIndex] = useState<number>(0);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return <ListingMain />;
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
    document.querySelector('.active-tab')?.classList.remove('active-tab');
    (e.target as Element).classList.add('active-tab');
    setIndex(index);
  };

  return (
    <>
      <div className="upper-section">
        <h3>Editing listing: 20000</h3>
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
        <StatusBtn title={`${t('Main')}`} changeTab={(e) => handleChangeTab(e, 0)} className="active-tab" />
        <StatusBtn title={`${t('Description')}`} changeTab={(e) => handleChangeTab(e, 1)} />
        <StatusBtn title={`${t('Details')}`} changeTab={(e) => handleChangeTab(e, 2)} />
        <StatusBtn title={`${t('Options')}`} changeTab={(e) => handleChangeTab(e, 3)}/>
      </StatusBar>

      <div className="content">{renderContent(index)}</div>
    </>
  );
};
