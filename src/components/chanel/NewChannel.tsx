import { useState } from 'react';
import {Button, Row, Col} from 'antd';
import { Account } from './Account';
import {AccountConnect} from './AccountConnect';
import ChooseList, { chooseListValues } from './ChooseList';
import { PlatForm } from './PlatForm';
import {StoreLocation} from './StoreLocation';
import {UserName} from './UserName';
import { Stepper } from './Stepper';
import { ProgressBar } from './ProgressBar';
import '../../sass/light-theme/new-channel.scss';

interface state {
  platform: platformType;
  storeLocation: string;
  flag: string;
  location: string;
  api: string;
  extension: string;
  user: string;
  list: string;
}

interface Props {
  _ignored?: boolean;
}

export const NewChannel = ({ _ignored }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<state>({
    platform: 'ebay',
    storeLocation: '',
    flag: '',
    location: '',
    api: '',
    extension: '',
    user: '',
    list: ''
  });

  const handlePrev = () => setStep(prevState => prevState -1);
  const handleNext = () => setStep(prevState => prevState +1);

  const handleChangePlatform = (value: platformType) => {
    setData({ ...data, platform: value });
  };
  const handleChangeLocation = (value: string) => {
    setData({ ...data, storeLocation: value });
  };
  const handleChangeApi = (value: string) => {
    setData({ ...data, api: value });
  };
  const handleChangeExtension = (value: string) => {
    setData({ ...data, extension: value });
  };
  const handleChangeUser = (value: string) => {
    setData({ ...data, user: value });
  };
  const handleChangeList = (value: string) => {
    setData({ ...data, list: value });
  };

  const { platform, storeLocation, api, user, list, extension } = data;
  const values: chooseListValues = { platform, storeLocation, api, user, list, extension };

  const stepDetector = (step: number): JSX.Element => {
    switch (step) {
    case 1:
      return (
        <PlatForm
          platform={data.platform || 'ebay'}
          values={values}
          step={step}
          handleChangePlatform={handleChangePlatform}
        />
      );
    case 2:
      return (
        <StoreLocation
          platform={data.platform}
          values={values}
          step={step}
          handleChangeLocation={handleChangeLocation}
        />
      );
    case 3:
      return (
        <Account
          platform={data.platform}
          handleChangeApi={handleChangeApi}
          step={step}
        />
      );
    case 4:
      return (
        <AccountConnect
          api={data.api}
          extension={data.extension}
          platform={data.platform}
          handleChangeApi={handleChangeApi}
          handleChangeExtension={handleChangeExtension}
          values={values}
          step={step}
        />
      );
    case 5:
      return (
        <UserName
          platform={data.platform}
          user={data.user}
          handleChangeUser={handleChangeUser}
          values={values}
          step={step}
        />
      );
    case 6:
      return (
        <ChooseList
          platform={data.platform}
          handleChangeList={handleChangeList}
          values={values}
          list={list}
          step={step}
        />
      );
    default:
      return <></>;
    }
  };

  return (
    <div className="new-channel-container">
      <Stepper current={step} className="stepper" />
      <Row gutter={[16,0]}>
        <Col className="new-channel" lg={15}>
          {stepDetector(step)}
        </Col>
        <Col lg={6}>
          <ProgressBar platform={data.platform} step={step} />
        </Col>
        <div className="nav-btns">
          <Button className="primary-btn" onClick={handlePrev}>Back</Button>
          <Button className="primary-btn" onClick={handleNext}>Next</Button>
        </div>
      </Row>
    </div>
  );
};
