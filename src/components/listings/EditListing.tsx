import { useState } from 'react';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { ListingMain } from '../small-components/ListingMain';
import {ListingDescription } from '../small-components/ListingDescription';
import { ListingDetails } from '../small-components/ListingDetails';
import { ListingOptions } from '../small-components/ListingOptions';
import '../../sass/light-theme/edit-listing.scss';

export const EditListing = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState<number>(0);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return <ListingMain/>;
    case 1:
      return <ListingDescription/>;
    case 2:
      return <ListingDetails/>;

    case 3:
      return <ListingOptions/>;

    default:
      return <></>;
    }
  };
  const onChangeTab = (index: number) => {
    setActive(true);
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
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </span>
          </a>
          <a href="#">
            View stock changes{' '}
            <span>
              <i className="fa fa-external-link" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      <StatusBar>
        <StatusBtn
          title={`${t('Listing.Main')}`}
          handleClick={() => onChangeTab(0)} 
          active={active}/>

        <StatusBtn 
          title={`${t('Listing.Description')}`}
          handleClick={() => onChangeTab(1)} 
          active={active} />
    
        <StatusBtn 
          title={`${t('Listing.Details')}`}
          handleClick={() => onChangeTab(2)} 
          active={active} />

        <StatusBtn 
          title={`${t('Listing.Options')}`}
          handleClick={() => onChangeTab(3)} 
          active={active} />

      </StatusBar>

      <div className="content">
        {renderContent(index)}
      </div>
    </>
  );
};
