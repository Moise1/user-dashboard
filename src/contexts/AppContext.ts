import { createContext } from 'react';

type AppContextType = {
  theme: string;
  channelId: number;
  setChannelId: (channelId: number) => void;
  setTheme: (theme: string) => void;
};

export const initialAppContext: AppContextType = {
  theme: 'light',
  channelId: parseInt(localStorage.getItem('channelId') ?? '-1'),
  setChannelId: () => null,
  setTheme: () => null
};

export const AppContext = createContext<AppContextType>(initialAppContext);

