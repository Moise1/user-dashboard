import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { ChannelsState } from '../redux/channels/channelsSlice';
import moment from 'moment';
import { Countries, eCountry } from '../data/countries';

export const ReactUtils = {
  GetSelectedChannel: () => {
    const { channels } = useAppSelector((state) => state.channels as ChannelsState);
    const { channelId: selectedChannelId } = useContext(AppContext);
    return channels.find(x => x.id == selectedChannelId);
  },

  GetCurrencySymbol: () => {
    const selectedChannel = ReactUtils.GetSelectedChannel();
    return Countries[selectedChannel?.isoCountry ?? eCountry.UK].CurrencySymbol;
  },

  GetFormattedDateTime: (date: Date | string | undefined) => {
    return moment(date).format('L LT');
  },

  GetFormattedDate: (date: Date | string | undefined) => {
    return moment(date).format('L');
  },

  OnClickNoPropagate: (e: React.MouseEvent) => {
    e.stopPropagation();
    return false;
  }

};