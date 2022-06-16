import { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { Account } from './Account';
import { AccountConnect } from './AccountConnect';
import { ChooseList, chooseListValues } from './ChooseList';
import { PlatForm } from './PlatForm';
import { StoreLocation } from './StoreLocation';
import { UserName } from './UserName';
import { Stepper } from './Stepper';
import { SideProgressBar } from './SideProgressBar';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { getLinkAccount } from 'src/redux/new-channel/newChannelThunk';
import { eShop } from 'src/utils/eShop';
import '../../sass/new-channel.scss';

interface state {
  platform: number;
  storeLocation: string | number | null;
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

const popupWindow = (url: string, windowName: string, win: Window & typeof globalThis, w: number, h: number) => {
  const t = win!.top!.outerHeight / 2 + win!.top!.screenY - h / 2;
  const l = win!.top!.outerWidth / 2 + win!.top!.screenX - w / 2;
  return win
    .open(
      url,
      windowName,
      `
  toolbar=no, location=no, directories=no,
  status=no, menubar=no, scrollbars=no,
  resizable=no, copyhistory=no, 
  width=${w}, height=${h}, top=${t}, left=${l}`
    )
    ?.focus();
};
export const NewChannel = ({ _ignored }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [showNext, setShowNext] = useState<boolean>(false);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const { url } = useAppSelector((state) => state.linkAccount);
  const [ebayUrl, setEbayUrl] = useState<string>(url);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<state>({
    platform: eShop.eBay,
    storeLocation: null,
    flag: '',
    location: '',
    api: '',
    extension: '',
    user: '',
    list: ''
  });

  const handlePrev = () => {
    setStep((prevState) => prevState - 1);
    setEbayUrl('');
  };
  const handleNext = () => {
    if (url !== '' && step === 4 && data.api === 'easy') {
      setEbayUrl(url);
      popupWindow(ebayUrl, 'Ebay Account', window, 800, 600);
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
    data.api === 'easy' && dispatch(getLinkAccount({ shop: data.platform, site: data.storeLocation as number }));
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

  const { platform, api, user, list, extension } = data;
  const values: chooseListValues = { platform, api, user, list, extension };

  const stepDetector = (step: number): JSX.Element | undefined => {
    switch (step) {
    case 1:
      return (
        <PlatForm 
          platform={data.platform}
          step={step}
          handleChangePlatform={handleChangePlatform} />
      );
    case 2:
      return (
        <StoreLocation 
          platform={data.platform} 
          step={step} 
          handleChangeLocation={handleChangeLocation} />
      );
    case 3:
      return (
        <Account 
          platform={data.platform} 
          handleChangeApi={handleChangeApi} 
          step={step} />
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
      break;
    }
  };

  return (
    <div className="new-channel-container">
      <Stepper current={step} className="stepper" />
      <Row gutter={[16, 0]}>
        <Col className="left-section" lg={15}>
          {stepDetector(step)}
          <div className="nav-btns">
            {showPrev && (
              <Button className="" onClick={handlePrev}>
                <ArrowLeftOutlined style={{ fontSize: '19px' }} /> Previous Step
              </Button>
            )}
            {showNext && (
              <Button onClick={handleNext}>
                <ArrowRightOutlined style={{ fontSize: '19px' }} />
                {step === 6 ? 'Finish' : 'Next'}{' '}
              </Button>
            )}
          </div>
        </Col>
        <Col lg={6} className="right-section">
          <SideProgressBar platform={data.platform} step={step} />
        </Col>
      </Row>
    </div>
  );
};
