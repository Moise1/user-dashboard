import { useState } from 'react';
import {Account} from './Account';
import AccountConnect from './AccountConnect';
import ChooseList, { chooseListValues } from './ChooseList';
import {PlatForm} from './PlatForm';
import StoreLocation from './StoreLocation';
import UserName from './UserName';
import {Stepper} from './Stepper';
import '../../sass/light-theme/new-channel.scss';

interface state {
  step: number;
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

export const NewChannel = ({_ignored}: Props) => {
  const [data, setData] = useState<state>({
    step: 1,
    platform: 'ebay',
    storeLocation: '',
    flag: '',
    location: '',
    api: '',
    extension: '',
    user: '',
    list: ''
  });

  const { step } = data;
  const prevStep = () => {
    setData({ ...data, step: step - 1 });
  };
  const nextStep = () => {
    setData({ ...data, step: step + 1 });
  };

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

  const stepDetector = (): JSX.Element | undefined => {
    switch (step) {
    case 1:
      return (
        <PlatForm
          platform={data.platform || 'ebay'}
          nextStep={nextStep}
          values={values}
          step={step}
          handleChangePlatform={handleChangePlatform}
        />
      );
    case 2:
      return (
        <div className="new-channel">
          <StoreLocation
            platform={data.platform}
            nextStep={nextStep}
            prevStep={prevStep}
            values={values}
            step={step}
            handleChangeLocation={handleChangeLocation}
          />
        </div>
      );
    case 3:
      return (
        <div className="new-channel">
          <Account
            platform={data.platform}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChangeApi={handleChangeApi}
            step={step}
          />
        </div>
      );
    case 4:
      return (
        <div className="new-channel">
          <AccountConnect
            api={data.api}
            extension={data.extension}
            platform={data.platform}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChangeApi={handleChangeApi}
            handleChangeExtension={handleChangeExtension}
            values={values}
            step={step}
          />
        </div>
      );
    case 5:
      return (
        <div className="new-channel">
          <UserName
            platform={data.platform}
            user={data.user}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChangeUser={handleChangeUser}
            values={values}
            step={step}
          />
        </div>
      );
    case 6:
      return (
        <div className="new-channel">
          <ChooseList
            platform={data.platform}
            nextStep={nextStep}
            prevStep={prevStep}
            handleChangeList={handleChangeList}
            values={values}
            list={list}
            step={step}
          />
        </div>
      );
    default: 
      return undefined;
    }
  };
  
  return(
    <div className="new-channel-container">
      <Stepper current={step} className="stepper"/>
      <div className="new-channel">
        {stepDetector()}
      </div>
    </div>
  );
};
