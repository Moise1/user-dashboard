import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../custom-hooks/reduxCustomHooks';
import { SearchInput } from '../../../small-components/TableActionBtns';
import '../../../sass/settings/sources-table.scss';
import '../../../sass/popover.scss';
import { getSources } from '../../../redux/sources/sourcesThunk';
import { SourcesState } from '../../../redux/sources/sourceSlice';
import { getSourceConfiguration } from '../../../redux/source-configuration/sources.coonfiguration-thunk';
import { SourceConfigurationState } from '../../../redux/source-configuration/source-configuration-slice';
import { ReactUtils } from '../../../utils/react-utils';
import { ChannelConfigurationState } from '../../../redux/channel-configuration/channels-configuration-slice';
import { getChannelConfiguration, loadBusinessPolicies, loadShipping } from '../../../redux/channel-configuration/channels-configuration-thunk';
import { ColumnChannelAncestor, Columns, ColumnStyle } from '../configuration/columns';
import { t } from '../../../utils/transShim';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { getTemplates } from '../../../redux/templates/templatesThunk';
import { TemplateState } from '../../../redux/templates/templatesSlice';
import { SimpleTable } from '../../../small-components/tables/simple-table';
import { useHistory } from 'react-router';
import { ChannelSettingKey, SettingValue } from '../../../types/settings';
import { Links } from '../../../links';
import { SourceSettingData } from '../../../redux/source-configuration/types';
import { ePlatform } from '../../../data/platforms';

type SourceTableData = { name: string, id: number, [key: number]: SettingValue };

export const SourcesTable = () => {
  const dispatch = useAppDispatch();

  const selectedChannel = ReactUtils.GetSelectedChannel()!;

  const { sources, loading: loadingSources } = useAppSelector((state) => state.sources as SourcesState);
  const { get: { loading: loadingSourceConfiguration, settings: sourceSettings } } = useAppSelector((state) => state.sourcesConfiguration as SourceConfigurationState);
  const {
    settings: channelSettings,
    loading: settingsLoading,
    businessPolicies,
    shipping
  } = useAppSelector((state) => state.channelConfiguration as ChannelConfigurationState);
  const channelSettingsDic = new Map(channelSettings?.map(x => [x.key, x.value]) ?? []);
  const { templates } = useAppSelector((state) => state.templates as TemplateState);

  const [searchFilter, setSearchFilter] = useState<string>('');

  useEffect(() => {
    dispatch(getSourceConfiguration());
    dispatch(getSources());
    dispatch(getChannelConfiguration());
    dispatch(getTemplates());
  }, [getSources, getSourceConfiguration, getChannelConfiguration, getTemplates]);

  const LoadPolicies = () => {
    useEffect(() => {
      dispatch(loadShipping());
      dispatch(loadBusinessPolicies());
    }, [loadShipping, loadBusinessPolicies]);
  };

  switch (selectedChannel?.channelId) {
    case ePlatform.eBay:
    case ePlatform.eBayNoApi:
      LoadPolicies();
      break;
  }

  const settingsDic = new Map<ChannelSettingKey, SourceSettingData[]>();
  for (const ss of (sourceSettings ?? []) as SourceSettingData[]) {
    if (settingsDic.has(ss.sourceId)) {
      settingsDic.get(ss.sourceId)!.push(ss);
    } else {
      settingsDic.set(ss.sourceId, [ss]);
    }
  }


  const sourcesTableData: SourceTableData[] = sources?.map(x => {
    const settings = settingsDic?.get(x.id) ?? [];
    const toRet: SourceTableData = {
      name: x.name,
      id: x.id,
    };
    for (const s of settings) {
      toRet[s.key] = s.value;
    }
    return toRet;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const AncestorsFulfilled = (ca: ColumnChannelAncestor[]) => {
    for (const se of ca) {
      if (channelSettingsDic.has(se.Field)) {
        if (channelSettingsDic.get(se.Field) == se.Value) {
          return true;
        }
      }
    }
    return false;
  };

  const columns = [
    {
      title: t('Sources.Table.Name.Provider'),
      dataIndex: 'name',
      key: 'name'
    }
    , ...Columns.filter(x => (
      (!x.Channels || x.Channels!.length == 0 || x.Channels!.includes(selectedChannel.channelId))
      &&
      (!x.ChannelSettingAncestors || x.ChannelSettingAncestors!.length == 0 || AncestorsFulfilled(x.ChannelSettingAncestors!))
    )).map(x => {
      return {
        title: t(x.Title),
        dataIndex: x.Key.toString(),
        key: x.Key.toString(),
        render: (v: string) => {
          let value = v;
          if (!v && x.ChannelSetting != undefined) {
            value = channelSettingsDic.get(x.ChannelSetting) as string;
          }
          switch (x.Style) {
            default:
              return value;
            case ColumnStyle.Outlined:
              return value == '1' ? <CheckOutlined /> : (value == '0' ? <CloseOutlined /> : '');
            case ColumnStyle.BusinessPayment:
            case ColumnStyle.BusinessReturn:
            case ColumnStyle.BusinessShipping:
              if (!value) return '';
              return businessPolicies?.find(x => x.id.toString() == value)?.name;
            case ColumnStyle.PolicyReturns:
              switch (value) {
                default: return value;
                case 'Days_30':
                  return t('Channel.Setting.Option.Days30');
                case 'Days_14':
                  return t('Channel.Setting.Option.Days14');
                case 'Days_60':
                  return t('Channel.Setting.Option.Days60');
              }
            case ColumnStyle.Template:
              if (!value) return '';
              return templates?.find(x => x.id.toString() == value)?.name;
            case ColumnStyle.PolicyDelivery:
              if (!value) return '';
              return shipping?.find(x => x.value == value)?.text;
          }
        }
      };
    })
  ];

  const onSearch = (value: string) => {
    setSearchFilter(value);
  };

  const loading =
    loadingSources || loadingSourceConfiguration || settingsLoading
    ;

  const filteredData = (sourcesTableData ?? []).filter(x => x.name.toLocaleLowerCase().indexOf(searchFilter.toLocaleLowerCase()) >= 0);

  const history = useHistory();
  const OnRow = (record: SourceTableData) => ({
    onClick: () => {
      history.push(Links.SourcesSettings + '/' + record.id);
    }
  });

  return (
    <Layout className="sources-container">
      <div className="search-options-area">
        <SearchInput onSearch={onSearch} />
      </div>
      <div className="sources-table-container">
        <SimpleTable
          columns={columns}
          dataSource={loading ? [] : filteredData}
          onRow={OnRow}
        />
      </div>
    </Layout>
  );
};