import { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { ChannelMonitoring } from '../small-components/ChannelMonitoring';
import { ChannelListing } from '../small-components/ChannelListing';
import { ChannelBusiness } from '../small-components/ChannelBusiness';
import { ChannelOther } from '../small-components/ChannelOther';
import { SuccessBtn, ResetBtn } from '../small-components/ActionBtns';
import '../../sass/channel-settings.scss';

export const ChannelSettings = () => {
  const [index, setIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderContent = (index: number): JSX.Element => {
    switch (index) {
    case 0:
      return <ChannelMonitoring />;
    case 1:
      return <ChannelListing />;
    case 2:
      return <ChannelBusiness />;

    case 3:
      return <ChannelOther />;

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
    <Layout className="channel-settings">
      <StatusBar>
        <StatusBtn
          title={`${t('Channel.Monitoring')}`}
          changeTab={(e) => handleChangeTab(e, 0)}
          className={activeTab === 0 ? 'active-tab' : ''}
          id="0"
        />
        <StatusBtn
          title={`${t('Channel.Listing')}`}
          changeTab={(e) => handleChangeTab(e, 1)}
          className={activeTab === 1 ? 'active-tab' : ''}
          id="1"
        />
        <StatusBtn
          title={`${t('Channel.Business')}`}
          changeTab={(e) => handleChangeTab(e, 2)}
          className={activeTab === 2 ? 'active-tab' : ''}
          id="2"
        />
        <StatusBtn
          title={`${t('Channel.Other')}`}
          changeTab={(e) => handleChangeTab(e, 3)}
          className={activeTab === 3 ? 'active-tab' : ''}
          id="3"
        />
      </StatusBar>

      <Row className="content">
        <Col className="text-section">{renderContent(index)}</Col>
        <Col className="action-btns">
          <SuccessBtn>{t('SaveChanges')}</SuccessBtn>
          <ResetBtn>{t('ResetToDefault')}</ResetBtn>
        </Col>
      </Row>
    </Layout>
  );
};
