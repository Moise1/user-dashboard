import { ReactNode } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { PlatformIndo } from '../data/platforms';
import { Links } from '../links';

export type TransValue = string | ReactNode;
export type TransValueTypeValue = PrimitiveType | ReactNode;

export function t(key: string, values?: Record<string, TransValueTypeValue>): TransValue {
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

export interface TransPlatformValues extends Record <string, TransValueTypeValue> {
  channel_platform_name: TransValueTypeValue,
  channel_noapi_username: TransValueTypeValue
}
export interface TransLinksValues extends Record<string, TransValueTypeValue> {
  sources_table_link: TransValueTypeValue,
  templates_link: TransValueTypeValue
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
      sources_table_link: <Link to={Links.SourcesSettings}>{t('Menu.SourcesTable', {})}</Link>,
      templates_link: <Link to={Links.Templates}>{t('Menu.Templates', {})}</Link>,
    };
  }
};
