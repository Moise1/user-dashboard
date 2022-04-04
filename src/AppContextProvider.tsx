import { useState, useEffect } from 'react';
import { AppContext, initialAppContext } from './contexts/AppContext';
import './sass/index.scss';
interface Props {
    children: JSX.Element | JSX.Element[];
}
export const AppContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(initialAppContext.theme);
  
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
    <AppContext.Provider 
      value={{ theme, setTheme}}
    >
      <div data-theme={theme} className="theme-provider">
        {children}
      </div>
    </AppContext.Provider>
  );
};
