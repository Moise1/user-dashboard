import * as React from 'react';

type ContextType = {
  supplierValue: string;
  setSupplierValue: (arg0: string) => void;
};

export const SelectSupplierContext = React.createContext<ContextType | null>(null);

export const SelectSupplierProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [supplierValue, setSupplierValue] = React.useState<string>('');

  return (
    <div className="routes-content">
      <SelectSupplierContext.Provider value={{ supplierValue, setSupplierValue }}>
        {children}
      </SelectSupplierContext.Provider>
    </div>
  );
};
