import { createContext } from 'react';

export const initialAppContext = {
  theme: 'light',
  // Authorization: '',
  // setChannelId:() => null,
  setTheme: () => null
};

type initialAppContextType = {
  theme: string;
  // channelId: string | null;
  // setChannelId:(channelId: string) => void;
  setTheme: (theme: string) => void;
};

export const AppContext = createContext<initialAppContextType>(initialAppContext);
