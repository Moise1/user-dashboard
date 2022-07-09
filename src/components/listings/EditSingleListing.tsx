import { useState } from 'react';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { ListingMain } from '../../small-components/ListingMain';
import { ListingDescription } from '../../small-components/ListingDescription';
import { ListingDetails } from '../../small-components/ListingDetails';
import { ListingOptions } from '../../small-components/ListingOptions';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon from '@ant-design/icons';

import '../../sass/edit-single-listing.scss';
import { ExternalLinkSvg } from '../common/Icons';
import { ActiveListing } from '../../redux/listings/listingsSlice';

interface Props {
  selectedRecordData: ActiveListing;
}

export const EditSingleListing = ({ selectedRecordData }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const renderContent = (index: number): JSX.Element => {
    switch (index) {
      case 0:
        return <ListingMain selectedRecordData={selectedRecordData} />;
      case 1:
        return <ListingDescription />;
      case 2:
        return <ListingDetails selectedRecordData={selectedRecordData} />;

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

  const ExternalLinkOutlined = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ExternalLinkSvg} {...props} />
  );


  return (
    <>
      <div className="upper-section">
        <h3>Editing listing: {selectedRecordData.id}</h3>
        <div className="external-links">
          <a href="#">
            View price Changes{' '}
            <span>
              <ExternalLinkOutlined />
            </span>
          </a>
          <a href="#">
            View stock changes{' '}
            <span>
              <ExternalLinkOutlined />
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
