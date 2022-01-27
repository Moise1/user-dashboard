import { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import '../../sass/light-theme/channel-settings.scss';
import { ChannelMonitoring } from '../small-components/ChannelMonitoring';
import { ChannelListing } from '../small-components/ChannelListing';
import { ChannelBusiness } from '../small-components/ChannelBusiness';
import { ChannelOther } from '../small-components/ChannelOther';
import { SuccessBtn, ResetBtn } from '../small-components/ActionBtns';

export const ChannelSettings = () => {
  const [index, setIndex] = useState<number>(0);

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

 
  const handleSelect = (e: React.MouseEvent, index: number): void => {
    document.querySelector('.active-btn')?.classList.remove('active-btn');
    (e.target as Element).classList.add('active-btn');
    setIndex(index);
  };

  return (
    <Layout className="channel-settings">
      <StatusBar>
        <StatusBtn title={`${t('Channel.Monitoring')}`} handleSelect={(e) => handleSelect(e, 0)} className="active-btn"/>
        <StatusBtn title={`${t('Channel.Listing')}`} handleSelect={(e) => handleSelect(e, 1)}/>
        <StatusBtn title={`${t('Channel.Business')}`} handleSelect={(e) => handleSelect(e, 2)}/>
        <StatusBtn title={`${t('Channel.Other')}`} handleSelect={(e) => handleSelect(e,3)} />
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
