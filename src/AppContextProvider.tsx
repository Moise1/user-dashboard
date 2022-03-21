import { useState, useEffect } from 'react';
import { AppContext, initialAppContext } from './contexts/AppContext';
import './sass/index.scss';
interface Props {
    children: JSX.Element | JSX.Element[];
}
export const AppContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialAppContext.theme);
  const [channelId, setChannelId] = useState<string|null>(initialAppContext.channelId);
  
  

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
