import { useState, useEffect } from 'react';
import { AppContext, initialAppContext } from './contexts/AppContext';
import './sass/index.scss';
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const AppContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialAppContext.theme);
  const [channelId, setChannelId] = useState<number>(initialAppContext.channelId);

  useEffect(() => {
    const savedTheme = localStorage.getItem('globalTheme');
    const sId = localStorage.getItem('channelId');
    const savedChannelId = sId ? parseInt(sId) : undefined;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedChannelId) {
      setChannelId(savedChannelId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalTheme', theme);
    localStorage.setItem('channelId', channelId?.toString() ?? '');
  }, [theme, channelId]);

  return (
    <AppContext.Provider value={{ theme, setTheme, channelId, setChannelId }}>
      <div data-theme={theme} className="theme-provider">
        {children}
      </div>
    </AppContext.Provider>
  );
};
