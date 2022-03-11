import { useState, useEffect } from 'react';
import { AppContext, initialAppContext } from './contexts/AppContext';
import {useAppSelector} from './custom-hooks/reduxCustomHooks';

import './sass/index.scss';

interface Props {
    children: JSX.Element | JSX.Element[];
}
export const AppContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialAppContext.theme);
  const { channels } = useAppSelector((state) => state.channels);
  const stringChannelId = JSON.stringify(channels[0]?.id);
  const [channelId, setChannelId] = useState<string|null>(initialAppContext.channelId = stringChannelId);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('globalTheme');
    const savedChannelId = localStorage.getItem('channelId');
    if (savedTheme && savedChannelId) {
      setTheme(savedTheme);
      setChannelId(savedChannelId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalTheme', theme);
    localStorage.setItem('channelId', channelId!);
  }, [theme, channelId]);



  return (
    <AppContext.Provider 
      value={{ theme, setTheme, channelId, setChannelId }}
    >
      <div data-theme={theme} className="theme-provider">
        {children}
      </div>
    </AppContext.Provider>
  );
};
