import React, { useState } from 'react';
import '../../sass/light-theme/search-options.scss';
import { SearchInput } from './TableActionBtns';
import { AdvancedSearch } from './AdvancedSearch';

export const SearchOptions = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleSideDrawer = () => setDrawerOpen(!drawerOpen);
  const onSearch = (value: string) => console.log('searched value', value);

  return (
    <div className="action-components">
      <SearchInput onSearch={onSearch} />

      <AdvancedSearch title="Advanced Search" placement="right" onClose={handleSideDrawer} visible={drawerOpen}>
        <p>Advanced Search content</p>
        <p>Advanced Search content</p>
        <p>Advanced Search content</p>
      </AdvancedSearch>
    </div>
  );
};
