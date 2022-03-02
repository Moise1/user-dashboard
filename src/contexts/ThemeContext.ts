import {createContext} from 'react';

export const initialThemeState = {
  theme: 'light',
  setTheme: () => null
};

type initialThemeType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<initialThemeType>(initialThemeState);
