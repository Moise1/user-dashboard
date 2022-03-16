import {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {getChannels} from '../../redux/channels/channelsThunk';

export const Dashboard = () => {
  const {channels} = useAppSelector(state => state.channels);
  const dispatch = useAppDispatch();
  const channelId = channels[0]?.id;
  useEffect(() => {
    dispatch(getChannels());
    localStorage.setItem('channelId', JSON.stringify(channelId));
  }, [getChannels, channelId]);

  return (
    <div>Dashboard</div>
  );
};
