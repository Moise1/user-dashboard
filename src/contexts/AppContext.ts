import { createContext } from 'react';

type initialAppContextType = {
  theme: string;
  channelId: number | undefined;
  setChannelId: (channelId: number) => void;
  setTheme: (theme: string) => void;
};

export const initialAppContext: initialAppContextType = {
  theme: 'light',
  channelId: undefined,
  setChannelId: () => null,
  setTheme: () => null
};


export const AppContext = createContext<initialAppContextType>(initialAppContext);
