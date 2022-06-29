import { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { Account } from './Account';
import { AccountConnect } from './AccountConnect';
import { ChooseList } from './ChooseList';
import { PlatForm } from './PlatForm';
import { StoreLocation } from './StoreLocation';
import { UserName } from './UserName';
import { Stepper } from './Stepper';
import { SideProgressBar } from './SideProgressBar';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { getEbayLinkAccount } from 'src/redux/new-channel/newChannelThunk';
import '../../sass/new-channel.scss';

interface State {
  platform: number | null;
  storeLocation: string | number | null;
  flag: string;
  location: string;
  api: string;
  extension: string;
  list: string;
}


export const popupWindow = (
  url: string,
  win: Window & typeof globalThis,
  w: number, 
  h: number) => {
  const t = win!.top!.outerHeight / 2 + win!.top!.screenY - h / 2;
  const l = win!.top!.outerWidth / 2 + win!.top!.screenX - w / 2;
  return win
    .open(
      url,
      '_blank',
      `toolbar=no, location=yes, directories=no,
      status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, 
      width=${w}, height=${h}, top=${t}, left=${l}`
    );
};
export const NewChannel = () => {
  const [step, setStep] = useState<number>(1);
  const [showNext, setShowNext] = useState<boolean>(false);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [ebayUrl, setEbayUrl] = useState<string>('');
  const { url, getLinkLoading } = useAppSelector((state) => state.newChannel);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<State>({
    platform: null,
    storeLocation: null,
    flag: '',
    location: '',
    api: '',
    extension: '',
    list: ''
  });

 

  const handlePrev = () => {
    setStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (ebayUrl !== '' && step === 4 && data.api === 'easy') {
      popupWindow(ebayUrl, window, 800, 600);
      return;
    }
    setStep((prevState) => prevState + 1);
    setShowPrev(true);
  };

  const handleChangePlatform = (value: number) => {
    setData({ ...data, platform: value });
    setShowNext(true);
  };
  const handleChangeLocation = (value: number | string) => {
    setData({ ...data, storeLocation: value });
  };
  const handleChangeApi = (value: string) => {
    setData({ ...data, api: value });      
  };

  const handleChangeExtension = (value: string) => {
    setData({ ...data, extension: value });
  };

  const handleChangeList = (value: string) => {
    setData({ ...data, list: value });
  };

  useEffect(() => {
    dispatch(
      getEbayLinkAccount({
        data: {
          shop: data.platform!,
          site: data.storeLocation as number
        }
      })
    );
    if(data.api === 'easy'){
      setEbayUrl(url);
    }else {
      setEbayUrl('');
    }
  }, [data.api]);

  const stepDetector = (step: number): JSX.Element | undefined => {
    switch (step) {
    case 1:
      return (
        <PlatForm 
          platform={data.platform!} 
          step={step} 
          handleChangePlatform={handleChangePlatform}
        />
      );
    case 2:
      return (
        <StoreLocation
          platform={data.platform!}
          step={step}
          handleChangeLocation={handleChangeLocation}
          location={data.storeLocation!}
        />
      );
    case 3:
      return (
        <Account 
          platform={data.platform!} 
          handleChangeApi={handleChangeApi} 
          step={step} handleNext={handleNext}
        />
      );
    case 4:
      if (data.platform === 1 || data.platform === 1) {
        return (
          <AccountConnect
            api={data.api}
            extension={data.extension}
            platform={data.platform}
            handleChangeApi={handleChangeApi}
            handleChangeExtension={handleChangeExtension}
            step={step}
          />
        );
      } else {
        return (
          <UserName
            platform={data.platform!}
            step={step}
            storeLocation={data.storeLocation}
            handleNext={handleNext}
          />
        );
      }
    case 5:
      return (
        <UserName 
          platform={data.platform!} 
          step={step} 
          storeLocation={data.storeLocation}
          handleNext={handleNext}
        />
      );
    case 6:
      return (
        <ChooseList 
          platform={data.platform!} 
          handleChangeList={handleChangeList} 
          list={data.list} step={step} 
        />
      );
    default:
      break;
    }
  };

  const isDisabled = () => {
    if (!data.storeLocation && step === 2) return true;
    if (!data.api && step === 4) return true;
    if(getLinkLoading && step === 4) return true;
  };

  return (
    <div className="new-channel-container">
      <Stepper current={step} platform={data.platform} className="stepper" />
      <Row className='row-ant' gutter={[16, 0]}>
        <Col className="left-section" md={24} lg={15}>
          {stepDetector(step)}
        </Col>
        <Col md={24} lg={6} className="right-section">
          <SideProgressBar platform={data.platform} step={step} />
        </Col>
      </Row>
      <div className="nav-btns">
        {showPrev && step >= 1 && (
          <Button className="" onClick={handlePrev}>
            <ArrowLeftOutlined style={{ fontSize: '19px' }} /> Previous Step
          </Button>
        )}
        {showNext && step < 6 && (
          <Button onClick={handleNext} disabled={isDisabled()} style={{ color: isDisabled() && '#cccc' }}>
            <ArrowRightOutlined style={{ fontSize: '19px', color: isDisabled() && '#cccc' }} />
            {step === 6 ? 'Finish' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
};
