import { FormattedMessage, useIntl } from 'react-intl';

export function t(key: string, values?: Record<string, PrimitiveType>) {
  //return key;
  const intl = useIntl();
  const v = intl.formatMessage(
    {
      id: key,
      description: '', // Description should be a string literal
      defaultMessage: '[[!!"{key}"]]' // Message should be a string literal
    },
    { ...values, key } // Values should be an object literal, but not necessarily every value inside
  );
  return v;
}
export function tm(key: string) {
  return <FormattedMessage id={key} defaultMessage="Translation missing for {key}" description="Welcome message" />;
}
