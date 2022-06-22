import { ReactNode, useEffect, useState } from 'react';
import { Layout, Row } from 'antd';
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

  const [data, setData] = useState(settings ? settings : []);

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

  const SaveSetting = (key: eAccountSettings, value: SettingsValue) => {
    const newData = data.map((x) => {
      if (x.key === key)
        return { ...x, value: value };
      return x;
    });

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
    setData(newData);
    console.log(newData);
    console.log(model);
  };

  const InitializeModel = () => {
    console.log('InitializeModel');
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
    console.log('called the account config');
    dispatch(getAccountConfiguration());
    InitializeModel();
  }, [getAccountConfiguration]);

  const configuration = new Map(settings?.map((x) => [x.key, x.value]) ?? []);
  const savingSetting = new Map(savingSettingsState?.map((x) => [x.data.key, x]));

  const OnButtonClick = async () => {
    console.log('data: ' + data.length);
    console.log(model);

    console.log(model);
    const rp = await dispatch(saveAccountSetting(model));
    console.log(rp);
    if (!rp.payload?.success) {
      dispatch(getAccountConfiguration());
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
      return <>
        {settings.map((x) => RenderSetting(x))}
      </>;

    }
    return <>{settings.map((x) => RenderSetting(x))}</>;
  };

  const RenderContent = (index: AccountSettingSection): ReactNode => RenderSettings(index);

  const loading = settingsLoading || !settings;

  return (
    <Layout className="account-settings">
      <h1>Accounts</h1>
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
