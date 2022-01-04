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
      return <ChannelMonitoring />;
    }
  };

  const handleChangeIndex = (index: number) => setIndex(index);
  return (
    <Layout className="channel-settings">
      <StatusBar>
        <StatusBtn title={`${t('Channel.Monitoring')}`} handleClick={() => handleChangeIndex(0)}/>
        <StatusBtn title={`${t('Channel.Listing')}`} handleClick={() => handleChangeIndex(1)}/>
        <StatusBtn title={`${t('Channel.Business')}`} handleClick={() => handleChangeIndex(2)}/>
        <StatusBtn title={`${t('Channel.Other')}`} handleClick={() => handleChangeIndex(3)}/>
      </StatusBar>

      <Row className="content">
        <Col>{renderContent(index)}</Col>

        <Col>
          <ConfigButtons />
        </Col>
      </Row>
    </Layout>
  );
};
