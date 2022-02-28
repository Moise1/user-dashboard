import { useState, useEffect } from 'react';
import { ThemeContext, initialThemeState } from './contexts/ThemeContext';

interface Props {
    children: JSX.Element | JSX.Element[];
}
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialThemeState.theme);

  const localStorage = window.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem('globalTheme');
    if (savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalTheme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
