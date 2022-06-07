import { useState, useEffect } from 'react';
import { AppContext, initialAppContext } from './contexts/AppContext';
import './sass/index.scss';
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const AppContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialAppContext.theme);
  const [channelId, setChannelId] = useState<number>(initialAppContext.channelId);

  const SetChannelId = (newChannelId: number) => {
    if (newChannelId != channelId) {
      localStorage.setItem('channelId', newChannelId?.toString());
      setChannelId(newChannelId);
    }
  };
  const SetTheme = (newTheme: string) => {
    if (newTheme != theme) {
      localStorage.setItem('globalTheme', newTheme);
      setTheme(newTheme);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme != theme) {
      setTheme(savedTheme ?? '');
    }

    const sId = localStorage.getItem('channelId');
    const nId = sId ? parseInt(sId) : -1;
    if (nId != channelId) {
      setChannelId(nId);
    }
  }, []);
  console.log('>>>>>>>>>>' + channelId + '_' + theme);
  return (
    <AppContext.Provider value={{ theme, setTheme: SetTheme, channelId, setChannelId:SetChannelId }}>
      <div data-theme={theme} className="theme-provider" key={channelId + '_' + theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
};
