import '../../sass/light-theme/search-options.scss';
import { SearchInput } from './TableActionBtns';
import { AdvancedSearch } from './AdvancedSearch';
import { AdvancedSearchProps } from './AdvancedSearch';
import { Space, Button, Form, Input, Checkbox } from 'antd';

interface SearchOptionsProps {
  showSearchInput: boolean;
  openSourceModal?: () => void;
}

export const SearchOptions = (props: AdvancedSearchProps & SearchOptionsProps) => {
  const { visible, onClose, showSearchInput, openSourceModal } = props;
  const onSearch = (value: string) => console.log('searched value', value);

  return (
    <div className="action-components">
      {showSearchInput && <SearchInput onSearch={onSearch} />}
      <AdvancedSearch
        title="Search Criteria"
        placement="right"
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button className="clear-filters">Close filters</Button>
          </Space>
        }
      >
        <div className="advanced-form-container">
          <h5>
            <strong>Choose your suppliers</strong>
          </h5>
          <Button className="supplier-one" onClick={openSourceModal}>
            1 supplier
          </Button>
          <Form layout="vertical" className="advanced-search-form">
            <div className="inputs">
              <Form.Item label="Min source price">
                <Input className="blue-input" value="50" />
              </Form.Item>

              <Form.Item label="Min Profit">
                <Input className="blue-input" value="Mini" />
              </Form.Item>
              <Form.Item label="Max source price">
                <Input className="blue-input" value="100" />
              </Form.Item>
              <Form.Item label="Max Profit">
                <Input className="blue-input" value="Max" />
              </Form.Item>
            </div>

            <div className="prime-options">
              <p className="amazon-prime">
                <strong>Amazon Prime</strong>
              </p>
              <div className="checkboxes">
                <Checkbox checked className="checkbox">
                  Only Prime
                </Checkbox>
                <Checkbox className="checkbox">All Items</Checkbox>
              </div>
            </div>

            <Form.Item label="Title">
              <Input className="blue-input" placeholder="Contains..." />
            </Form.Item>
            <Form.Item label="Order By">
              <Input className="blue-input" value="Default" />
            </Form.Item>
            <div className="action-btns">
              <Button className="clear-filters">Clear filters</Button>
              <Button className="apply-filters">Apply filters</Button>
            </div>
          </Form>
        </div>
      </AdvancedSearch>
    </div>
  );
};
