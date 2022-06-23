import { ReactNode, useEffect, useState } from 'react';
import { Layout, Radio, RadioChangeEvent, Row, Button, Col } from 'antd';
import { StatusBar } from '../../../small-components/StatusBar';
import { StatusBtn } from '../../../small-components/StatusBtn';
import { t, TransUtils } from '../../../utils/transShim';
import '../../../sass/account-settings.scss';
import { useAppDispatch, useAppSelector } from '../../../custom-hooks/reduxCustomHooks';
import { getAccountConfiguration, saveAccountSetting } from '../../../redux/account-configuration/account-configuration-thunk';
import { Account, AccountConfigurationState, eAccountSettings, SettingsValue } from '../../../redux/account-configuration/account-configuration-slice';
import { AccountSetting, AccountSettings } from '../configuration/settings';
import { AccountSettingSections, AccountSettingSection } from '../configuration/sections';
import { SettingDataBag, AccountSettingInput } from '../../../small-components/settings/account-setting-input';
import { ReactUtils } from '../../../utils/react-utils';
import { Platforms } from '../../../data/platforms';
import { toastAlert } from '../../../utils/toastAlert';
import { Link } from 'react-router-dom';


export const AccountConfiguration = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const platformInfo = Platforms[selectedChannel?.channelId.toString() ?? '1'];
  const translationValues = { ...TransUtils.GetLinksValues(), ...TransUtils.GetPlatformValues(platformInfo) };

  const [activeTab, setActiveTab] = useState<AccountSettingSection>(AccountSettingSection.BillingAddress);
  const sections = AccountSettingSections.filter(x => !x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0));
  const bag: SettingDataBag = {
    selectedAccount: undefined
  };
  const dispatch = useAppDispatch();

  //Load from api------------------------------------------------------------
  const {
    settings,
    loading: settingsLoading,
    savingSettings: savingSettingsState
  } = useAppSelector((state) => state.accountConfiguration as AccountConfigurationState);

  const initialModel: Account = {
    country: '',
    businessType: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    rn: '',
    vat: '',
    roi: false,
    needInformation: false,
    iAmBusiness: false
  };

  const [model, setModel] = useState<Account>(initialModel);
  const [iAmBusiness, setIAMBusiness] = useState<boolean>();


  const SaveSetting = (key: eAccountSettings, value: SettingsValue) => {

    switch (key) {
      case eAccountSettings.Address1: {
        setModel({
          ...model, address1: value
        });
        break;
      }
      case eAccountSettings.Address2: {
        setModel({
          ...model, address2: value
        });
        break;
      }
      case eAccountSettings.BusinessType: {
        setModel({
          ...model, businessType: value
        });
        break;
      }
      case eAccountSettings.City: {
        setModel({
          ...model, city: value
        });
        break;
      }
      case eAccountSettings.Country: {
        setModel({
          ...model, country: value
        });
        break;
      }
      case eAccountSettings.IAmBusiness: {
        setModel({
          ...model, iAmBusiness: value as unknown as boolean
        });
        break;
      }
      case eAccountSettings.NeedInformation: {
        setModel({
          ...model, needInformation: value as unknown as boolean
        });
        break;
      }
      case eAccountSettings.Roi: {
        setModel({
          ...model, roi: value as unknown as boolean
        });
        break;
      }
      case eAccountSettings.Name: {
        setModel({
          ...model, name: value
        });
        break;
      }
      case eAccountSettings.Postcode: {
        setModel({
          ...model, postcode: value
        });
        break;
      }
      case eAccountSettings.Rn: {
        setModel({
          ...model, rn: value
        });
        break;
      }
      case eAccountSettings.Vat: {
        setModel({
          ...model, vat: value
        });
        break;
      }
    }

    console.log(model);
  };
  const onChange = (e: RadioChangeEvent) => {
    setIAMBusiness(e.target.value as unknown as boolean);
    SaveSetting(eAccountSettings.IAmBusiness, e.target.value);
    console.log(iAmBusiness);
  };
  const InitializeModel = () => {
    settings?.map((x) => {
      switch (x.key) {
        case eAccountSettings.Address1: {
          setModel({
            ...model, address1: x.value
          });
          break;
        }
        case eAccountSettings.Address2: {
          setModel({
            ...model, address2: x.value
          });
          break;
        }
        case eAccountSettings.BusinessType: {
          setModel({
            ...model, businessType: x.value
          });
          break;
        }
        case eAccountSettings.City: {
          setModel({
            ...model, city: x.value
          });
          break;
        }
        case eAccountSettings.Country: {
          setModel({
            ...model, country: x.value
          });
          break;
        }
        case eAccountSettings.IAmBusiness: {
          setModel({
            ...model, iAmBusiness: x.value as unknown as boolean
          });
          setIAMBusiness(x.value === 'True' ? true : false);
          break;
        }
        case eAccountSettings.NeedInformation: {
          setModel({
            ...model, needInformation: x.value as unknown as boolean
          });
          break;
        }
        case eAccountSettings.Roi: {
          setModel({
            ...model, roi: x.value as unknown as boolean
          });
          break;
        }
        case eAccountSettings.Name: {
          setModel({
            ...model, name: x.value
          });
          break;
        }
        case eAccountSettings.Postcode: {
          setModel({
            ...model, postcode: x.value
          });
          break;
        }
        case eAccountSettings.Rn: {
          setModel({
            ...model, rn: x.value
          });
          break;
        }
        case eAccountSettings.Vat: {
          setModel({
            ...model, vat: x.value
          });
          break;
        }
      }
    });
  };

  useEffect(() => {
    dispatch(getAccountConfiguration());
    InitializeModel();
  }, [getAccountConfiguration]);

  const configuration = new Map(settings?.map((x) => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map((x) => [x.data.key, x]));

  const OnButtonClick = async () => {
    console.log(model);
    const rp = await dispatch(saveAccountSetting(model));
    console.log(rp);
    if (rp.payload?.success) {
      dispatch(getAccountConfiguration());
      toastAlert('Account successfully deleted', 'success');
    }
    else {
      toastAlert(rp.payload.error[0].description, 'error');
    }
    dispatch(getAccountConfiguration());
  };

  const RenderSetting = (setting: AccountSetting) => {
    return (
      <AccountSettingInput
        key={setting.Fields[0]}
        setting={setting}
        savingSetting={savingSetting}
        currentSettingValues={configuration}
        translationValues={translationValues}
        onSave={SaveSetting}
        dataBag={bag}
        onButtonClick={() => OnButtonClick()}
      />
    );
  };

  const RenderSettings = (section: AccountSettingSection): ReactNode => {
    const settings = AccountSettings.filter(
      (x) => x.Section == section && (!x.ChannelIds || x.ChannelIds.includes(selectedChannel?.channelId ?? 0))
    );
    if (section === AccountSettingSection.BillingAddress) {
      return <div>
        <Radio.Group defaultValue={iAmBusiness} value={iAmBusiness} onChange={onChange}>
          <Radio className='radio' checked={iAmBusiness} value={true}><h3>{t('Account.Setting.BusinessAccount')}</h3></Radio>
          <h4>{t('Account.Setting.Description.BusinessAccount')}</h4>
          <h4> &nbsp; </h4>
          <Row>
            <Col span={2}>&nbsp;</Col>
            <Col span={22}>
              {iAmBusiness && settings.map((x) => RenderSetting(x))}
            </Col>
          </Row>
          <h4> &nbsp; </h4>
          <Radio className='radio' checked={iAmBusiness} value={false}><h3>{t('Account.Setting.PersonalAccount')}</h3></Radio>
          <h4>{t('Account.Setting.Description.PersonalAccount')}</h4>
          <h4></h4>
        </Radio.Group>
        <h4> &nbsp; </h4>
        <Row>
          <Col span={16}>&nbsp;</Col>
          <Col span={8}>
            <Button className='primary-btn save-btn' onClick={OnButtonClick}>{t('Account.Setting.Name.SaveAll')}</Button>
          </Col>
        </Row>
      </div>;
    }
    else if (section === AccountSettingSection.PaymentMethod) {
      return <div>
        <Row>
          <h1>{t('Account.PaymentMethod.SubscriptionPaymentMethod')}</h1>
        </Row>
        <Row>
          <h5>{t('Account.PaymentMethod.Description.SubscriptionPaymentMethod')}<Link to='/subscriptions'>{t('Account.PaymentMethod.Description.subscriptionplans')}</Link>.</h5>
        </Row>
        <h3> &nbsp; </h3>
        <Row>
          <h1>{t('Account.PaymentMethod.AutoOrderingPM')}</h1>
        </Row>
        <Row>
          <h5>{t('Account.PaymentMethod.Description.AutoOrderingWOF')}<Link to='/services/auto-ordering'>{t('Account.PaymentMethod.PremiumSuppliers')}</Link>. {t('Account.PaymentMethod.Description.AutoOrderingFSP')}</h5>
        </Row>
        <h6> &nbsp; </h6>
        <Row>
          <h5>{t('Account.PaymentMethod.Description.VAOCP')}</h5>
        </Row>
        <Row>
          <Button className='primary-btn save-btn'>{t('Account.PaymentMethod.AddPaymentMentod')}</Button>
        </Row>
      </div>;
    }
    return <>{settings.map((x) => RenderSetting(x))}</>;
  };

  const RenderContent = (index: AccountSettingSection): ReactNode => RenderSettings(index);

  const loading = settingsLoading || !settings;

  return (
    <Layout className="account-settings">
      <StatusBar>
        <>
          {!loading && (
            <>
              {sections.map((x, i) => (
                <StatusBtn
                  key={i}
                  title={t(x.Label) as string}
                  changeTab={(_) => setActiveTab(x.Type)}
                  className={activeTab == x.Type ? 'active-tab' : ''}
                  id={i.toString()}
                />
              ))}
            </>
          )}
        </>
      </StatusBar>
      <Row className="content">{!loading && RenderContent(activeTab)}</Row>
    </Layout>
  );
};
