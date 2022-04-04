import {useEffect} from 'react';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';

export const Dashboard = () => {
  const {channels} = useAppSelector(state => state.channels);
  const channelId = channels[0]?.id;
  useEffect(() => { 
    localStorage.setItem('channelId', JSON.stringify(channelId));
  }, [channelId]);

  return (
    <div>Dashboard</div>
  );
};
