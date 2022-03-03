import { useState, useEffect } from 'react';
import { ThemeContext, initialThemeState } from './contexts/ThemeContext';
import './sass/index.scss';

interface Props {
    children: JSX.Element | JSX.Element[];
}
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialThemeState.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalTheme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme} className="theme-provider">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
