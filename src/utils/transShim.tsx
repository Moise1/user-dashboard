// ES modules
import { ReactNode } from 'react';
//import ReactDOMServer from 'react-dom/server';

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export function t(key: string, values?: Record<string, PrimitiveType>): string | ReactNode {
  //return key;
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
  // if(typeof(v) === 'string')
  //   return v;

  // const str = ReactDOMServer.renderToString(v as ReactElement);
  // return str;
}
export function tm(key: string) {
  return <FormattedMessage id={key} defaultMessage="Translation missing for {key}" description="Welcome message" />;
}
