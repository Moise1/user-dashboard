import '../../sass/light-theme/search-options.scss';
import { SearchInput } from './TableActionBtns';
import { AdvancedSearch } from './AdvancedSearch';
import {AdvancedSearchProps} from './AdvancedSearch';

export const SearchOptions = ({visible, onClose}: AdvancedSearchProps) => {
  
  const onSearch = (value: string) => console.log('searched value', value);

  return (
    <div className="action-components">
      <SearchInput onSearch={onSearch} />
      <AdvancedSearch title="Advanced Search" placement="right" onClose={onClose} visible={visible}>
        <p>Advanced Search content</p>
        <p>Advanced Search content</p>
        <p>Advanced Search content</p>
      </AdvancedSearch>
    </div>
  );
};
