import { SearchInput } from './TableActionBtns';
interface SearchOptionsProps {
  showSearchInput: boolean;
}

export const SearchOptions = ({ showSearchInput }: SearchOptionsProps) => {
  const onSearch = (value: string) => console.log('searched value', value);
  return <div className="action-components">{showSearchInput && <SearchInput onSearch={onSearch} />}</div>;
};
