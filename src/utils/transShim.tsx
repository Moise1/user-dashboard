import { ReactNode } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { PlatformIndo } from '../data/platforms';
import { Links } from '../links';

export type TransValue = string | ReactNode;
type ValueTypeValue = PrimitiveType | ReactNode;

export function t(key: string, values?: Record<string, ValueTypeValue>): TransValue {
  if(!key) {
    return '';
  }

  const intl = useIntl();
  const v = intl.formatMessage(
    {
      id: key,
      description: '', // Description should be a string literal
      defaultMessage: '{errorKey}' // Message should be a string literal
    },
    { ...values, key, errorKey: <span className="missingTranslation">{key}</span> } // Values should be an object literal, but not necessarily every value inside
  );

  return v;
}

export function tm(key: string) {
  return <FormattedMessage id={key} defaultMessage="Translation missing for {key}" description="Welcome message" />;
}

export interface TransPlatformValues extends Record <string, ValueTypeValue> {
  channel_platform_name: ValueTypeValue,
  channel_noapi_username: ValueTypeValue
}
export interface TransLinksValues extends Record<string, ValueTypeValue> {
  sources_table_link: ValueTypeValue,
  templates_link: ValueTypeValue
}

export const TransUtils = {
  GetPlatformValues: (platform: PlatformIndo): TransPlatformValues => {
    return {
      channel_platform_name: platform.storeName,
      channel_noapi_username: t('Platform.' + platform.storeName + '.NoApi.Username', {})
    };
  },
  GetLinksValues: () => {
    return {
      sources_table_link: <Link to={Links.SourcesSettingsTable}>{t('Menu.SourcesTable', {})}</Link>,
      templates_link: <Link to={Links.Templates}>{t('Menu.Templates', {})}</Link>,
    };
  }
};
