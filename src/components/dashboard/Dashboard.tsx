import {useEffect} from 'react';
import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';

export const Dashboard = () => {
  const {channels} = useAppSelector(state => state.channels);
  // const dispatch = useAppDispatch();
  const channelId = channels[0]?.id;
  useEffect(() => {
    // (async ()=>{
    //   await dispatch(getChannels());
    // })();
    localStorage.setItem('channelId', JSON.stringify(channelId));
  }, [channelId]);

  return (
    <div>Dashboard</div>
  );
};
