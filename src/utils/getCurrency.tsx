import { eCountry } from '../types/eCountry';
import { ReactUtils } from './react-utils';

export const getCurrency = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();

  switch (selectedChannel?.isoCountry) {
    case eCountry.US:
      return '\u0024';
    case eCountry.UK:
      return '\u00A3';
    case eCountry.AU:
      return 'AUD';
    case eCountry.ES:
    case eCountry.DE:
    case eCountry.FR:
    case eCountry.IT:
      return '\u20AC';
    default:
      return '\u20AC';
  }

};