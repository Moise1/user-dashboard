import { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { StatusBar } from '../small-components/StatusBar';
import { StatusBtn } from '../small-components/StatusBtn';
import { t } from '../../global/transShim';
import { ConfigButtons } from '../small-components/ConfigButtons';
import '../../sass/light-theme/chanel-settings.scss';
import { ChannelMonitoring } from '../small-components/ChannelMonitoring';
import { ChannelListing } from '../small-components/ChannelListing';
import { ChannelBusiness } from '../small-components/ChannelBusiness';
import { ChannelOther } from '../small-components/ChannelOther';

export const ChannelSettings = () => {
  const [index, setIndex] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

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

  
  const handleChangeIndex = (index: number) => {
    setIndex(index);
    setActive(true);
  };
  
  
  return (
    <Layout className="channel-settings">
      <StatusBar>
        <StatusBtn title={`${t('Channel.Monitoring')}`} handleClick={() => handleChangeIndex(0)} active={active}/>
        <StatusBtn title={`${t('Channel.Listing')}`} handleClick={() => handleChangeIndex(1)} active={active}/>
        <StatusBtn title={`${t('Channel.Business')}`} handleClick={() => handleChangeIndex(2)} active={active}/>
        <StatusBtn title={`${t('Channel.Other')}`} handleClick={() => handleChangeIndex(3)} active={active}/>
      </StatusBar>

      <Row className="content">
        <Col className="text-section">{renderContent(index)}</Col>
        <Col>
          <ConfigButtons />
        </Col>
      </Row>
    </Layout>
  );
};
