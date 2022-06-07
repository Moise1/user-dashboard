import { ReactNode } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

const functions = {
  GetSystemValues: function (recursiveCount = 0): Record<string, PrimitiveType | JSX.Element> {
    if (recursiveCount > 2) {
      return {};
    }

    recursiveCount++;
    return {
      channel_platform_name: 'eBay',//TODO: Get selected channel and put here eBay, Amazon or Shopify
      sources_table_link: <a href='/sources-table'>{this.T('Menu.SourcesTable', {}, recursiveCount)}</a>
    };
  },
  T: function (key: string, values?: Record<string, PrimitiveType | JSX.Element>, recursiveCount = 0): string | ReactNode {
    if (!key) {
      return '';
    }

    const intl = useIntl();
    const v = intl.formatMessage(
      {
        id: key,
        description: '', // Description should be a string literal
        defaultMessage: '{errorKey}' // Message should be a string literal
      },
      { ...this.GetSystemValues(recursiveCount), ...values, key, errorKey: <span className="missingTranslation">{key}</span> } // Values should be an object literal, but not necessarily every value inside
    );

    return v;
  }
};

export function t(key: string, values?: Record<string, PrimitiveType | JSX.Element>): string | ReactNode {
  return functions.T(key, values, 0);
}

export function tm(key: string) {
  return <FormattedMessage id={key} defaultMessage="Translation missing for {key}" description="Welcome message" />;
}
