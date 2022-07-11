import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { eCountry } from '../types/eCountry';

export const getCurrency = () => {
  const channelId = localStorage.getItem('channelId');
  const { channels } = useAppSelector((state) => state.channels);
  const channel = channels?.filter((x: { id: number }) => x.id as unknown as string == channelId);

  switch (channel[0].isoCountry) {
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