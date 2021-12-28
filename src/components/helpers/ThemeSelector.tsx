import { Suspense, lazy, ReactNode } from 'react';
import { Spin } from 'antd';
import { useColorScheme } from '../../custom-hooks/useColorScheme';

const LightTheme = lazy(() => import('./LightTheme'));
const DarkTheme = lazy(() => import('./DarkTheme'));

interface props {
  children: ReactNode;
}
export const ThemeSelector = ({ children }: props) => {
  const { isDark } = useColorScheme();
  return (
    <>
      <Suspense fallback={<Spin size="large" className="" />}>{isDark ? <DarkTheme /> : <LightTheme />}</Suspense>
      {children}
    </>
  );
};
