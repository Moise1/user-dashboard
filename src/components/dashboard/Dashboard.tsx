import {useEffect} from 'react';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';

export const Dashboard = () => {
  const {channels} = useAppSelector(state => state.channels);
  useEffect(() => {
    localStorage.setItem('channelId', JSON.stringify(channels[0]?.id));
  }, []);
  
  return (
    <div>Dashboard</div>
  );
};
