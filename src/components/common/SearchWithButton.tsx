import { Input } from 'antd';

const SearchWithButton = () => {
  const {Search} = Input;
  return  (
    <Search
      className="input"
      aria-label="small"
      aria-describedby="inputGroup-sizing-sm"
      placeholder="Search..."
      enterButton="Search"
    />
  );
};

export default SearchWithButton;
