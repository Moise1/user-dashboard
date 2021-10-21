import * as React from 'react';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

export const SelectSupplierContext = React.createContext<ContextType | null>(null);

const SelectSupplierProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [supplierValue, setSupplierValue] = React.useState<string>('');

  return (
    <SelectSupplierContext.Provider value={{ supplierValue, setSupplierValue }}>
      {children}
    </SelectSupplierContext.Provider>
  );
};

export default SelectSupplierProvider;

// import { useState, useContext, createContext, ReactNode } from 'react';

// const SupplierSelectorProviderContext = createContext(undefined);

// export function useSupplierSelectorProvider() {
//   return useContext(SupplierSelectorProviderContext);
// }

// export type Props = {
//   children: ReactNode;
// };
// export default function SupplierSelectorProvider({ children }) {

//   const value = {
//     supplierValue,
//     setSupplierValue
//   };
//   return <SupplierSelectorProviderContext.Provider value={value}>{children}</SupplierSelectorProviderContext.Provider>;
// }

// import React, { ReactNode } from 'react';

// const SupplierSelectorProviderContext = React.createContext<ContextValue>(undefined);

// export type Props = {
//   children: ReactNode;
// };

// function AxiosProvider(props: Props) {
//   const { children } = props;
//   const [supplierValue, setSupplierValue] = React.useState<string>('');
//  const value = {
//    supplierValue,
//    setSupplierValue
//  };
//   return <SupplierSelectorProviderContext.Provider value={value}>{children}</SupplierSelectorProviderContext.Provider>;
// }

// const useAxios = () => React.useContext(SupplierSelectorProviderContext);

// export { AxiosProvider, useAxios };
