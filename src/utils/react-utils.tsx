import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { ChannelsState } from '../redux/channels/channelsSlice';

export const ReactUtils = {
  GetSelectedChannel: () => {
    const { channels } = useAppSelector((state) => state.channels as ChannelsState);
    const { channelId: selectedChannelId } = useContext(AppContext);
    return channels.find(x => x.id == selectedChannelId);
  }
};